import { site } from "@/lib/site";
import Link from "next/link";

export function MobileDock() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-cream/10 bg-char/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur md:hidden">
      <div className="grid grid-cols-3 gap-2">
        <Link href="/fundraiser#tickets" className="btn btn-primary py-3.5 text-[11px]">
          Tickets
        </Link>
        <a href={site.phoneHref} className="btn btn-amber py-3.5 text-[11px]">
          Call
        </a>
        <Link href="/shop" className="btn btn-ghost py-3.5 text-[11px]">
          Wings + sauce
        </Link>
      </div>
    </div>
  );
}
