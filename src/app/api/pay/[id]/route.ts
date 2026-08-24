import { orderSummary } from "@/lib/checkout";
import { getOrder } from "@/lib/orders";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return Response.json({ error: "Order not found" }, { status: 404 });
  return Response.json({ order: orderSummary(order) });
}
