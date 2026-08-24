import type { Metadata } from "next";
import { catalog } from "@/lib/catalog";
import { dollars } from "@/lib/money";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chat Order | Wings, Sauce & Shriners Tickets",
  description:
    "Pay online for Rainbow Saloon extra-saucy wings, house sauce, or Aug 29 Shriners fundraiser tickets. Demo prices. COA 4300 and 4510.",
};

export default function OrderPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="kicker">COA 4300 food · 4510 tickets</p>
      <h1 className="display mt-3 text-5xl">Order and pay in the chat.</h1>
      <p className="mt-4 max-w-xl text-lg text-paper/85">
        Hit Chat (bottom right). We’ll write the ticket, you pay online, kitchen
        fires it. Demo prices — not the live bar board.
      </p>
      <ul className="mt-8 divide-y divide-cream/10 rounded-2xl border border-cream/10 bg-wood px-5">
        {catalog.map((item) => (
          <li key={item.sku} className="flex justify-between gap-4 py-3 text-sm">
            <span>
              {item.name}
              {item.steakNightOnly ? " (Thu/Sat)" : ""}
            </span>
            <span className="shrink-0 text-amber">{dollars(item.priceCents)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted">
        Test card 4242 4242 4242 4242. Prefer a human? Call {site.phoneDisplay}.
      </p>
    </section>
  );
}
