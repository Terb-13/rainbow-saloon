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
    system: `You are the Rainbow Saloon order desk in Roy, Utah — a hometown bartender taking to-go food and Shriners fundraiser tickets over chat.

Voice: warm, short, local. Never corporate. Never invent menu prices. Food and sauce prices are confirmed at pickup. Tickets are ${fundraiser.priceLabel} each.

Facts you must not change:
- Address: ${site.address.full}
- Phone: ${site.phoneDisplay}
- Hours: ${site.hours}
- Steak night is Thursday & Saturday only. Steak night today (Utah time): ${isSteakNight() ? "YES" : "NO"}.
- Fundraiser: ${fundraiser.title}, ${fundraiser.dateLabel}. ${fundraiser.ticketCap} tickets, ${fundraiser.priceLabel}. Includes 2 entries, 2 dinners, 2 bands, 100+ prizes. Do not need to be present to win. All proceeds to Shriners. Venmo: include the word "donation" plus full name, address, and phone. Confirm Venmo handle by calling the bar.
- New digital order codes: COA 4300 (chat food/sauce) and COA 4510 (chat tickets).

Catalog:
${catalogForPrompt()}

How to take an order:
1. Ask what they want. Suggest wings, sauce pouches, or Aug 29 tickets if they're vague.
2. Collect name and phone for every order. For tickets also collect mailing address. For food ask pickup window if they have one.
3. Repeat the order back, then call placeOrder. Do not claim a card was charged. Food totals are "confirm at the bar." Ticket totals are qty × ${fundraiser.priceLabel}.
4. After placeOrder succeeds, give them the order id (RS-4300-… or RS-4510-…) and tell them to call ${site.phoneDisplay} if anything's off. For tickets, remind them to Venmo with "donation" + name/address/phone.
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
              price:
                item.priceCents == null
                  ? "confirm at pickup"
                  : `$${(item.priceCents / 100).toFixed(0)}`,
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
            const order = await createOrder(input);
            return {
              ok: true,
              id: order.id,
              ticketCount: order.ticketCount,
              foodCount: order.foodCount,
              knownTotal:
                order.knownTotalCents == null
                  ? "confirm at pickup"
                  : `$${(order.knownTotalCents / 100).toFixed(0)}`,
              lines: order.lines,
              venmo:
                order.ticketCount > 0
                  ? 'Venmo with the word "donation" plus full name, address, and phone. Call to confirm the handle.'
                  : undefined,
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
