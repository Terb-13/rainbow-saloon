"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { nav } from "@/lib/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-cream/10 bg-char/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold uppercase tracking-[0.14em] text-paper/80 hover:text-amber"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/order" className="btn btn-amber py-3">
            Order
          </Link>
        </nav>
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-cream/20 lg:hidden"
          aria-expanded={open}
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-cream" />
            <span className="block h-0.5 w-5 bg-cream" />
            <span className="block h-0.5 w-3 bg-amber" />
          </span>
        </button>
      </div>
      {open && (
        <div className="border-t border-cream/10 bg-wood px-4 py-4 lg:hidden">
          <nav className="grid gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-base font-semibold uppercase tracking-wider hover:bg-cream/5"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/order" onClick={() => setOpen(false)} className="btn btn-amber mt-2 w-full">
              Order
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
