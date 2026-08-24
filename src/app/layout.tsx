import type { Metadata } from "next";
import { Barlow, Fraunces } from "next/font/google";
import { FundraiserBanner } from "@/components/FundraiserBanner";
import { JsonLd } from "@/components/JsonLd";
import { MobileDock } from "@/components/MobileDock";
import { OrderChat } from "@/components/OrderChat";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rainbow-saloon.vercel.app"),
  title: {
    default: "Rainbow Saloon | Hot Wings Roy UT · Shriners Fundraiser",
    template: "%s · Rainbow Saloon",
  },
  description:
    "Family-owned hometown bar in Roy, Utah. Famous extra-saucy hot wings, Thursday & Saturday steak night, and the 20th Annual Shriners Children’s Hospital Fundraiser — Saturday Aug 29.",
  keywords: [
    "hot wings Roy UT",
    "steak night Roy",
    "Shriners fundraiser Roy",
    "Rainbow Saloon",
    "best wings Roy Utah",
    "hometown bar Roy UT",
    "house sauce wings",
  ],
  openGraph: {
    title: "Rainbow Saloon — Roy, Utah",
    description: `${site.slogan} Extra-saucy hot wings. 20th Annual Shriners fundraiser this Saturday, Aug 29.`,
    images: ["/images/wings-hero.jpg"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/wings-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${barlow.variable}`}>
      <body className="min-h-dvh bg-char pb-28 text-cream antialiased md:pb-0">
        <JsonLd />
        <FundraiserBanner />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <MobileDock />
        <OrderChat />
      </body>
    </html>
  );
}
