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
    bg: "bg-brand-clay-soft",
    text: "text-brand-clay-dark",
    ring: "ring-brand-clay/40",
    solidBg: "bg-brand-clay",
  },
  plum: {
    bg: "bg-brand-ink/[0.06]",
    text: "text-brand-ink",
    ring: "ring-brand-ink/30",
    solidBg: "bg-brand-ink",
  },
  gold: {
    bg: "bg-brand-olive-soft",
    text: "text-brand-olive",
    ring: "ring-brand-olive/40",
    solidBg: "bg-brand-olive",
  },
};

export const CATEGORY_ICONS: Record<EventCategory, LucideIcon> = {
  Wellness: Sparkles,
  Outdoors: Mountain,
  Professional: Briefcase,
  Creative: Palette,
  Social: Users,
};
