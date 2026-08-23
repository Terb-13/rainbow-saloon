"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function PickupForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="rounded-3xl border border-amber/40 bg-wood p-8">
        <h2 className="font-display text-3xl">Got it. Now call it in.</h2>
        <p className="mt-3 text-paper/80">
          Pickup notes don’t charge a card. Call{" "}
          <a href={site.phoneHref} className="font-bold text-amber">
            {site.phoneDisplay}
          </a>{" "}
          to confirm sauce pouches, bottles, or a wing order.
        </p>
      </div>
    );
  }

  return (
    <form
      className="rounded-3xl border border-cream/10 bg-wood p-8"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <h2 className="font-display text-3xl">Pickup note</h2>
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
          <option>Sauce pouch (recommended)</option>
          <option>Sauce bottle</option>
          <option>Wings to-go</option>
          <option>Pouch + wings</option>
        </select>
        <textarea
          name="notes"
          rows={3}
          placeholder="How many, heat, pickup window…"
          className="rounded-lg border border-cream/15 bg-char px-3 py-3 outline-none focus:border-amber"
        />
      </div>
      <button type="submit" className="btn btn-amber mt-6 w-full">
        Send pickup note
      </button>
    </form>
  );
}
