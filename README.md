# Rainbow Saloon

Production website for **Rainbow Saloon**, a family-owned hometown bar in Roy, Utah.

- **Live intent:** ticket sales for the 20th Annual Shriners Children’s Hospital Fundraiser (Sat Aug 29), extra-saucy house-sauce wings, sauce pouches/bottles, wing pickup.
- **Stack:** Next.js App Router 16, React 19, Tailwind CSS 4, TypeScript.
- **Repo:** [Terb-13/rainbow-saloon](https://github.com/Terb-13/rainbow-saloon)
- **Vercel:** project `rainbow-saloon` on team `terb-13s-projects`

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
npm start
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero wings, sticky fundraiser CTA, sauce story, menu teasers, story, visit |
| `/fundraiser` | Full ticket conversion page |
| `/wings` | Extra-saucy house sauce story + to-go |
| `/menu` | Steak night, wings, burgers, fries |
| `/story` | Terry, Julie, Brittni — community story |
| `/visit` | Hours, click-to-call, map |
| `/shop` | Flex pouches (recommended), bottles, wing pickup |

## Facts (do not invent)

- Address: 6045 S 1900 W, Roy, UT 84067
- Phone: (801) 776-9678
- Hours: 11 AM – 2 AM daily
- Owners: Terry & Julie Strickland + daughter Brittni
- Slogan: “Saving lives, one jar at a time.”
- Impact: Over $250,000 donated to Shriners
- Fundraiser: Sat Aug 29, 450 tickets, ~$185, 2 entries / 2 dinners / 2 bands / 100+ prizes
- Venmo: include “donation” + full name, address, phone
- Do not need to be present to win
- Steak Night: Thursday & Saturday

Ticket and pickup forms **do not charge cards**. They collect intent and send the guest to call / Venmo / walk-in. Confirm the current Venmo handle by phone before publishing a handle on the site.

## Deploy

GitHub is linked to the existing Vercel project. Push `main` for production.

```bash
git push origin main
vercel --prod --yes
```

Preview:

```bash
vercel --yes
```

## Handoff notes

- Photography lives in `public/images/` (hero wings, toss, pouch, bottle, steak, interior, burger, fries, fundraiser, patio).
- Brand tokens are in `src/app/globals.css` (`ember`, `amber`, `char`, `wood`, rainbow bar).
- Site copy/constants: `src/lib/site.ts`.
- Gauntlet log: `progress.md`.
