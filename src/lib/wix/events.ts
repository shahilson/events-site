import type { wixEventsV2 } from "@wix/events";
import { isWixConfigured, wixClient } from "@/lib/wix/client";
import { mockEvents, getMockEventBySlug } from "@/lib/mock-events";
import { CheckoutPayload, CheckoutResult, EventCategory, EventItem } from "@/lib/types";
import { placeholderImage } from "@/lib/images";

type WixEvent = wixEventsV2.Event;

interface TicketInfo {
  id: string;
  price: number;
  currency: string;
}

const CATEGORY_FALLBACK: EventCategory = "Social";
const ACCENTS: EventItem["accent"][] = ["rose", "plum", "gold"];

function pickAccent(seed: string): EventItem["accent"] {
  const index = seed.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return ACCENTS[index % ACCENTS.length];
}

function formatAddress(address: wixEventsV2.Address | undefined): string {
  if (!address) return "";
  return [address.addressLine1, address.city, address.subdivision, address.postalCode]
    .filter(Boolean)
    .join(", ");
}

// `mainImage` is documented as a plain URL string, but the raw Events V3 API
// (and observed SDK responses) return an Image object `{ id, url, ... }`
// instead — handle both so a real photo set on the event is never missed.
function resolveImage(mainImage: unknown, seed: string): string {
  const url = typeof mainImage === "string" ? mainImage : (mainImage as { url?: string } | undefined)?.url;
  if (url && /^https?:\/\//.test(url)) return url;
  return placeholderImage(seed);
}

// The `URLS` fieldset is documented as an "Event page URL components" object,
// but has also been observed as a single ready-made URL string depending on
// the API surface — handle both so the checkout redirect never breaks.
function resolveEventPageUrl(url: unknown): string {
  if (typeof url === "string") return url;
  if (url && typeof url === "object") {
    const { base = "", path = "" } = url as { base?: string; path?: string };
    return `${base}${path}`;
  }
  return "";
}

// Fetches the priced "General Admission"-style ticket definition for each
// event in one request, keyed by eventId. An event with no ticket definition
// yet (e.g. mid-setup in the Wix dashboard) is simply omitted from the map.
async function fetchTicketInfoByEventId(eventIds: string[]): Promise<Map<string, TicketInfo>> {
  const map = new Map<string, TicketInfo>();
  if (!wixClient || eventIds.length === 0) return map;

  const res = await wixClient.fetchWithAuth("https://www.wixapis.com/events/v3/ticket-definitions/query", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: { filter: { eventId: { $in: eventIds } } } }),
  });
  if (!res.ok) throw new Error(`Ticket definitions query failed: ${res.status}`);
  const data = await res.json();

  for (const def of data.ticketDefinitions ?? []) {
    const fixed = def.pricingMethod?.fixedPrice;
    const guest = def.pricingMethod?.guestPrice;
    const price = fixed ?? guest;
    if (!def.eventId || !price) continue;
    map.set(def.eventId, {
      id: def.id,
      price: Number(price.value),
      currency: price.currency,
    });
  }
  return map;
}

function mapWixEventToEventItem(event: WixEvent, ticket: TicketInfo | undefined): EventItem | undefined {
  if (!ticket) return undefined;

  const start = event.dateAndTimeSettings?.startDate ?? new Date().toISOString();
  const end = event.dateAndTimeSettings?.endDate ?? start;

  return {
    id: event._id ?? event.slug ?? crypto.randomUUID(),
    slug: event.slug ?? event._id ?? "",
    title: event.title ?? "Untitled Event",
    category: CATEGORY_FALLBACK,
    tagline: event.shortDescription ?? "",
    description: event.shortDescription ?? "",
    startDate: new Date(start).toISOString(),
    endDate: new Date(end).toISOString(),
    locationName: event.location?.name ?? (event.location?.type === "ONLINE" ? "Online" : "TBD"),
    address: formatAddress(event.location?.address),
    isOnline: event.location?.type === "ONLINE",
    imageUrl: resolveImage(event.mainImage, event.slug ?? event._id ?? event.title ?? "event"),
    featured: false,
    host: "Community Team",
    accent: pickAccent(event._id ?? event.title ?? "event"),
    ticketPrice: ticket.price,
    ticketCurrency: ticket.currency,
    ticketDefinitionId: ticket.id,
    eventPageUrl: resolveEventPageUrl(event.eventPageUrl),
  };
}

export async function getAllEvents(): Promise<EventItem[]> {
  if (!isWixConfigured || !wixClient) {
    return mockEvents;
  }

  try {
    const result = await wixClient.events
      .queryEvents({ fields: ["DETAILS", "REGISTRATION", "URLS", "DASHBOARD"] })
      .ascending("dateAndTimeSettings.startDate")
      .find();

    const eventIds = result.items.map((e) => e._id).filter((id): id is string => Boolean(id));
    const ticketsByEvent = await fetchTicketInfoByEventId(eventIds);

    return result.items
      .map((event) => mapWixEventToEventItem(event, event._id ? ticketsByEvent.get(event._id) : undefined))
      .filter((event): event is EventItem => Boolean(event));
  } catch (error) {
    console.error("Falling back to sample events — Wix Events query failed:", error);
    return mockEvents;
  }
}

export async function getFeaturedEvents(): Promise<EventItem[]> {
  const all = await getAllEvents();
  const featured = all.filter((e) => e.featured);
  return featured.length > 0 ? featured : all.slice(0, 3);
}

export async function getEventBySlug(slug: string): Promise<EventItem | undefined> {
  if (!isWixConfigured || !wixClient) {
    return getMockEventBySlug(slug);
  }

  try {
    const result = await wixClient.events.getEventBySlug(slug, {
      fields: ["DETAILS", "TEXTS", "REGISTRATION", "URLS", "DASHBOARD"],
    });
    if (!result.event?._id) return undefined;

    const ticketsByEvent = await fetchTicketInfoByEventId([result.event._id]);
    return mapWixEventToEventItem(result.event, ticketsByEvent.get(result.event._id));
  } catch (error) {
    console.error("Falling back to sample event — Wix Events lookup failed:", error);
    return getMockEventBySlug(slug);
  }
}

export async function createCheckout(payload: CheckoutPayload): Promise<CheckoutResult> {
  if (!isWixConfigured || !wixClient) {
    return {
      success: true,
      message: "Demo mode — connect Wix Headless to process real ticket purchases.",
    };
  }

  try {
    const reservationRes = await wixClient.fetchWithAuth("https://www.wixapis.com/events/v1/ticket-reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketReservation: {
          tickets: [{ ticketDefinitionId: payload.ticketDefinitionId, quantity: payload.quantity }],
        },
      }),
    });
    if (!reservationRes.ok) throw new Error(`Reservation failed: ${reservationRes.status}`);
    const reservation = await reservationRes.json();
    const reservationId = reservation.ticketReservation?.id;
    if (!reservationId) throw new Error("No reservation id returned");

    return {
      success: true,
      message: "Redirecting you to checkout…",
      checkoutUrl: `${payload.eventPageUrl}/ticket-form?reservationId=${reservationId}`,
    };
  } catch (error) {
    console.error("Ticket checkout failed:", error);
    return {
      success: false,
      message: "We couldn't start checkout right now. Please try again shortly.",
    };
  }
}
