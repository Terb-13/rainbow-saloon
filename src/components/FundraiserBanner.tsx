import Link from "next/link";
import { fundraiser } from "@/lib/site";

export function FundraiserBanner() {
  return (
    <div className="sticky top-0 z-50">
      <div className="rainbow-bar" />
      <div className="bg-ember text-cream">
        <Link
          href="/fundraiser"
          className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-3 py-2 text-center text-[12px] font-bold uppercase tracking-wide sm:gap-3 sm:py-2.5 sm:text-sm"
        >
          <span className="truncate">
            {fundraiser.dateShort} · {fundraiser.ticketCap} tickets · {fundraiser.priceLabel}
          </span>
          <span className="shrink-0 rounded-full bg-char px-2.5 py-1 text-[11px] text-amber-bright sm:text-xs">
            Get tickets
          </span>
        </Link>
      </div>
    </div>
  );
}
