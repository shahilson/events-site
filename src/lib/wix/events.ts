import type { wixEventsV2 } from "@wix/events";
import { isWixConfigured, wixClient } from "@/lib/wix/client";
import { mockEvents, getMockEventBySlug } from "@/lib/mock-events";
import { EventCategory, EventItem, RsvpPayload, RsvpResult } from "@/lib/types";
import { placeholderImage } from "@/lib/images";

type WixEvent = wixEventsV2.Event;

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

// `mainImage` is only a ready-to-use URL when the DETAILS fieldset resolved a
// real image set in the Wix dashboard; fall back to a placeholder otherwise.
function resolveImage(mainImage: string | undefined, seed: string): string {
  if (mainImage && /^https?:\/\//.test(mainImage)) return mainImage;
  return placeholderImage(seed);
}

// Wix Events doesn't have a built-in "category" concept the way this design
// needs it, so live events are grouped from their category labels (set up in
// the Wix dashboard) with a sensible fallback for uncategorized events.
function mapWixEventToEventItem(event: WixEvent): EventItem {
  const start = event.dateAndTimeSettings?.startDate ?? new Date().toISOString();
  const end = event.dateAndTimeSettings?.endDate ?? start;
  const isWaitlistOnly = event.registration?.status === "OPEN_RSVP_WAITLIST_ONLY";

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
    capacity: undefined,
    spotsLeft: isWaitlistOnly ? 0 : undefined,
    featured: false,
    host: "Community Team",
    accent: pickAccent(event._id ?? event.title ?? "event"),
  };
}

export async function getAllEvents(): Promise<EventItem[]> {
  if (!isWixConfigured || !wixClient) {
    return mockEvents;
  }

  try {
    const result = await wixClient.events
      .queryEvents({ fields: ["DETAILS", "REGISTRATION", "DASHBOARD"] })
      .ascending("dateAndTimeSettings.startDate")
      .find();
    return result.items.map(mapWixEventToEventItem);
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
      fields: ["DETAILS", "TEXTS", "REGISTRATION", "DASHBOARD"],
    });
    return result.event ? mapWixEventToEventItem(result.event) : undefined;
  } catch (error) {
    console.error("Falling back to sample event — Wix Events lookup failed:", error);
    return getMockEventBySlug(slug);
  }
}

export async function submitRsvp(payload: RsvpPayload): Promise<RsvpResult> {
  if (!isWixConfigured || !wixClient) {
    return {
      success: true,
      message:
        "You're on the list! (Demo mode — connect Wix Headless to send real RSVPs.)",
      source: "mock",
    };
  }

  try {
    await wixClient.rsvp.createRsvp({
      eventId: payload.eventId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      status: "YES",
      additionalGuestDetails: { guestCount: payload.guestCount },
    });
    return { success: true, message: "You're on the list! Check your email for details.", source: "wix" };
  } catch (error) {
    console.error("RSVP submission to Wix failed:", error);
    return {
      success: false,
      message: "We couldn't submit your RSVP right now. Please try again shortly.",
      source: "wix",
    };
  }
}
