import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Drinks | Full Bar Roy UT",
  description:
    "Rainbow Saloon in Roy, Utah — full bar, ice-cold beer in Mason jars, bottles and cans, wine, cocktails, growlers, and NA options. No published tap list; ask the bartender.",
};

export default function DrinksPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="kicker">The stick</p>
      <h1 className="display mt-3 text-5xl">Full bar. List at the rail.</h1>
      <p className="mt-5 text-lg text-paper/85">
        There isn’t a published Rainbow drinks menu online. Taps and bottles
        move. What’s true every night:
      </p>
      <ul className="mt-8 space-y-4 text-paper/85">
        <li>
          <strong className="text-cream">Beer</strong> — ice-cold, often in
          Mason jars. Draft, bottles, and cans. Growlers when they’re in.
        </li>
        <li>
          <strong className="text-cream">Full bar</strong> — liquor for
          cocktails and shots, plus wine.
        </li>
        <li>
          <strong className="text-cream">Non-alcoholic</strong> — Coors Edge and
          Athletic Brewing have been spotted here. Ask what’s cold.
        </li>
        <li>
          <strong className="text-cream">You don’t have to drink</strong> to
          belong. ID at the door. 21+.
        </li>
      </ul>
      <p className="mt-8 text-sm text-muted">
        We will not invent a cocktail list or tap board. If they send a photo of
        tonight’s beers, it goes here. Until then: ask Julie, Terry, or Brittni.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/order" className="btn btn-primary">
          Order food & tickets
        </Link>
        <Link href="/visit" className="btn btn-ghost">
          Hours & map
        </Link>
      </div>
      <p className="mt-8 text-xs text-muted">
        Last resort:{" "}
        <a href={site.phoneHref} className="underline">
          {site.phoneDisplay}
        </a>
      </p>
    </section>
  );
}
