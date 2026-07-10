import type { Metadata } from "next";
import SectionHeading from "@/components/section-heading";
import EventsExplorer from "@/components/events-explorer";
import { getAllEvents } from "@/lib/wix/events";

export const metadata: Metadata = {
  title: "Upcoming Events — Kindred Circle",
  description: "Browse upcoming meetups and social events for women — wellness, outdoors, professional, creative, and social gatherings.",
};

export default async function EventsPage() {
  const events = await getAllEvents();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
      <SectionHeading
        eyebrow="What's coming up"
        title="Upcoming events"
        subtitle="From sunrise yoga to founder fireside chats — find the gathering that fits your week."
      />

      <div className="mt-10">
        <EventsExplorer events={events} />
      </div>
    </div>
  );
}
