# Kindred Circle

A modern, responsive events website for a meetups and social community for
women — homepage, upcoming events listing with search/filtering, event detail
pages, ticket purchase, and featured events. Built with Next.js (App Router),
TypeScript, and Tailwind CSS, with a data layer wired for
[Wix Headless](https://www.wix.com/headless) (Wix Events & Tickets).

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
   the **Wix Events & Tickets** app on the connected site.
2. Set up a payment method for the site (**Settings → Accept Payments**) so
   ticket checkout can actually process a payment.
3. Create an OAuth client ID (Headless Settings → OAuth apps).
4. Copy `.env.example` to `.env.local` and set `WIX_CLIENT_ID`.

Once set, `getAllEvents`, `getFeaturedEvents`, `getEventBySlug`, and
`createCheckout` in `src/lib/wix/events.ts` call the live Wix Events
(`@wix/events`) SDK and REST API — `wixEventsV2.queryEvents` / `getEventBySlug`
for reads, the Ticket Definitions API for pricing, and the Ticket
Reservations API + a redirect to the Wix-hosted ticket checkout page for
purchases — falling back to the sample data if a request fails, so the site
never breaks.

Every event on the site is a paid, ticketed event — Wix doesn't allow
converting an event between free RSVP and paid ticketing after creation, so
if you want free events too, create them as separate RSVP-type events and
extend the data layer accordingly.

## Project structure

```
src/
  app/
    page.tsx                 Homepage (hero, featured events, values, testimonials)
    events/page.tsx          Upcoming events listing with category filter + search
    events/[slug]/page.tsx   Event detail page with ticket purchase
    about/page.tsx           Community/about page
    api/checkout/route.ts    Ticket reservation + checkout redirect endpoint
  components/                Navbar, footer, event cards, buy-tickets form, etc.
  lib/
    wix/client.ts            Wix Headless client (OAuth strategy)
    wix/events.ts            Event + ticket fetching, checkout, with mock fallback
    mock-events.ts           Sample event data
    types.ts                 Shared EventItem / checkout types
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
