"use client";

import { catalog, isSteakNight } from "@/lib/catalog";
import { dollars } from "@/lib/money";
import { parseOrderText, wantsAHuman } from "@/lib/parse-order";
import { site } from "@/lib/site";
import { useEffect, useMemo, useRef, useState } from "react";

type Line = { sku: string; qty: number };
type Step = "menu" | "details" | "review" | "done";
type Placed = { id: string; total: string };

const menu = catalog.filter((item) => (item.steakNightOnly ? isSteakNight() : true));

function addLine(lines: Line[], sku: string, qty = 1): Line[] {
  const next = lines.map((l) => ({ ...l }));
  const hit = next.find((l) => l.sku === sku);
  if (hit) hit.qty = Math.min(20, hit.qty + qty);
  else next.push({ sku, qty });
  return next;
}

export function OrderChat({ startOpen = false }: { startOpen?: boolean }) {
  const [open, setOpen] = useState(startOpen);
  const [step, setStep] = useState<Step>("menu");
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pickupWindow, setPickupWindow] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [placed, setPlaced] = useState<Placed | null>(null);
  const [human, setHuman] = useState(false);
  const bottom = useRef<HTMLDivElement>(null);

  const detailed = useMemo(
    () =>
      lines.map((line) => {
        const item = catalog.find((c) => c.sku === line.sku)!;
        return { ...line, item, lineTotal: item.priceCents * line.qty };
      }),
    [lines],
  );
  const total = detailed.reduce((n, l) => n + l.lineTotal, 0);
  const needsAddress = lines.some((l) => l.sku === "ticket-185");

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: "smooth" });
  }, [step, lines, placed, human, error]);

  function onType(text: string) {
    const raw = text.trim();
    if (!raw) return;
    setInput("");
    if (wantsAHuman(raw)) {
      setHuman(true);
      return;
    }
    const parsed = parseOrderText(raw);
    if (parsed.length) {
      setLines((current) =>
        parsed.reduce((acc, item) => addLine(acc, item.sku, item.qty), current),
      );
      setStep("menu");
      setError("");
      return;
    }
    setError("Tap an item below, or say something like “12 wings” or “2 tickets”.");
  }

  async function place() {
    if (!name.trim() || !phone.trim()) {
      setError("Name and phone so we can find you.");
      return;
    }
    if (needsAddress && !address.trim()) {
      setError("Address is needed for fundraiser tickets.");
      return;
    }
    setBusy(true);
    setError("");
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        address: needsAddress ? address : undefined,
        pickupWindow,
        notes: note,
        items: lines,
      }),
    });
    const data = await res.json();
    setBusy(false);
    if (!res.ok) {
      setError(data.error ?? "Could not place that. Try again.");
      return;
    }
    setPlaced({ id: data.id, total: dollars(data.totalCents) });
    setStep("done");
  }

  const panel = (
    <section
      className={
        startOpen
          ? "flex h-[min(78svh,720px)] flex-col overflow-hidden rounded-2xl border border-cream/15 bg-char"
          : "fixed z-[60] flex flex-col overflow-hidden border border-cream/15 bg-char shadow-2xl bottom-[5.5rem] right-3 left-3 h-[min(72svh,640px)] rounded-2xl md:bottom-24 md:left-auto md:right-6 md:h-[min(70vh,640px)] md:w-[420px]"
      }
    >
      <header className="bg-ember">
        <div className="rainbow-bar" />
        <div className="px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-bright">
            Order first · Call last
          </p>
          <h2 className="font-display text-2xl leading-tight">Write it up</h2>
          <p className="text-sm text-cream/85">
            Wings, sauce, or Aug 29 tickets. Demo prices. No card needed yet.
          </p>
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
        <div className="rounded-2xl bg-wood px-3 py-2 text-sm text-paper/90">
          What are we putting on the ticket? Tap below or type “12 wings”, “sauce
          pouch”, “2 tickets”.
        </div>

        {step === "menu" && (
          <div className="grid gap-2">
            {menu.map((item) => (
              <button
                key={item.sku}
                type="button"
                onClick={() => setLines((c) => addLine(c, item.sku))}
                className="flex items-center justify-between rounded-xl border border-cream/10 bg-plank px-3 py-3 text-left text-sm hover:border-amber"
              >
                <span>
                  {item.name}
                  <span className="mt-0.5 block text-xs text-muted">{item.notes}</span>
                </span>
                <span className="shrink-0 font-semibold text-amber">
                  {dollars(item.priceCents)}
                </span>
              </button>
            ))}
          </div>
        )}

        {detailed.length > 0 && (
          <div className="rounded-xl border border-amber/30 bg-char p-3 text-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber">
              On the ticket
            </p>
            <ul className="mt-2 space-y-1">
              {detailed.map((line) => (
                <li key={line.sku} className="flex items-center justify-between gap-2">
                  <span>
                    {line.qty} × {line.item.name}
                  </span>
                  <span className="flex items-center gap-2">
                    {dollars(line.lineTotal)}
                    <button
                      type="button"
                      className="text-xs text-muted hover:text-cream"
                      onClick={() =>
                        setLines((c) => c.filter((l) => l.sku !== line.sku))
                      }
                    >
                      remove
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 font-display text-2xl">{dollars(total)}</p>
          </div>
        )}

        {step === "details" && (
          <div className="grid gap-3 rounded-2xl bg-wood p-3">
            <p className="text-sm">Name and phone so we can find you at pickup.</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-sm outline-none focus:border-amber"
            />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
              type="tel"
              className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-sm outline-none focus:border-amber"
            />
            {needsAddress && (
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Mailing address (tickets)"
                className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-sm outline-none focus:border-amber"
              />
            )}
            <input
              value={pickupWindow}
              onChange={(e) => setPickupWindow(e.target.value)}
              placeholder="Pickup window (optional)"
              className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-sm outline-none focus:border-amber"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Notes — extra sauce, mild, etc."
              rows={2}
              className="rounded-lg border border-cream/15 bg-char px-3 py-3 text-sm outline-none focus:border-amber"
            />
          </div>
        )}

        {step === "review" && (
          <div className="rounded-2xl bg-wood p-3 text-sm">
            <p>
              {name} · {phone}
              {pickupWindow ? ` · ${pickupWindow}` : ""}
            </p>
            <p className="mt-2 text-muted">
              No card on file yet. Placing this sends it to the kitchen as a demo
              ticket.
            </p>
          </div>
        )}

        {step === "done" && placed && (
          <div className="rounded-2xl border border-amber/40 bg-wood p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-amber">
              Ticket in
            </p>
            <p className="font-display text-3xl">{placed.id}</p>
            <p className="mt-1">{placed.total}</p>
            <p className="mt-3 text-sm text-paper/85">
              Kitchen has it. Pickup at {site.address.street}. We’ll toss wings
              when you’re close.
            </p>
            <button
              type="button"
              className="btn btn-ghost mt-4 w-full"
              onClick={() => {
                setLines([]);
                setPlaced(null);
                setStep("menu");
                setNote("");
              }}
            >
              Order something else
            </button>
            <p className="mt-4 text-center text-[11px] text-muted">
              Last resort — need a human?{" "}
              <a href={site.phoneHref} className="underline">
                {site.phoneDisplay}
              </a>
            </p>
          </div>
        )}

        {human && step !== "done" && (
          <p className="text-xs text-muted">
            Still finish the ticket here if you can. If you really need a person:{" "}
            <a href={site.phoneHref} className="underline">
              {site.phoneDisplay}
            </a>
          </p>
        )}
        {error && <p className="text-sm text-amber">{error}</p>}
        <div ref={bottom} />
      </div>

      {step !== "done" && (
        <div className="border-t border-cream/10 p-3">
          {step === "menu" && (
            <div className="flex flex-col gap-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onType(input);
                }}
                className="flex gap-2"
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="12 wings, 2 tickets…"
                  className="min-w-0 flex-1 rounded-full border border-cream/15 bg-wood px-4 py-3 text-sm outline-none focus:border-amber"
                />
                <button type="submit" className="btn btn-ghost px-4 py-3">
                  Add
                </button>
              </form>
              <button
                type="button"
                className="btn btn-primary w-full"
                disabled={lines.length === 0}
                onClick={() => {
                  setError("");
                  setStep("details");
                }}
              >
                Continue · {dollars(total)}
              </button>
            </div>
          )}
          {step === "details" && (
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => setStep("menu")}>
                Back
              </button>
              <button
                type="button"
                className="btn btn-primary flex-1"
                onClick={() => {
                  if (!name.trim() || !phone.trim()) {
                    setError("Name and phone so we can find you.");
                    return;
                  }
                  setError("");
                  setStep("review");
                }}
              >
                Review ticket
              </button>
            </div>
          )}
          {step === "review" && (
            <div className="flex gap-2">
              <button type="button" className="btn btn-ghost" onClick={() => setStep("details")}>
                Back
              </button>
              <button
                type="button"
                className="btn btn-amber flex-1"
                disabled={busy}
                onClick={() => void place()}
              >
                {busy ? "Sending…" : `Place order · ${dollars(total)}`}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );

  if (startOpen) return panel;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed z-[60] grid h-14 w-14 place-items-center rounded-full bg-ember text-cream shadow-[0_12px_30px_rgba(194,48,26,0.45)] bottom-[5.5rem] right-4 md:bottom-6 md:right-6"
        aria-expanded={open}
        aria-label={open ? "Close order" : "Open order"}
      >
        {open ? (
          <span className="text-2xl leading-none">×</span>
        ) : (
          <span className="text-[11px] font-bold uppercase tracking-wider">
            Order
          </span>
        )}
      </button>
      {open && panel}
    </>
  );
}
