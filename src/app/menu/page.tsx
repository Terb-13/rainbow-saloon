import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Menu Teasers | Steak Night Roy UT",
  description:
    "Steak night Thursday and Saturday at Rainbow Saloon in Roy, Utah. Extra-saucy hot wings, burgers, extra-cheesy fries. Call 801-776-9678.",
  keywords: ["steak night Roy", "hot wings Roy UT", "Rainbow Saloon menu"],
};

const items = [
  {
    src: "/images/wings-hero.jpg",
    title: "Extra-saucy hot wings",
    copy: "House-made BBQ-tomatoey sweet-heat. The thing we’re famous for.",
  },
  {
    src: "/images/steak-night.jpg",
    title: "Steak Night",
    copy: "Thursday & Saturday. Sautéed mushrooms and onions. A Roy ritual.",
  },
  {
    src: "/images/burger.jpg",
    title: "Burgers",
    copy: "Cheeseburgers and the pastrami burger locals mention by name.",
  },
  {
    src: "/images/cheese-fries.jpg",
    title: "Extra-cheesy cheese fries",
    copy: "The other reason people don’t leave hungry.",
  },
];

export default function MenuPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="kicker">Kitchen</p>
      <h1 className="display mt-3 text-5xl">What to order</h1>
      <p className="mt-4 max-w-2xl text-lg text-paper/80">
        Full menu lives at the bar. This is the greatest-hits reel — the plates
        people actually talk about. Call {site.phoneDisplay} for to-go or a
        large table.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-3xl bg-wood">
            <div className="relative aspect-[4/3]">
              <Image src={item.src} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="font-display text-3xl">{item.title}</h2>
              <p className="mt-2 text-paper/75">{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <a href={site.phoneHref} className="btn btn-primary">
          Call to order
        </a>
        <Link href="/shop" className="btn btn-ghost">
          Wings to-go & sauce
        </Link>
      </div>
    </section>
  );
}
