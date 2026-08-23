import pkg from "/Users/brettlloyd/contact-fps/node_modules/playwright/index.js";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const { chromium } = pkg;
const out = path.join(import.meta.dirname, "ours");
const base = "http://localhost:3100";

const pages = [
  { name: "home", url: "/" },
  { name: "fundraiser", url: "/fundraiser" },
  { name: "wings", url: "/wings" },
  { name: "story", url: "/story" },
  { name: "visit", url: "/visit" },
  { name: "shop", url: "/shop" },
  { name: "menu", url: "/menu" },
];

const viewports = [
  { folder: "mobile", width: 390, height: 844 },
  { folder: "desktop", width: 1440, height: 900 },
];

const browser = await chromium.launch({ headless: true });
for (const vp of viewports) {
  await mkdir(path.join(out, vp.folder), { recursive: true });
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  for (const target of pages) {
    await page.goto(base + target.url, { waitUntil: "networkidle", timeout: 30000 });
    await page.waitForTimeout(400);
    await page.screenshot({
      path: path.join(out, vp.folder, `${target.name}.png`),
      fullPage: false,
    });
    await page.screenshot({
      path: path.join(out, vp.folder, `${target.name}-full.png`),
      fullPage: true,
    });
    console.log("saved", vp.folder, target.name);
  }
  await context.close();
}
await browser.close();
