import { CHAT_FOOD_COA, CHAT_TICKET_COA, type CoaCode } from "./coa";
import { fundraiser } from "./site";

export type CatalogItem = {
  sku: string;
  name: string;
  notes: string;
  coa: CoaCode;
  /** Cents. Null = confirm at the bar. */
  priceCents: number | null;
  kind: "food" | "retail" | "ticket";
  steakNightOnly?: boolean;
};

export const catalog: CatalogItem[] = [
  {
    sku: "wings-6",
    name: "Extra-saucy hot wings (6)",
    notes: "House BBQ-tomatoey sweet-heat. To-go or dine-in.",
    coa: CHAT_FOOD_COA,
    priceCents: null,
    kind: "food",
  },
  {
    sku: "wings-12",
    name: "Extra-saucy hot wings (12)",
    notes: "The pile people drive for.",
    coa: CHAT_FOOD_COA,
    priceCents: null,
    kind: "food",
  },
  {
    sku: "steak-night",
    name: "Steak night plate",
    notes: "Thursday & Saturday only. Mushrooms and onions.",
    coa: CHAT_FOOD_COA,
    priceCents: null,
    kind: "food",
    steakNightOnly: true,
  },
  {
    sku: "burger",
    name: "Cheeseburger",
    notes: "Cooked to order.",
    coa: CHAT_FOOD_COA,
    priceCents: null,
    kind: "food",
  },
  {
    sku: "pastrami-burger",
    name: "Pastrami burger",
    notes: "The one regulars mention by name.",
    coa: CHAT_FOOD_COA,
    priceCents: null,
    kind: "food",
  },
  {
    sku: "cheese-fries",
    name: "Extra-cheesy cheese fries",
    notes: "The other reason people don’t leave hungry.",
    coa: CHAT_FOOD_COA,
    priceCents: null,
    kind: "food",
  },
  {
    sku: "sauce-pouch",
    name: "House sauce · flex pouch",
    notes: "Stand-up pouch with spout. Recommended.",
    coa: CHAT_FOOD_COA,
    priceCents: null,
    kind: "retail",
  },
  {
    sku: "sauce-bottle",
    name: "House sauce · bottle",
    notes: "Fridge-door bottle of the same sweet-heat.",
    coa: CHAT_FOOD_COA,
    priceCents: null,
    kind: "retail",
  },
  {
    sku: "ticket-185",
    name: `${fundraiser.shortTitle} ticket`,
    notes: `${fundraiser.priceLabel}. 2 entries, 2 dinners, 2 bands, 100+ prizes. Sat Aug 29.`,
    coa: CHAT_TICKET_COA,
    priceCents: fundraiser.price * 100,
    kind: "ticket",
  },
];

export function isSteakNight(now = new Date()) {
  const day = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "America/Denver",
  }).format(now);
  return day === "Thu" || day === "Sat";
}

export function catalogForPrompt() {
  const steak = isSteakNight();
  return catalog
    .filter((item) => (item.steakNightOnly ? steak : true))
    .map((item) => {
      const price =
        item.priceCents == null
          ? "price confirmed at pickup"
          : `$${(item.priceCents / 100).toFixed(0)}`;
      return `- ${item.sku}: ${item.name} — ${price}. COA ${item.coa}. ${item.notes}`;
    })
    .join("\n");
}
