import pkg from "/Users/brettlloyd/contact-fps/node_modules/playwright/index.js";
const { chromium } = pkg;
import { mkdir } from "node:fs/promises";
import path from "node:path";

const out = path.join(import.meta.dirname, "refs");

const pages = [
  { name: "hattieb-home", url: "https://hattieb.com/" },
  { name: "hattieb-about", url: "https://hattieb.com/about-us" },
  { name: "hattieb-menu", url: "https://hattieb.com/menu" },
  { name: "chipotle-home", url: "https://www.chipotle.com/" },
];

const viewports = [
  { folder: "mobile", width: 390, height: 844 },
  { folder: "desktop", width: 1440, height: 900 },
];

async function dismiss(page) {
  const selectors = [
    'button:has-text("Got it")',
    'button:has-text("Accept")',
    'button:has-text("Close")',
    '[aria-label="Close"]',
    'button:has-text("No thanks")',
    'button:has-text("x")',
  ];
  for (const sel of selectors) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 800 })) await el.click({ timeout: 800 });
    } catch {
      /* ignore */
    }
  }
}

const browser = await chromium.launch({ headless: true });
for (const vp of viewports) {
  await mkdir(path.join(out, vp.folder), { recursive: true });
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  for (const target of pages) {
    try {
      await page.goto(target.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      await page.waitForTimeout(2500);
      await dismiss(page);
      await page.waitForTimeout(800);
      const file = path.join(out, vp.folder, `${target.name}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log("saved", file);
    } catch (err) {
      console.error("fail", target.name, vp.folder, err.message);
    }
  }
  await context.close();
}
await browser.close();
