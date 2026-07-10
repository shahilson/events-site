export type EventCategory =
  | "Wellness"
  | "Outdoors"
  | "Professional"
  | "Creative"
  | "Social";

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  category: EventCategory;
  tagline: string;
  description: string;
  startDate: string; // ISO
  endDate: string; // ISO
  locationName: string;
  address: string;
  isOnline: boolean;
  imageUrl: string;
  featured: boolean;
  host: string;
  accent: "rose" | "plum" | "gold";
  ticketPrice: number;
  ticketCurrency: string;
  ticketDefinitionId: string;
  eventPageUrl: string;
}

export interface CheckoutPayload {
  eventId: string;
  ticketDefinitionId: string;
  eventPageUrl: string;
  quantity: number;
}

export interface CheckoutResult {
  success: boolean;
  message: string;
  checkoutUrl?: string;
}
