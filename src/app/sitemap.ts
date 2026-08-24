import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://rainbow-saloon.vercel.app";
  return ["", "/fundraiser", "/wings", "/menu", "/drinks", "/order", "/story", "/visit", "/shop"].map(
    (path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
    }),
  );
}
