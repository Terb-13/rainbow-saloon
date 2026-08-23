import Image from "next/image";
import Link from "next/link";
import { Countdown } from "@/components/Countdown";
import { fundraiser, site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-char">
        <div className="grid lg:min-h-[78svh] lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <div className="relative order-1 min-h-[48svh] lg:order-2 lg:min-h-full">
            <Image
              src="/images/wings-hero.jpg"
              alt="Extra-saucy house-sauce hot wings at Rainbow Saloon in Roy, Utah"
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center p-4 lg:hidden">
              <Link href="/fundraiser" className="btn btn-primary w-full max-w-sm shadow-lg">
                Get Aug 29 tickets
              </Link>
            </div>
          </div>
          <div className="order-2 flex flex-col justify-center px-4 py-10 sm:px-8 lg:order-1 lg:px-12 lg:py-16">
            <p className="kicker">Hometown bar · Roy, Utah</p>
            <h1 className="display mt-4 max-w-xl text-4xl text-cream sm:text-6xl">
              Extra-saucy hot wings.
              <span className="block text-amber">House sauce. Local legend.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-paper/85 sm:text-lg">
              BBQ-tomatoey sweet heat, piled on crispy wings. Thursday & Saturday
              steak night. This Saturday: the 20th Annual Shriners fundraiser.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/fundraiser" className="btn btn-primary px-8 py-4 text-sm">
                Get Aug 29 tickets
              </Link>
              <Link href="/wings" className="btn btn-ghost px-8 py-4 text-sm">
                See the wings
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-wider text-muted">
              <span>Open {site.hours}</span>
              <span>Call {site.phoneDisplay}</span>
              <span>{site.impact} to Shriners</span>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-cream/10 bg-ember-deep">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="kicker text-amber-bright">{fundraiser.dateLabel}</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">
              20th Annual Shriners Children’s Hospital Fundraiser
            </h2>
            <p className="mt-3 max-w-2xl text-paper/85">
              Only {fundraiser.ticketCap} tickets at {fundraiser.priceLabel}. Each
              includes 2 entries, 2 dinners, 2 bands, and 100+ prizes. You do not
              need to be present to win. All proceeds to Shriners.
            </p>
            <Link href="/fundraiser" className="btn btn-amber mt-6">
              Full details & tickets
            </Link>
          </div>
          <Countdown />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/images/wings-toss.jpg"
            alt="Wings being tossed in extra house sauce"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <p className="kicker">The house sauce</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">
            Extra saucy on purpose.
          </h2>
          <p className="mt-5 text-lg text-paper/85">
            Locals don’t come for a dry rub. They come for the pour — a
            BBQ-tomatoey sweet-heat that clings, drips, and keeps you reaching
            for the next wing. Mild still has flavor. Heat still has balance.
          </p>
          <p className="mt-4 text-paper/75">
            Take them to-go, or take the sauce home in stand-up flex pouches
            with a spout (our recommendation) or bottles.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/wings" className="btn btn-primary">
              The wing story
            </Link>
            <Link href="/shop" className="btn btn-ghost">
              Order sauce & pickup
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-wood">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="kicker">From the kitchen</p>
              <h2 className="display mt-3 text-4xl">More than wings</h2>
            </div>
            <Link href="/menu" className="hidden text-sm font-bold uppercase tracking-widest text-amber md:inline">
              Full teaser →
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                src: "/images/steak-night.jpg",
                title: "Steak Night",
                copy: "Thursday & Saturday. Mushrooms, onions, the plate that brings people back.",
              },
              {
                src: "/images/wings-hero.jpg",
                title: "Hot Wings",
                copy: "Roy’s extra-saucy house-sauce wings. Dine-in or to-go.",
              },
              {
                src: "/images/burger.jpg",
                title: "Burgers",
                copy: "Including the pastrami burger the regulars swear by.",
              },
              {
                src: "/images/cheese-fries.jpg",
                title: "Cheese Fries",
                copy: "Extra cheesy. The other thing people drive for.",
              },
            ].map((card) => (
              <Link
                key={card.title}
                href="/menu"
                className="group overflow-hidden rounded-2xl bg-plank"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-2xl">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted">{card.copy}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <Image
          src="/images/bar-interior.jpg"
          alt="Dark wood bar interior at Rainbow Saloon"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-char via-char/80 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-4 py-24">
          <p className="kicker">Our story</p>
          <h2 className="display mt-3 max-w-3xl text-4xl sm:text-5xl">
            Terry, Julie, and Brittni. A family first, a bar second.
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-paper/85">
            Terry and Julie met behind this bar, took it over when the original
            closed, and built a place where 21 to 91 are welcome — whether you
            drink or not. {site.slogan}
          </p>
          <Link href="/story" className="btn btn-ghost mt-8">
            Read the story
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-20 lg:grid-cols-2">
        <div>
          <p className="kicker">Visit</p>
          <h2 className="display mt-3 text-4xl">Come as you are.</h2>
          <p className="mt-4 text-paper/80">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
          <p className="mt-3 font-semibold">{site.hoursShort}</p>
          <a href={site.phoneHref} className="mt-2 block text-2xl font-bold text-amber">
            {site.phoneDisplay}
          </a>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={site.mapsUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
              Open map
            </a>
            <Link href="/visit" className="btn btn-ghost">
              Hours & directions
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-cream/10">
          <iframe
            title="Map to Rainbow Saloon"
            src={site.mapsEmbed}
            className="h-80 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
