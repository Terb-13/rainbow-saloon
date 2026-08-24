import Link from "next/link";
import { site } from "@/lib/site";

export default async function ThanksPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  return (
    <section className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="kicker">Ticket in</p>
      <h1 className="display mt-3 text-5xl">Kitchen has it.</h1>
      <p className="mt-4 text-lg text-paper/85">
        {id ? (
          <>
            Order <span className="text-amber">{id}</span> is on the board.
          </>
        ) : (
          "Your order is on the board."
        )}{" "}
        Pickup at {site.address.street}.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/order" className="btn btn-primary">
          Order something else
        </Link>
        <Link href="/" className="btn btn-ghost">
          Home
        </Link>
      </div>
      <p className="mt-8 text-xs text-muted">
        Last resort:{" "}
        <a href={site.phoneHref} className="underline">
          {site.phoneDisplay}
        </a>
      </p>
    </section>
  );
}
