import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Rainbow Saloon | Roy, UT – Famous Hot Wings & Hometown Bar",
  description:
    "Rainbow Saloon in Roy, Utah – home of the extra-saucy hot wings, legendary steak nights, and the 20th Annual Shriners Children's Hospital Fundraiser. Family-owned since forever. Saving lives, one jar at a time.",
  keywords: [
    "Rainbow Saloon",
    "Roy UT bar",
    "hot wings Roy Utah",
    "steak night Roy",
    "Shriners fundraiser",
    "best wings Utah",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100 antialiased">
        {children}
      </body>
    </html>
  );
}
