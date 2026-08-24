import { orderSummary } from "@/lib/checkout";
import { getOrder, markPaid } from "@/lib/orders";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });
  return Response.json({ order: orderSummary(order) });
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });
  if (order.status === "paid" || order.status === "working" || order.status === "done") {
    return Response.json({ order: orderSummary(order), alreadyPaid: true });
  }

  const body = (await req.json().catch(() => ({}))) as { card?: string };
  const digits = (body.card ?? "").replace(/\s+/g, "");
  const demoOk = digits === "4242424242424242" || digits.startsWith("4242");
  if (!demoOk) {
    return Response.json(
      {
        error:
          "Demo checkout only. Use card 4242 4242 4242 4242 (any future expiry, any CVC).",
      },
      { status: 402 },
    );
  }

  const paid = await markPaid(id, "demo");
  return Response.json({ order: paid ? orderSummary(paid) : null });
}
