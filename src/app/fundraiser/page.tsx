import type { Metadata } from "next";
import Image from "next/image";
import { Countdown } from "@/components/Countdown";
import { TicketForm } from "@/components/TicketForm";
import { fundraiser, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "20th Annual Shriners Fundraiser Roy UT | Aug 29 Tickets",
  description:
    "20th Annual Shriners Children’s Hospital Fundraiser at Rainbow Saloon in Roy, Utah. Saturday Aug 29. 450 tickets at $185 — 2 entries, 2 dinners, 2 bands, 100+ prizes. Venmo accepted. All proceeds to Shriners.",
  keywords: [
    "Shriners fundraiser Roy",
    "Shriners Children’s Hospital Utah",
    "Rainbow Saloon fundraiser",
    "Roy UT charity event",
  ],
};

export default function FundraiserPage() {
  return (
    <>
      <section className="relative isolate min-h-[70svh] overflow-hidden">
        <Image
          src="/images/fundraiser.jpg"
          alt="Community night at Rainbow Saloon for the Shriners fundraiser"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char via-char/55 to-char/25" />
        <div className="relative mx-auto flex min-h-[70svh] max-w-6xl flex-col justify-end px-4 pb-14">
          <p className="kicker">Saturday, August 29 · Roy, Utah</p>
          <h1 className="display mt-3 max-w-4xl text-4xl sm:text-6xl">
            20th Annual Shriners Children’s Hospital Fundraiser
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-paper/90">
            {fundraiser.priceLabel} covers two people: 2 entries, 2 dinners, 2
            bands, and 100+ prizes. {fundraiser.ticketCap} tickets only. You do
            not need to be present to win. All proceeds to Shriners.
          </p>
          <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Countdown />
            <a href="#tickets" className="btn btn-amber px-8 py-4">
              Get tickets — {fundraiser.priceLabel}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-ember-deep">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 sm:grid-cols-3">
          {[
            ["450", "tickets. That’s the cap."],
            [fundraiser.priceLabel, "covers two people, dinner, bands, prizes."],
            [site.impact, "donated over the years — because of this room."],
          ].map(([n, copy]) => (
            <div key={copy} className="border-l border-amber/40 pl-4">
              <p className="font-display text-4xl text-amber-bright">{n}</p>
              <p className="mt-1 text-sm text-paper/80">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="tickets"
        className="mx-auto grid max-w-6xl gap-12 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr]"
      >
        <div>
          <p className="kicker">What’s in a ticket</p>
          <h2 className="display mt-3 text-4xl">One envelope. Two people. A hundred chances.</h2>
          <ul className="mt-6 grid gap-3">
            {fundraiser.includes.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-cream/10 bg-wood px-4 py-3 font-semibold"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-paper/80">
            You do <strong className="text-cream">not</strong> need to be present
            to win. Winners are called. Shriners Children’s Hospital sends an
            executive, counts the envelopes, and draws in front of the crowd —
            Harley first, then the rest of the board.
          </p>
          <p className="mt-4 text-sm text-muted">{fundraiser.allProceeds}</p>

          <h3 className="mt-12 font-display text-3xl">Prize board (and then some)</h3>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {fundraiser.prizes.map((prize) => (
              <div
                key={prize.name}
                className="rounded-2xl bg-plank p-4 ring-1 ring-cream/10"
              >
                <p className="font-display text-xl">{prize.name}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {prize.note}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted">
            Plus surfboard, snowboard, and more than 100 prizes in the draw.
          </p>
        </div>
        <TicketForm />
      </section>

      <section className="bg-wood">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="kicker">How to buy</p>
          <h2 className="display mt-3 text-4xl">Three ways. Same ticket.</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Call",
                d: `Call ${site.phoneDisplay}. Tell us your name and how many tickets. We’ll walk you through it.`,
                href: site.phoneHref,
                cta: "Call the bar",
              },
              {
                n: "02",
                t: "Venmo",
                d: fundraiser.venmoNote,
                href: site.phoneHref,
                cta: "Confirm Venmo by phone",
              },
              {
                n: "03",
                t: "Walk in",
                d: `Stop by ${site.address.full}. Open ${site.hours}. Grab a ticket, grab wings.`,
                href: site.mapsUrl,
                cta: "Get directions",
              },
            ].map((step) => (
              <article
                key={step.n}
                className="flex flex-col rounded-2xl border border-cream/10 bg-char p-6"
              >
                <p className="text-amber font-display text-3xl">{step.n}</p>
                <h3 className="mt-2 font-display text-2xl">{step.t}</h3>
                <p className="mt-3 flex-1 text-sm text-paper/80">{step.d}</p>
                <a href={step.href} className="btn btn-ghost mt-6">
                  {step.cta}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="display text-4xl">Straight answers</h2>
        <dl className="mt-8 divide-y divide-cream/10">
          {[
            [
              "Do I have to be there to win?",
              "No. You do not have to be present. They call all the winners.",
            ],
            [
              "What’s included in $185?",
              "2 entries into the party, 2 dinners, 2 bands, and every prize on the board — including grill, Blackstone, kayak, paddle board, swimming pool, bike, gift certificates, and a $1,000 wakeboard.",
            ],
            [
              "How do prizes work?",
              "Each ticket goes into a sealed envelope. Shriners counts them. Then they draw in front of the crowd. Harley is drawn first.",
            ],
            [
              "Can I Venmo?",
              "Yes. Include the word “donation” plus your full name, address, and phone number so the bar can fill out the tickets. Call if you need the handle confirmed.",
            ],
            [
              "Where does the money go?",
              "All proceeds go to Shriners Children’s Hospital. This community has already put more than $250,000 in that direction.",
            ],
          ].map(([q, a]) => (
            <div key={q} className="py-5">
              <dt className="font-display text-2xl">{q}</dt>
              <dd className="mt-2 text-paper/80">{a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
