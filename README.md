# Scissor's — The Unisex Salon (Dewas)

A premium, animated landing experience built for Scissor's Dewas by Exsora.

React · Vite · TypeScript · Tailwind CSS v4 · GSAP · Framer Motion · Lenis

## Run it locally

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. To build for production:

```bash
npm run build
npm run preview   # serve the production build locally to check it
```

The `dist/` folder produced by `npm run build` is what you upload to your
hosting provider (Vercel, Netlify, Hostinger, etc. all work — it's a static
site).

## Editing real business details

Everything a non-developer needs to change lives in `src/config/`:

| File | What it controls |
|---|---|
| `business.ts` | WhatsApp number, address, opening hours, Instagram / Google Review links, founding year |
| `services.ts` | Service list, descriptions, pricing, images |
| `artists.ts` | Team member names, roles, bios, photos |
| `content.ts` | Gallery captions, FAQs, reviews, "why us" points, journey steps |
| `media.ts` | Every image/video source in one place |

**Before launch, replace the `TODO` placeholders in `business.ts`:**
the real WhatsApp number, the real Instagram handle, and the real Google
Business review link. Nothing else needs to change for the site to go live
with accurate information.

## Notes on media

- Photos in `src/assets/salon/` are real Scissor's Dewas photography
  (team portraits + interior shots), supplied by the client.
- Remaining campaign-style imagery/video (hero background, bridal/colour
  editorial shots) is free-license stock from Mixkit and Pexels — no
  attribution required, and safe to keep or swap for a real photoshoot
  later. Swap by replacing the URLs in `src/config/media.ts`.

## Architecture

- `src/sections/` — one file per page section (Hero, Services, Artists, …)
- `src/components/` — shared UI (Navbar, buttons, popup, WhatsApp float)
- `src/hooks/` — Lenis smooth-scroll + GSAP cleanup helpers
- `src/utils/whatsapp.ts` — every WhatsApp CTA on the site builds its
  pre-filled message through this one file
