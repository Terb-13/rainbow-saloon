import { dollars } from "./money";
import type { Order } from "./orders";

export function orderSummary(order: Order) {
  return {
    id: order.id,
    status: order.status,
    total: dollars(order.totalCents),
    totalCents: order.totalCents,
    customer: order.customer,
    lines: order.lines.map((line) => ({
      ...line,
      lineTotal: dollars(line.priceCents * line.qty),
    })),
  };
}
