import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-plank ring-1 ring-amber/40">
        <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden>
          <path
            d="M8 30c0-8.8 7.2-16 16-16s16 7.2 16 16"
            fill="none"
            stroke="url(#rb)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle cx="24" cy="32" r="3.2" fill="#e6a322" />
          <defs>
            <linearGradient id="rb" x1="8" y1="16" x2="40" y2="16">
              <stop stopColor="#e23a22" />
              <stop offset="0.25" stopColor="#e6a322" />
              <stop offset="0.5" stopColor="#f3e27a" />
              <stop offset="0.75" stopColor="#3d9a4a" />
              <stop offset="1" stopColor="#2f6edb" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      <span className="leading-tight">
        <span className="block font-display text-xl tracking-tight text-cream group-hover:text-amber-bright">
          Rainbow Saloon
        </span>
        {!compact && (
          <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Roy, Utah
          </span>
        )}
      </span>
    </Link>
  );
}
