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
    price: "$12.99 / $21.99",
    copy: "6-piece or 12-piece. House BBQ-tomatoey sweet-heat. Demo price.",
  },
  {
    src: "/images/steak-night.jpg",
    title: "Steak Night",
    price: "$22.00",
    copy: "Thursday & Saturday. Sautéed mushrooms and onions. Demo price.",
  },
  {
    src: "/images/burger.jpg",
    title: "Burgers",
    price: "$11.99 / $14.99",
    copy: "Cheeseburger or pastrami burger. Demo price.",
  },
  {
    src: "/images/cheese-fries.jpg",
    title: "Extra-cheesy cheese fries",
    price: "$8.99",
    copy: "The other reason people don’t leave hungry. Demo price.",
  },
];

export default function MenuPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <p className="kicker">Kitchen</p>
      <h1 className="display mt-3 text-5xl">What to order</h1>
      <p className="mt-4 max-w-2xl text-lg text-paper/80">
        Demo prices for online pay. Pay in chat or on the shop, then pick up
        here. Call {site.phoneDisplay} if you’d rather talk to the bar.
      </p>
      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="overflow-hidden rounded-3xl bg-wood">
            <div className="relative aspect-[4/3]">
              <Image src={item.src} alt={item.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h2 className="font-display text-3xl">{item.title}</h2>
              <p className="mt-1 text-lg font-semibold text-amber">{item.price}</p>
              <p className="mt-2 text-paper/75">{item.copy}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href="/order" className="btn btn-primary">
          Pay in chat
        </Link>
        <Link href="/shop" className="btn btn-ghost">
          Shop sauce & wings
        </Link>
      </div>
    </section>
  );
}
