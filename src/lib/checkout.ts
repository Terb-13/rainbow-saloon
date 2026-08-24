import { dollars } from "./money";
import type { Order } from "./orders";

export async function checkoutUrl(order: Order, origin: string) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (secret) {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(secret);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: undefined,
      metadata: { orderId: order.id },
      line_items: order.lines.map((line) => ({
        quantity: line.qty,
        price_data: {
          currency: "usd",
          unit_amount: line.priceCents,
          product_data: { name: `${line.name} (demo)` },
        },
      })),
      success_url: `${origin}/pay/success?order=${encodeURIComponent(order.id)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pay/${encodeURIComponent(order.id)}`,
    });
    if (!session.url) throw new Error("Stripe did not return a checkout URL.");
    return session.url;
  }
  return `${origin}/pay/${encodeURIComponent(order.id)}`;
}

export function orderSummary(order: Order) {
  return {
    id: order.id,
    status: order.status,
    payment: order.payment,
    total: dollars(order.totalCents),
    totalCents: order.totalCents,
    customer: order.customer,
    lines: order.lines.map((line) => ({
      ...line,
      lineTotal: dollars(line.priceCents * line.qty),
    })),
  };
}
