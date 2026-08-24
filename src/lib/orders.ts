import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { CHAT_FOOD_COA, CHAT_TICKET_COA, type CoaCode } from "./coa";
import { catalog } from "./catalog";

export type OrderLine = {
  sku: string;
  name: string;
  qty: number;
  coa: CoaCode;
  priceCents: number | null;
};

export type Order = {
  id: string;
  createdAt: string;
  channel: "chat";
  status: "new" | "working" | "done" | "cancelled";
  customer: {
    name: string;
    phone: string;
    address?: string;
    pickupWindow?: string;
  };
  lines: OrderLine[];
  notes?: string;
  ticketCount: number;
  foodCount: number;
  knownTotalCents: number | null;
};

type G = typeof globalThis & { __rsOrders?: Order[] };
const g = globalThis as G;
const FILE = path.join(process.cwd(), "data", "orders.json");

async function load(): Promise<Order[]> {
  if (!g.__rsOrders) {
    try {
      const raw = await readFile(FILE, "utf8");
      g.__rsOrders = JSON.parse(raw) as Order[];
    } catch {
      g.__rsOrders = [];
    }
  }
  return g.__rsOrders;
}

async function persist(orders: Order[]) {
  g.__rsOrders = orders;
  try {
    await mkdir(path.dirname(FILE), { recursive: true });
    await writeFile(FILE, JSON.stringify(orders, null, 2));
  } catch {
    // Serverless filesystems may be read-only; in-memory still works for this instance.
  }
}

function nextId(orders: Order[], hasTickets: boolean) {
  const coa = hasTickets ? CHAT_TICKET_COA : CHAT_FOOD_COA;
  const n = orders.filter((o) => o.id.includes(`-${coa}-`)).length + 1;
  return `RS-${coa}-${String(n).padStart(4, "0")}`;
}

export async function listOrders(): Promise<Order[]> {
  const orders = await load();
  return [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createOrder(input: {
  name: string;
  phone: string;
  address?: string;
  pickupWindow?: string;
  notes?: string;
  items: { sku: string; qty: number }[];
}): Promise<Order> {
  const lines: OrderLine[] = [];
  for (const item of input.items) {
    const sku = catalog.find((c) => c.sku === item.sku);
    if (!sku || item.qty < 1) continue;
    lines.push({
      sku: sku.sku,
      name: sku.name,
      qty: Math.min(20, Math.floor(item.qty)),
      coa: sku.coa,
      priceCents: sku.priceCents,
    });
  }
  if (lines.length === 0) {
    throw new Error("No valid items.");
  }

  const ticketCount = lines
    .filter((l) => l.coa === CHAT_TICKET_COA)
    .reduce((n, l) => n + l.qty, 0);
  const foodCount = lines
    .filter((l) => l.coa !== CHAT_TICKET_COA)
    .reduce((n, l) => n + l.qty, 0);

  const priced = lines.every((l) => l.priceCents != null);
  const knownTotalCents = priced
    ? lines.reduce((n, l) => n + (l.priceCents ?? 0) * l.qty, 0)
    : null;

  const orders = await load();
  const order: Order = {
    id: nextId(orders, ticketCount > 0),
    createdAt: new Date().toISOString(),
    channel: "chat",
    status: "new",
    customer: {
      name: input.name.trim(),
      phone: input.phone.trim(),
      address: input.address?.trim() || undefined,
      pickupWindow: input.pickupWindow?.trim() || undefined,
    },
    lines,
    notes: input.notes?.trim() || undefined,
    ticketCount,
    foodCount,
    knownTotalCents,
  };
  orders.push(order);
  await persist(orders);
  return order;
}

export async function setOrderStatus(id: string, status: Order["status"]) {
  const orders = await load();
  const order = orders.find((o) => o.id === id);
  if (!order) return null;
  order.status = status;
  await persist(orders);
  return order;
}
