import { catalog, isSteakNight } from "./catalog";

export function parseOrderText(text: string) {
  const t = text.toLowerCase();
  const items: { sku: string; qty: number }[] = [];

  const take = (sku: string, qty: number) => {
    const existing = items.find((i) => i.sku === sku);
    if (existing) existing.qty += qty;
    else items.push({ sku, qty });
  };

  const n =
    Number((t.match(/\b(\d+)\b/) || [])[1]) ||
    (/\b(a|an|one)\b/.test(t) ? 1 : 0) ||
    (/\btwo\b/.test(t) ? 2 : 0) ||
    (/\bdozen\b/.test(t) ? 12 : 0);

  if (/ticket|shriner|fundraiser/.test(t)) take("ticket-185", n || 1);
  if (/pouch/.test(t)) take("sauce-pouch", n || 1);
  if (/bottle/.test(t)) take("sauce-bottle", n || 1);
  if (/pastrami/.test(t)) take("pastrami-burger", n || 1);
  else if (/burger/.test(t)) take("burger", n || 1);
  if (/fries|fry/.test(t)) take("cheese-fries", n || 1);
  if (/steak/.test(t) && isSteakNight()) take("steak-night", n || 1);
  if (/wing/.test(t)) {
    if (n === 6) take("wings-6", 1);
    else if (n >= 12) take("wings-12", Math.round(n / 12) || 1);
    else take("wings-12", 1);
  }

  return items.filter((i) => catalog.some((c) => c.sku === i.sku));
}

export function wantsAHuman(text: string) {
  return /\b(call|human|person|someone|bartender|phone|talk to)\b/i.test(text);
}
