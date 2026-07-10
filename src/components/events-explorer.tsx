"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import EventCard from "@/components/event-card";
import { EventCategory, EventItem } from "@/lib/types";

const CATEGORIES: (EventCategory | "All")[] = [
  "All",
  "Wellness",
  "Outdoors",
  "Professional",
  "Creative",
  "Social",
];

export default function EventsExplorer({ events }: { events: EventItem[] }) {
  const [category, setCategory] = useState<EventCategory | "All">("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return events
      .filter((event) => category === "All" || event.category === category)
      .filter((event) => {
        if (!query.trim()) return true;
        const haystack = `${event.title} ${event.tagline} ${event.locationName}`.toLowerCase();
        return haystack.includes(query.trim().toLowerCase());
      })
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [events, category, query]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                category === c
                  ? "bg-brand-plum-600 text-brand-ivory"
                  : "bg-brand-ivory text-brand-ink-soft ring-1 ring-inset ring-brand-blush-200 hover:bg-brand-blush-100"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink-soft" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events or locations"
            className="w-full rounded-full border border-brand-blush-200 bg-brand-ivory py-2.5 pl-9 pr-4 text-sm text-brand-ink placeholder:text-brand-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-brand-rose-400"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-sm text-brand-ink-soft">
          No events match just yet — try a different category or search term.
        </p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
