import Link from "next/link";
import { Logo } from "./Logo";
import { nav, site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-cream/10 bg-wood">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-md text-muted">{site.slogan}</p>
          <p className="mt-3 max-w-md text-sm text-paper/70">
            Family-owned hometown bar in Roy, Utah. Famous extra-saucy hot wings,
            Thursday & Saturday steak night, and more than {site.impact} donated
            to Shriners Children’s Hospital.
          </p>
        </div>
        <div>
          <p className="kicker">Visit</p>
          <p className="mt-3 text-paper">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.state} {site.address.zip}
          </p>
          <p className="mt-2 text-sm text-muted">{site.hoursShort}</p>
          <a
            href={site.phoneHref}
            className="mt-3 inline-block font-bold text-amber hover:text-amber-bright"
          >
            {site.phoneDisplay}
          </a>
        </div>
        <div>
          <p className="kicker">Jump</p>
          <ul className="mt-3 grid gap-2 text-sm font-semibold uppercase tracking-wider">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-amber">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="rainbow-bar" />
      <div className="flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted sm:flex-row sm:px-8">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.address.full}
        </p>
        <div className="flex gap-4">
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
    </footer>
  );
}
