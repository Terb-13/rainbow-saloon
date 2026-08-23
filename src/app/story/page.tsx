import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Story | Family-Owned Bar in Roy, Utah",
  description:
    "Terry and Julie Strickland met at Rainbow Saloon, took it over, and built a hometown bar with daughter Brittni. Saving lives, one jar at a time. Over $250,000 to Shriners.",
};

export default function StoryPage() {
  return (
    <>
      <section className="relative isolate min-h-[50svh] overflow-hidden">
        <Image
          src="/images/bar-interior.jpg"
          alt="Rainbow Saloon bar interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char via-char/50 to-char/20" />
        <div className="relative mx-auto flex min-h-[50svh] max-w-3xl flex-col justify-end px-4 pb-12">
          <p className="kicker">Our story</p>
          <h1 className="display mt-3 text-5xl">A family, then a bar.</h1>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-4 py-16 text-lg leading-relaxed text-paper/85">
        <p>
          Bartending was never Terry Strickland’s dream job. He needed work. He
          took a shift. Thirty-plus years later, he’s still here — because this
          room became a life.
        </p>
        <p className="mt-5">
          He met Julie working at the Rainbow. When the original owner closed
          the 5600 South location, they bought the contents and opened a new
          Rainbow Saloon on State Route 126 — {site.address.street}, Roy. Their
          daughter Brittni grew up in it. Friends met here. Couples started
          here. Regulars treat it like family because the owners do too.
        </p>
        <blockquote className="my-10 border-l-4 border-amber pl-5 font-display text-3xl leading-snug text-cream">
          “A lot of people don’t have family, and so they’ll come here as
          nowhere else to go.”
          <footer className="mt-3 text-base font-sans font-semibold uppercase tracking-widest text-muted">
            Julie Strickland
          </footer>
        </blockquote>
        <p>
          Having a bar in Utah isn’t always easy. They’ve heard the judgment.
          The answer has always been the same: you don’t have to drink to belong
          here. Whether you’re 21 or 91, you’re welcome.
        </p>
        <p className="mt-5">
          That welcome turns into jars on the bar — cancer treatments, funerals,
          the Legacy Suicide Survivors Group, and year after year of the
          Shriners Children’s Hospital fundraiser. Over {site.impact} has gone
          to Shriners because the regulars keep showing up.
        </p>
        <p className="mt-8 font-display text-3xl text-amber">{site.slogan}</p>
        <p className="mt-8 text-sm text-muted">
          Story details drawn from FOX 13’s 2023 profile of the Stricklands and
          the bar’s own community posts.
        </p>
        <Link href="/fundraiser" className="btn btn-primary mt-10">
          This Saturday’s fundraiser
        </Link>
      </article>
    </>
  );
}
