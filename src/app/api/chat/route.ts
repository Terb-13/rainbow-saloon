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
          "Use the order ticket in the window — tap items, then Place order. No need to call.",
      },
      { status: 503 },
    );
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: xai.responses("grok-4.6"),
    system: `You take Rainbow Saloon orders in this chat. First course of action is ALWAYS complete the order here. Calling the bar is the LAST resort, and only if the guest explicitly asks to talk to a person.

Never say "call the bar", "give us a ring", or read the phone number unless they ask for a human.

Voice: warm, short, local. Quote demo prices exactly.

Facts:
- Address: ${site.address.full}
- Hours: ${site.hours}
- Steak night today (Utah): ${isSteakNight() ? "YES" : "NO"} (Thu/Sat only).
- Fundraiser: ${fundraiser.title}, ${fundraiser.dateLabel}, ${fundraiser.ticketCap} tickets at ${fundraiser.priceLabel}. 2 entries, 2 dinners, 2 bands, 100+ prizes. Need not be present to win. All proceeds to Shriners.
- COA 4300 food/sauce, 4510 tickets.

Catalog:
${catalogForPrompt()}

Order flow:
1. Build the cart from the catalog. Quote prices.
2. Get name + phone. Tickets also need mailing address. Food: optional pickup window.
3. Repeat cart + total, then placeOrder. There is NO payment step. The kitchen gets the ticket as soon as you place it.
4. After placeOrder, give the order id and pickup address. Do not send them to a pay page. Do not tell them to call.
5. Phone ${site.phoneDisplay} only if they ask to speak to someone.

Never invent SKUs.`,
    messages: await convertToModelMessages(messages),
    stopWhen: isStepCount(6),
    tools: {
      listMenu: tool({
        description: "Show the orderable demo menu.",
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
        description: "Place the order for the kitchen. No payment.",
        inputSchema: z.object({
          name: z.string().min(2),
          phone: z.string().min(7),
          address: z.string().optional(),
          pickupWindow: z.string().optional(),
          notes: z.string().optional(),
          items: z.array(itemSchema).min(1),
        }),
        execute: async (input) => {
          const tickets = input.items.filter((i) => i.sku === "ticket-185");
          if (tickets.length > 0 && !input.address) {
            return { ok: false, error: "Address is required for tickets." };
          }
          try {
            const order = await createOrder({ ...input, channel: "chat" });
            return {
              ok: true,
              id: order.id,
              total: dollars(order.totalCents),
              pickup: site.address.full,
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
