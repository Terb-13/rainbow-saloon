# Rainbow Saloon Gauntlet

**Reference bar:** [Hattie B’s Hot Chicken](https://hattieb.com/) — full-bleed food photography, persistent Order CTAs, family story. Secondary: Chipotle mobile conversion chrome.

**Repo:** [Terb-13/rainbow-saloon](https://github.com/Terb-13/rainbow-saloon)  
**Production:** https://rainbow-saloon.vercel.app  
**Vercel project:** `rainbow-saloon` (`prj_cwJLHq0syKA92SqsBe9hKLjKs1wr`)

## Pieces

| Piece | Status | Notes |
| --- | --- | --- |
| Design system + shell | **pass** | Ember / amber / charcoal / rainbow bar, Fraunces + Barlow |
| Sticky banner + hero | **pass (R1)** | Blind A/B vs Hattie B’s first screen — **B (ours) 24 vs A 14** |
| Wings + sauce story | **pass (R3)** | Split unobstructed photo + to-go CTA |
| Fundraiser page | **pass (R1)** | All required facts; first-screen CTA stronger than Hattie B’s. R2 added 2-person bundle on hero. |
| Menu teasers | **pass** | Steak night Thu/Sat, wings, burgers, fries |
| Our Story | **pass** | FOX13 facts, Julie quote, slogan. No family likenesses (no consented refs). |
| Visit / Contact | **pass** | Map, click-to-call, hours, address |
| Shop / Order | **pass (R3)** | Pour photo + on-pack typeset label |
| Mobile + SEO | **pass** | Sticky dock, local keywords, JSON-LD BarOrPub + Event |

## Loop log

- **2026-08-23** — Existing repo was a single-file MVP (emoji placeholders, missing Next/Tailwind config). Production Vercel deploy was `ERROR`. Rebuilt App Router + original photography.
- **R1 hero** — WIN vs Hattie B’s (blind). Food unobstructed on desktop; date / 450 / $185 / Get tickets always on screen.
- **R1 fundraiser** — PASS. Missing-on-first-screen nits (bundle, Venmo, not-present) addressed in copy pass.
- **R1 story / visit** — PASS.
- **R1 wings / shop** — FAIL. Overlay on meat; unlabeled pouch.
- **R2** — Lighter overlay, pour photo, HTML product copy. Still FAIL (type on food; name not on pack; desktop cards cropped).
- **R3** — Split wings hero (no type on meat). Typeset paper label on pouch/bottle photos. **PASS** both.
- **Chat / COA** — Added SpaceXAI order chat (Grok 4.6) plus new COA **4300** (digital food) and **4510** (digital Shriners tickets). Kitchen board at `/orders`.
- **Online pay** — Demo prices on every SKU. Chat/shop/tickets go to `/pay/[id]` (test card 4242). Stripe optional.
