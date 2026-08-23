import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Visit | Hours, Map & Call Rainbow Saloon Roy UT",
  description:
    "Rainbow Saloon, 6045 S 1900 W, Roy, UT 84067. Open 11 AM – 2 AM daily. Call 801-776-9678. Patio, full bar, hometown wings.",
};

export default function VisitPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="kicker">Visit</p>
      <h1 className="display mt-3 text-5xl">Find the Rainbow.</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl">Hours & contact</h2>
          <p className="mt-4 text-2xl font-semibold">{site.hoursShort}</p>
          <a href={site.phoneHref} className="mt-3 block text-3xl font-bold text-amber">
            {site.phoneDisplay}
          </a>
          <p className="mt-6 text-paper/80">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
          <p className="mt-4 text-sm text-muted">
            Easy off SR-126 / 1900 W. Patio when it’s warm. Full bar — beer,
            wine, cocktails. ID at the door. Everyone welcome.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="btn btn-primary">
              Click to call
            </a>
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Directions
            </a>
          </div>
          <div className="mt-8 flex gap-4 text-sm font-bold uppercase tracking-widest">
            <a href={site.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={site.yelp} target="_blank" rel="noopener noreferrer">
              Yelp
            </a>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-cream/10">
          <iframe
            title="Google map of Rainbow Saloon"
            src={site.mapsEmbed}
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="relative mt-12 aspect-[16/7] overflow-hidden rounded-3xl">
        <Image
          src="/images/patio.jpg"
          alt="Patio at Rainbow Saloon"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
