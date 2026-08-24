import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchen order board",
  robots: { index: false, follow: false },
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
