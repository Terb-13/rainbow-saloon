import type { Metadata } from "next";
import { OrderChat } from "@/components/OrderChat";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Order | Wings, Sauce & Shriners Tickets",
  description:
    "Order Rainbow Saloon extra-saucy wings, house sauce, or Aug 29 Shriners tickets online. Demo prices. Call the bar only as a last resort.",
};

export default function OrderPage() {
  return (
    <section className="mx-auto max-w-xl px-4 py-12">
      <p className="kicker">First: order here · Last: call the bar</p>
      <h1 className="display mt-3 text-5xl">Write it up.</h1>
      <p className="mt-4 mb-8 text-lg text-paper/85">
        Tap what you want, add a name and phone, place the ticket. Demo prices.
        No card yet — kitchen still gets the order.
      </p>
      <OrderChat startOpen />
      <p className="mt-6 text-center text-xs text-muted">
        Last resort only:{" "}
        <a href={site.phoneHref} className="underline">
          {site.phoneDisplay}
        </a>
      </p>
    </section>
  );
}
