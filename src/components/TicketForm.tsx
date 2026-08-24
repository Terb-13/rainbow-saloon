"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fundraiser } from "@/lib/site";

export function TicketForm() {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        address: form.get("address"),
        items: [{ sku: "ticket-185", qty }],
      }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Could not place order");
      return;
    }
    router.push(`/order/thanks?id=${encodeURIComponent(data.id)}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border border-cream/10 bg-plank p-6 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
    >
      <p className="kicker">Hold a ticket</p>
      <h3 className="mt-2 font-display text-3xl text-cream">
        {fundraiser.priceLabel} · 2 people, 2 dinners, 2 bands
      </h3>
      <p className="mt-2 text-sm text-muted">
        Limited to {fundraiser.ticketCap}. Write it up here first — no card yet.
        You do not need to be present to win.
      </p>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-1 text-sm">
          <span className="font-semibold uppercase tracking-wider text-muted">
            Full name
          </span>
          <input
            required
            name="name"
            className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-cream outline-none focus:border-amber"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-semibold uppercase tracking-wider text-muted">
            Phone
          </span>
          <input
            required
            name="phone"
            type="tel"
            className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-cream outline-none focus:border-amber"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-semibold uppercase tracking-wider text-muted">
            Address
          </span>
          <input
            required
            name="address"
            className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-cream outline-none focus:border-amber"
          />
        </label>
        <label className="grid gap-1 text-sm">
          <span className="font-semibold uppercase tracking-wider text-muted">
            Tickets
          </span>
          <select
            name="qty"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-cream outline-none focus:border-amber"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} × {fundraiser.priceLabel} = ${n * fundraiser.price}
              </option>
            ))}
          </select>
        </label>
      </div>
      {error && <p className="mt-3 text-sm text-amber">{error}</p>}
      <button type="submit" className="btn btn-primary mt-6 w-full" disabled={busy}>
        {busy ? "Sending…" : "Place ticket order"}
      </button>
    </form>
  );
}
