"use client";

import { useState } from "react";
import { fundraiser, site } from "@/lib/site";

type Status = "idle" | "done";

export function TicketForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [qty, setQty] = useState(1);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-amber/40 bg-plank p-6">
        <p className="kicker">You’re almost in</p>
        <h3 className="mt-2 font-display text-3xl">Finish your ticket</h3>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-paper/90">
          <li>
            Call{" "}
            <a className="font-bold text-amber" href={site.phoneHref}>
              {site.phoneDisplay}
            </a>{" "}
            and tell them {name || "your name"} wants {qty} ticket
            {qty > 1 ? "s" : ""} for Aug 29.
          </li>
          <li>
            {fundraiser.venmoNote} They’ll fill the tickets out for you.
          </li>
          <li>Or stop in at {site.address.full} — we’re open {site.hours}.</li>
        </ol>
        <a href={site.phoneHref} className="btn btn-amber mt-6 w-full sm:w-auto">
          Call now
        </a>
      </div>
    );
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
        Limited to {fundraiser.ticketCap} tickets. You do not need to be present
        to win.
      </p>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-1 text-sm">
          <span className="font-semibold uppercase tracking-wider text-muted">
            Full name
          </span>
          <input
            required
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
      <button type="submit" className="btn btn-primary mt-6 w-full">
        Get next steps
      </button>
      <p className="mt-3 text-xs text-muted">
        This form does not charge you. We’ll show you how to Venmo (include
        “donation” + your details) or call the bar to lock it in.
      </p>
    </form>
  );
}
