import type { Metadata } from "next";
import Image from "next/image";
import { PickupForm } from "@/components/PickupForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop House Sauce & Wing Pickup | Rainbow Saloon Roy UT",
  description:
    "Order Rainbow Saloon house sauce in stand-up flex pouches with spout (recommended) or bottles, plus extra-saucy wing pickup in Roy, Utah. Call 801-776-9678.",
};

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="kicker">Shop & pickup</p>
      <h1 className="display mt-3 text-5xl">Sauce in a pouch. Wings in a box.</h1>
      <p className="mt-4 max-w-2xl text-lg text-paper/80">
        No cart gymnastics. Call or send the pickup note — we’ll have it ready
        at {site.address.street}.
      </p>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <article className="overflow-hidden rounded-3xl bg-wood">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/sauce-pour.jpg"
              alt="House sauce pouring from a flex pouch spout onto wings"
              fill
              className="object-cover"
            />
            <span className="absolute left-4 top-4 rounded-full bg-amber px-3 py-1 text-xs font-bold uppercase tracking-wider text-char">
              Recommended · Best for wings
            </span>
            <div className="absolute bottom-4 left-4 right-4 max-w-[14rem] rounded-lg bg-[#f3ead6] p-3 text-char shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Rainbow Saloon
              </p>
              <p className="font-display text-xl leading-tight">House Sauce</p>
              <p className="mt-1 text-[11px] font-semibold">
                BBQ-tomatoey sweet-heat · Extra saucy · Roy, UT
              </p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber">
              Rainbow Saloon · Roy, UT
            </p>
            <h2 className="font-display text-3xl">House sauce · flex pouch</h2>
            <p className="mt-1 text-sm font-semibold text-cream">
              BBQ-tomatoey sweet-heat · Extra saucy
            </p>
            <p className="mt-2 text-paper/75">
              Stand-up pouch with a spout. Pours over wings without a ladle.
              Cooler-friendly. Priced at the bar — call to hold one.
            </p>
            <a href="#pickup" className="btn btn-primary mt-5">
              Pickup pouch
            </a>
          </div>
        </article>
        <article className="overflow-hidden rounded-3xl bg-wood">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/sauce-bottle.jpg"
              alt="Glass bottle of Rainbow Saloon house sauce"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 max-w-[14rem] rounded-lg bg-[#f3ead6] p-3 text-char shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
                Rainbow Saloon
              </p>
              <p className="font-display text-xl leading-tight">House Sauce</p>
              <p className="mt-1 text-[11px] font-semibold">
                Bottle · Extra saucy · Roy, UT
              </p>
            </div>
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber">
              Rainbow Saloon · Roy, UT
            </p>
            <h2 className="font-display text-3xl">House sauce · bottle</h2>
            <p className="mt-1 text-sm font-semibold text-cream">
              BBQ-tomatoey sweet-heat · Extra saucy
            </p>
            <p className="mt-2 text-paper/75">
              For the fridge door. Same sauce that hits the wings. Priced at the
              bar.
            </p>
            <a href="#pickup" className="btn btn-ghost mt-5">
              Pickup bottle
            </a>
          </div>
        </article>
      </div>

      <div className="mt-8 overflow-hidden rounded-3xl bg-plank lg:grid lg:grid-cols-2">
        <div className="relative min-h-64">
          <Image
            src="/images/wings-hero.jpg"
            alt="Wings for pickup"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-8">
          <h2 className="font-display text-3xl">Wing pickup</h2>
          <p className="mt-3 text-paper/80">
            Call when you’re rolling. We toss extra-saucy so they don’t sit.
            Thursday & Saturday you can add steak night — if we still have it.
          </p>
          <a href={site.phoneHref} className="btn btn-primary mt-6">
            Call {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div id="pickup" className="mt-12 grid scroll-mt-32 gap-10 lg:grid-cols-2">
        <PickupForm />
        <div>
          <p className="kicker">Why pouches</p>
          <ul className="mt-4 space-y-3 text-paper/80">
            <li>Spout pours over wings without a ladle.</li>
            <li>Lighter than glass. Cooler-friendly.</li>
            <li>Less shatter, more sauce in the bag.</li>
            <li>{site.slogan}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
