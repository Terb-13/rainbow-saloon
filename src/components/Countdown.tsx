"use client";

import { useEffect, useState } from "react";
import { fundraiser } from "@/lib/site";

const TARGET = new Date(`${fundraiser.isoDate}T12:00:00-06:00`).getTime();

function parts(ms: number) {
  const total = Math.max(0, ms);
  const days = Math.floor(total / 86400000);
  const hours = Math.floor((total % 86400000) / 3600000);
  const minutes = Math.floor((total % 3600000) / 60000);
  return { days, hours, minutes, done: total === 0 };
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return (
      <p className="kicker">The 20th annual is {fundraiser.dateShort}</p>
    );
  }

  const t = parts(TARGET - now);
  if (t.done) {
    return (
      <p className="kicker">Fundraiser day — call if you still need a ticket</p>
    );
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      {[
        [t.days, "days"],
        [t.hours, "hrs"],
        [t.minutes, "min"],
      ].map(([n, label]) => (
        <div key={String(label)} className="text-center">
          <div className="font-display text-4xl leading-none text-cream sm:text-5xl">
            {n}
          </div>
          <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
            {label}
          </div>
        </div>
      ))}
    </div>
  );
}
