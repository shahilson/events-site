import Hero from "@/components/hero";
import FeaturedEvents from "@/components/featured-events";
import ValuesSection from "@/components/values-section";
import Testimonials from "@/components/testimonials";
import NewsletterCta from "@/components/newsletter-cta";
import { getFeaturedEvents } from "@/lib/wix/events";

export default async function Home() {
  const featuredEvents = await getFeaturedEvents();

  return (
    <>
      <Hero />
      <FeaturedEvents events={featuredEvents} />
      <ValuesSection />
      <Testimonials />
      <NewsletterCta />
    </>
  );
}
