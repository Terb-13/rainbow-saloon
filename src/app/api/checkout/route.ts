import { checkoutUrl } from "@/lib/checkout";
import { createOrder } from "@/lib/orders";

export async function POST(req: Request) {
  const body = (await req.json()) as {
    name?: string;
    phone?: string;
    address?: string;
    pickupWindow?: string;
    notes?: string;
    items?: { sku: string; qty: number }[];
  };
  if (!body.name || !body.phone || !body.items?.length) {
    return Response.json(
      { error: "Name, phone, and at least one item are required." },
      { status: 400 },
    );
  }
  try {
    const order = await createOrder({
      name: body.name,
      phone: body.phone,
      address: body.address,
      pickupWindow: body.pickupWindow,
      notes: body.notes,
      items: body.items,
      channel: "web",
    });
    const url = await checkoutUrl(order, new URL(req.url).origin);
    return Response.json({ id: order.id, url, totalCents: order.totalCents });
  } catch (err) {
    return Response.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 400 },
    );
  }
}
