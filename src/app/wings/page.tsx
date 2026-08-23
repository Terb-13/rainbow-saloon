import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hot Wings Roy UT | Extra-Saucy House Sauce",
  description:
    "Rainbow Saloon hot wings in Roy, Utah — extra saucy, house-made BBQ-tomatoey sweet-heat. Dine-in or to-go. Call 801-776-9678.",
  keywords: [
    "hot wings Roy UT",
    "best wings Roy Utah",
    "house sauce wings",
    "to go wings Roy",
  ],
};

export default function WingsPage() {
  return (
    <>
      <section className="relative isolate min-h-[60svh] overflow-hidden">
        <Image
          src="/images/wings-hero.jpg"
          alt="Glossy extra-saucy hot wings"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char via-char/50 to-char/30" />
        <div className="relative mx-auto flex min-h-[60svh] max-w-6xl flex-col justify-end px-4 pb-12">
          <p className="kicker">Hot wings · Roy, UT</p>
          <h1 className="display mt-3 max-w-3xl text-5xl sm:text-6xl">
            The wings people drive for.
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 lg:grid-cols-2">
        <div>
          <p className="kicker">House-made</p>
          <h2 className="display mt-3 text-4xl">BBQ. Tomato. Sweet heat.</h2>
          <p className="mt-5 text-lg text-paper/85">
            Extra saucy isn’t a bug. It’s the recipe. The house sauce is a
            BBQ-tomatoey sweet-heat that starts friendly and builds — enough
            kick for the regulars, enough flavor if you order mild.
          </p>
          <p className="mt-4 text-paper/75">
            Huge, crispy, juicy, and tossed like we mean it. That’s what the
            neighborhood says. That’s what we plate.
          </p>
          <a href={site.phoneHref} className="btn btn-primary mt-8">
            Call for to-go wings
          </a>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/images/wings-toss.jpg"
            alt="Wings tossed in Rainbow Saloon house sauce"
            fill
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-wood">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
          {[
            ["Dine-in", "Bar, patio, TVs. Eat them dripping at the source."],
            ["To-go pickup", "Call ahead. We toss them when you’re close."],
            ["Sauce to-go", "Stand-up flex pouches with a spout, or bottles."],
          ].map(([t, d]) => (
            <article key={t} className="rounded-2xl bg-plank p-6">
              <h3 className="font-display text-2xl">{t}</h3>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-3xl">
          <Image
            src="/images/sauce-pouch.jpg"
            alt="Stand-up flex pouch of house wing sauce with spout"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="kicker">Take the sauce home</p>
          <h2 className="display mt-3 text-4xl">
            Flex pouches first. Bottles if you want a shelf bottle.
          </h2>
          <p className="mt-5 text-paper/80">
            Stand-up pouches with a spout pour clean, travel in a cooler, and
            don’t rattle around like glass. That’s what we recommend for the
            house sauce. Bottles are here for the pantry.
          </p>
          <p className="mt-4 italic text-amber">{site.slogan}</p>
          <Link href="/shop" className="btn btn-amber mt-8">
            Shop sauce & pickup
          </Link>
        </div>
      </section>
    </>
  );
}
