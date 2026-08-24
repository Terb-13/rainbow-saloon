"use client";

import { useCallback, useEffect, useState } from "react";
import type { Order } from "@/lib/orders";

export default function KitchenPage() {
  const [pin, setPin] = useState("");
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  const load = useCallback(async () => {
    const res = await fetch("/api/orders", { headers: { "x-order-pin": pin } });
    if (res.status === 401) {
      setAuthed(false);
      setError("Wrong PIN.");
      return;
    }
    const data = (await res.json()) as { orders: Order[] };
    setAuthed(true);
    setError("");
    setOrders(data.orders);
  }, [pin]);

  useEffect(() => {
    if (!authed) return;
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, [authed, load]);

  async function patch(id: string, status: Order["status"]) {
    await fetch("/api/orders", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "x-order-pin": pin,
      },
      body: JSON.stringify({ id, status }),
    });
    await load();
  }

  if (!authed) {
    return (
      <section className="mx-auto max-w-md px-4 py-20">
        <p className="kicker">Kitchen</p>
        <h1 className="display mt-3 text-4xl">Chat orders</h1>
        <p className="mt-3 text-sm text-muted">
          COA 4300 food / 4510 tickets. PIN is ORDER_PIN on the server (local
          default: rainbow).
        </p>
        <form
          className="mt-8 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            void load();
          }}
        >
          <input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Kitchen PIN"
            className="rounded-lg border border-cream/15 bg-wood px-3 py-3 outline-none focus:border-amber"
          />
          <button type="submit" className="btn btn-primary">
            Open the board
          </button>
          {error && <p className="text-sm text-amber">{error}</p>}
        </form>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <p className="kicker">COA 4300 / 4510</p>
      <h1 className="display mt-2 text-4xl">Chat order board</h1>
      <div className="mt-8 grid gap-4">
        {orders.length === 0 && (
          <p className="text-muted">No chat orders yet.</p>
        )}
        {orders.map((order) => (
          <article
            key={order.id}
            className="rounded-2xl border border-cream/10 bg-wood p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-display text-2xl">{order.id}</p>
                <p className="text-sm text-muted">
                  {new Date(order.createdAt).toLocaleString("en-US", {
                    timeZone: "America/Denver",
                  })}
                </p>
              </div>
              <span className="rounded-full bg-char px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber">
                {order.status}
              </span>
            </div>
            <p className="mt-3">
              {order.customer.name} · {order.customer.phone}
              {order.customer.address ? ` · ${order.customer.address}` : ""}
            </p>
            {order.customer.pickupWindow && (
              <p className="text-sm text-amber">Pickup: {order.customer.pickupWindow}</p>
            )}
            <ul className="mt-3 space-y-1 text-sm">
              {order.lines.map((line) => (
                <li key={line.sku}>
                  {line.qty} × {line.name}{" "}
                  <span className="text-muted">COA {line.coa}</span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-muted">
              ${(order.totalCents / 100).toFixed(2)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(["placed", "working", "done", "cancelled"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  className="btn btn-ghost py-2 text-[11px]"
                  onClick={() => void patch(order.id, s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
