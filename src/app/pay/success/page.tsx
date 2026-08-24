import Link from "next/link";
import { site } from "@/lib/site";

export default async function PaySuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ order?: string }>;
}) {
  const { order } = await searchParams;
  return (
    <section className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="kicker">Paid</p>
      <h1 className="display mt-3 text-5xl">You’re in the kitchen.</h1>
      <p className="mt-4 text-lg text-paper/85">
        {order ? (
          <>
            Order <span className="text-amber">{order}</span> is paid. We’ll
            start the food / hold the tickets.
          </>
        ) : (
          "Payment landed. We’ll start the food."
        )}
      </p>
      <p className="mt-3 text-sm text-muted">
        Questions? Call {site.phoneDisplay}. Pickup at {site.address.full}.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">
          Back home
        </Link>
        <Link href="/order" className="btn btn-ghost">
          Order again
        </Link>
      </div>
    </section>
  );
}
