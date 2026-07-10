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
    bg: "bg-brand-blush-100",
    text: "text-brand-plum-700",
    ring: "ring-brand-rose-300",
    solidBg: "bg-brand-rose-400",
  },
  plum: {
    bg: "bg-brand-plum-600/10",
    text: "text-brand-plum-700",
    ring: "ring-brand-plum-500/40",
    solidBg: "bg-brand-plum-600",
  },
  gold: {
    bg: "bg-brand-gold-soft/40",
    text: "text-brand-plum-700",
    ring: "ring-brand-gold/50",
    solidBg: "bg-brand-gold",
  },
};

export const CATEGORY_ICONS: Record<EventCategory, LucideIcon> = {
  Wellness: Sparkles,
  Outdoors: Mountain,
  Professional: Briefcase,
  Creative: Palette,
  Social: Users,
};
