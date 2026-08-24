import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  isStepCount,
  streamText,
  toUIMessageStream,
  tool,
  type UIMessage,
} from "ai";
import { xai } from "@ai-sdk/xai";
import { z } from "zod";
import { checkoutUrl } from "@/lib/checkout";
import { catalog, catalogForPrompt, isSteakNight } from "@/lib/catalog";
import { dollars } from "@/lib/money";
import { createOrder } from "@/lib/orders";
import { fundraiser, site } from "@/lib/site";

export const maxDuration = 60;

const skus = catalog.map((c) => c.sku) as [string, ...string[]];

const itemSchema = z.object({
  sku: z.enum(skus).describe("Catalog SKU"),
  qty: z.number().int().min(1).max(20),
});

export async function POST(req: Request) {
  if (!process.env.XAI_API_KEY) {
    return Response.json(
      {
        error:
          "Chat is not live yet — set XAI_API_KEY on the server. Meanwhile call the bar.",
      },
      { status: 503 },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: xai.responses("grok-4.6"),
    system: `You are the Rainbow Saloon order desk in Roy, Utah — a hometown bartender taking paid to-go food and Shriners fundraiser tickets over chat.

Voice: warm, short, local. Never corporate. Quote demo menu prices exactly as listed. Say they are demo prices.

Facts you must not change:
- Address: ${site.address.full}
- Phone: ${site.phoneDisplay}
- Hours: ${site.hours}
- Steak night is Thursday & Saturday only. Steak night today (Utah time): ${isSteakNight() ? "YES" : "NO"}.
- Fundraiser: ${fundraiser.title}, ${fundraiser.dateLabel}. ${fundraiser.ticketCap} tickets, ${fundraiser.priceLabel}. Includes 2 entries, 2 dinners, 2 bands, 100+ prizes. Do not need to be present to win. All proceeds to Shriners.
- Digital order codes: COA 4300 (chat food/sauce) and COA 4510 (chat tickets).
- Payment is online. After placeOrder, the guest taps Pay now. Demo card 4242 4242 4242 4242. Do not invent other prices.

Catalog (demo):
${catalogForPrompt()}

How to take an order:
1. Ask what they want. Suggest wings, sauce pouches, or Aug 29 tickets if they're vague. Quote the demo price.
2. Collect name and phone for every order. For tickets also collect mailing address. For food ask pickup window if they have one.
3. Repeat the cart and the dollar total, then call placeOrder.
4. After placeOrder succeeds, give the order id, the total, and tell them to tap Pay now in the chat (payUrl). Kitchen does not start the food until it is paid.
5. If they only want hours, directions, or the story, answer — don't force an order.

Never invent SKUs. Never promise items not in the catalog.`,
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(6),
    tools: {
      listMenu: tool({
        description: "Show what can be ordered in chat right now.",
        inputSchema: z.object({}),
        execute: async () => ({
          steakNightToday: isSteakNight(),
          items: catalog
            .filter((item) => (item.steakNightOnly ? isSteakNight() : true))
            .map((item) => ({
              sku: item.sku,
              name: item.name,
              notes: item.notes,
              coa: item.coa,
              price: dollars(item.priceCents),
            })),
        }),
      }),
      placeOrder: tool({
        description:
          "Submit a food, sauce, and/or fundraiser ticket order on COA 4300/4510 after the guest confirms.",
        inputSchema: z.object({
          name: z.string().min(2).describe("Guest full name"),
          phone: z.string().min(7).describe("Callback phone"),
          address: z
            .string()
            .optional()
            .describe("Required for tickets: mailing address"),
          pickupWindow: z
            .string()
            .optional()
            .describe("When they'll pick up food, if known"),
          notes: z.string().optional(),
          items: z.array(itemSchema).min(1),
        }),
        execute: async (input) => {
          const tickets = input.items.filter((i) => i.sku === "ticket-185");
          if (tickets.length > 0 && !input.address) {
            return {
              ok: false,
              error: "Address is required for fundraiser tickets.",
            };
          }
          try {
            const origin = new URL(req.url).origin;
            const order = await createOrder({ ...input, channel: "chat" });
            const payUrl = await checkoutUrl(order, origin);
            return {
              ok: true,
              id: order.id,
              ticketCount: order.ticketCount,
              foodCount: order.foodCount,
              total: dollars(order.totalCents),
              payUrl,
              lines: order.lines,
            };
          } catch (err) {
            return {
              ok: false,
              error: err instanceof Error ? err.message : "Could not place order",
            };
          }
        },
      }),
    },
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}
