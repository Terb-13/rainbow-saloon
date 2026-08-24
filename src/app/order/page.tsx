import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chat Order | Wings, Sauce & Shriners Tickets",
  description:
    "Order Rainbow Saloon extra-saucy wings, house sauce, or Aug 29 Shriners fundraiser tickets over chat. Digital orders post to COA 4300 and 4510.",
};

export default function OrderPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="kicker">COA 4300 food · 4510 tickets</p>
      <h1 className="display mt-3 text-5xl">Order in the chat.</h1>
      <p className="mt-4 max-w-xl text-lg text-paper/85">
        Hit the Chat button (bottom right). Tell us wings, a sauce pouch, or
        Aug 29 tickets. We’ll write it up, give you an order number, and the
        kitchen sees it on the board.
      </p>
      <ul className="mt-8 space-y-3 text-paper/80">
        <li>
          <strong className="text-cream">Food & sauce</strong> posts to COA
          4300 (digital chat). Price confirmed at pickup.
        </li>
        <li>
          <strong className="text-cream">Shriners tickets</strong> post to COA
          4510 at $185. We’ll still need Venmo with “donation” + your name,
          address, and phone — or call {site.phoneDisplay}.
        </li>
        <li>
          Not charging a card in the chat. This is the ticket to the kitchen,
          not a checkout.
        </li>
      </ul>
      <p className="mt-10 text-sm text-muted">
        Prefer a human? Call {site.phoneDisplay}. Walk-in and phone still post
        to 4100 / 4500.
      </p>
    </section>
  );
}
