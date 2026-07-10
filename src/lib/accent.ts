import { EventCategory, EventItem } from "@/lib/types";
import {
  Sparkles,
  Mountain,
  Briefcase,
  Palette,
  Users,
  type LucideIcon,
} from "lucide-react";

export const ACCENT_STYLES: Record<
  EventItem["accent"],
  { bg: string; text: string; ring: string; solidBg: string }
> = {
  rose: {
    bg: "bg-brand-periwinkle",
    text: "text-brand-ivory",
    ring: "ring-brand-periwinkle/40",
    solidBg: "bg-brand-periwinkle",
  },
  plum: {
    bg: "bg-brand-rust",
    text: "text-brand-ivory",
    ring: "ring-brand-rust/40",
    solidBg: "bg-brand-rust",
  },
  gold: {
    bg: "bg-brand-moss",
    text: "text-brand-ivory",
    ring: "ring-brand-moss/40",
    solidBg: "bg-brand-moss",
  },
};

export const CATEGORY_ICONS: Record<EventCategory, LucideIcon> = {
  Wellness: Sparkles,
  Outdoors: Mountain,
  Professional: Briefcase,
  Creative: Palette,
  Social: Users,
};
