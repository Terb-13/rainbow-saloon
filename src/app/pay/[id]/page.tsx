"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Summary = {
  id: string;
  status: string;
  total: string;
  lines: { name: string; qty: number; lineTotal: string }[];
  customer: { name: string; phone: string };
};

export default function PayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Summary | null>(null);
  const [card, setCard] = useState("4242 4242 4242 4242");
  const [exp, setExp] = useState("12/28");
  const [cvc, setCvc] = useState("123");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void fetch(`/api/pay/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.order) setOrder(data.order);
        else setError(data.error ?? "Order not found");
      });
  }, [id]);

  useEffect(() => {
    if (
      order &&
      (order.status === "paid" ||
        order.status === "working" ||
        order.status === "done")
    ) {
      router.replace(`/pay/success?order=${encodeURIComponent(id)}`);
    }
  }, [order, id, router]);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const res = await fetch(`/api/pay/${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ card }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Payment failed");
      return;
    }
    router.push(`/pay/success?order=${encodeURIComponent(id)}`);
  }

  if (!order && !error) {
    return (
      <section className="mx-auto max-w-md px-4 py-20">
        <p className="text-muted">Loading ticket…</p>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="mx-auto max-w-md px-4 py-20">
        <h1 className="display text-4xl">Order not found</h1>
        <p className="mt-3 text-muted">{error}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <p className="kicker">Demo checkout</p>
      <h1 className="display mt-2 text-4xl">Pay {order.total}</h1>
      <p className="mt-3 text-sm text-amber">
        Demo pricing — not the live bar board. Use test card 4242 4242 4242 4242.
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        {order.lines.map((line) => (
          <li key={line.name} className="flex justify-between gap-4">
            <span>
              {line.qty} × {line.name}
            </span>
            <span>{line.lineTotal}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-display text-3xl">{order.total}</p>
      <p className="mt-1 text-xs text-muted">
        {order.id} · {order.customer.name} · {order.customer.phone}
      </p>
      <form onSubmit={pay} className="mt-8 grid gap-3">
        <label className="grid gap-1 text-sm">
          <span className="font-semibold uppercase tracking-wider text-muted">
            Card
          </span>
          <input
            value={card}
            onChange={(e) => setCard(e.target.value)}
            inputMode="numeric"
            autoComplete="cc-number"
            className="rounded-lg border border-cream/15 bg-wood px-3 py-3 outline-none focus:border-amber"
          />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            placeholder="MM/YY"
            autoComplete="cc-exp"
            className="rounded-lg border border-cream/15 bg-wood px-3 py-3 outline-none focus:border-amber"
          />
          <input
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            placeholder="CVC"
            autoComplete="cc-csc"
            className="rounded-lg border border-cream/15 bg-wood px-3 py-3 outline-none focus:border-amber"
          />
        </div>
        {error && <p className="text-sm text-amber">{error}</p>}
        <button type="submit" className="btn btn-primary w-full" disabled={busy}>
          {busy ? "Charging…" : `Pay ${order.total}`}
        </button>
      </form>
    </section>
  );
}
