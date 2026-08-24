"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { catalog } from "@/lib/catalog";
import { dollars } from "@/lib/money";

const options = [
  { sku: "sauce-pouch", label: "Sauce pouch (recommended)" },
  { sku: "sauce-bottle", label: "Sauce bottle" },
  { sku: "wings-12", label: "Wings 12-piece" },
  { sku: "wings-6", label: "Wings 6-piece" },
] as const;

export function PickupForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = new FormData(e.currentTarget);
    const sku = String(form.get("item"));
    const qty = Number(form.get("qty") || 1);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: form.get("name"),
        phone: form.get("phone"),
        pickupWindow: form.get("notes"),
        items: [{ sku, qty }],
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
    <form className="rounded-3xl border border-cream/10 bg-wood p-8" onSubmit={onSubmit}>
      <h2 className="font-display text-3xl">Write it up</h2>
      <p className="mt-2 text-sm text-amber">
        Demo prices. No card yet — this sends the ticket to the kitchen.
      </p>
      <div className="mt-6 grid gap-4">
        <input
          required
          name="name"
          placeholder="Name"
          className="rounded-lg border border-cream/15 bg-char px-3 py-3 outline-none focus:border-amber"
        />
        <input
          required
          name="phone"
          type="tel"
          placeholder="Phone"
          className="rounded-lg border border-cream/15 bg-char px-3 py-3 outline-none focus:border-amber"
        />
        <select
          name="item"
          className="rounded-lg border border-cream/15 bg-char px-3 py-3 outline-none focus:border-amber"
        >
          {options.map((opt) => {
            const item = catalog.find((c) => c.sku === opt.sku);
            return (
              <option key={opt.sku} value={opt.sku}>
                {opt.label} — {item ? dollars(item.priceCents) : ""}
              </option>
            );
          })}
        </select>
        <select
          name="qty"
          className="rounded-lg border border-cream/15 bg-char px-3 py-3 outline-none focus:border-amber"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              Qty {n}
            </option>
          ))}
        </select>
        <textarea
          name="notes"
          rows={2}
          placeholder="Pickup window…"
          className="rounded-lg border border-cream/15 bg-char px-3 py-3 outline-none focus:border-amber"
        />
      </div>
      {error && <p className="mt-3 text-sm text-amber">{error}</p>}
      <button type="submit" className="btn btn-amber mt-6 w-full" disabled={busy}>
        {busy ? "Sending…" : "Place order"}
      </button>
    </form>
  );
}
