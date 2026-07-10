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
  capacity?: number;
  spotsLeft?: number;
  featured: boolean;
  host: string;
  accent: "rose" | "plum" | "gold";
}

export interface RsvpPayload {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  guestCount: number;
  notes?: string;
}

export interface RsvpResult {
  success: boolean;
  message: string;
  source: "wix" | "mock";
}
