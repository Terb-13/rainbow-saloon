import { listOrders, setOrderStatus, type Order } from "@/lib/orders";

function authorized(req: Request) {
  const pin = process.env.ORDER_PIN ?? (process.env.NODE_ENV === "development" ? "rainbow" : "");
  if (!pin) return false;
  const header = req.headers.get("x-order-pin") ?? "";
  const url = new URL(req.url);
  const q = url.searchParams.get("pin") ?? "";
  return header === pin || q === pin;
}

export async function GET(req: Request) {
  if (!authorized(req)) {
    return Response.json({ error: "Need the kitchen PIN." }, { status: 401 });
  }
  return Response.json({ orders: await listOrders() });
}

export async function PATCH(req: Request) {
  if (!authorized(req)) {
    return Response.json({ error: "Need the kitchen PIN." }, { status: 401 });
  }
  const body = (await req.json()) as { id?: string; status?: Order["status"] };
  if (!body.id || !body.status) {
    return Response.json({ error: "id and status required" }, { status: 400 });
  }
  const order = await setOrderStatus(body.id, body.status);
  if (!order) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ order });
}
