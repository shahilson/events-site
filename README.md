# Kindred Circle

A modern, responsive events website for a meetups and social community for
women — homepage, upcoming events listing with search/filtering, event detail
pages, RSVP/registration, and featured events. Built with Next.js (App
Router), TypeScript, and Tailwind CSS, with a data layer wired for
[Wix Headless](https://www.wix.com/headless) (Wix Events + RSVP).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site runs entirely
on curated sample events out of the box — no Wix account required.

## Connecting to Wix Headless (optional)

By default, `src/lib/wix/events.ts` serves events from `src/lib/mock-events.ts`.
To connect it to a real Wix Events collection instead:

1. Create a [Wix Headless](https://www.wix.com/headless) project and enable
   the **Wix Events** app on the connected site.
2. Create an OAuth client ID (Headless Settings → OAuth apps).
3. Copy `.env.example` to `.env.local` and set `WIX_CLIENT_ID`.

Once set, `getAllEvents`, `getFeaturedEvents`, `getEventBySlug`, and
`submitRsvp` in `src/lib/wix/events.ts` call the live Wix Events (`@wix/events`)
SDK — `wixEventsV2.queryEvents` / `getEventBySlug` for reads and
`rsvpV2.createRsvp` for RSVP submissions — falling back to the sample data if
a request fails, so the site never breaks.

## Project structure

```
src/
  app/
    page.tsx                 Homepage (hero, featured events, values, testimonials)
    events/page.tsx          Upcoming events listing with category filter + search
    events/[slug]/page.tsx   Event detail page with RSVP form
    about/page.tsx           Community/about page
    api/rsvp/route.ts        RSVP submission endpoint
  components/                Navbar, footer, event cards, RSVP form, etc.
  lib/
    wix/client.ts            Wix Headless client (OAuth strategy)
    wix/events.ts            Event fetching + RSVP submission, with mock fallback
    mock-events.ts           Sample event data
    types.ts                 Shared EventItem / RSVP types
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
