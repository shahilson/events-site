import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { placeholderImage } from "@/lib/images";

export default function Hero() {
  return (
    <section className="relative">
      <div className="relative h-[70vh] min-h-[520px] w-full overflow-hidden">
        <Image
          src={placeholderImage("kindred-circle-hero", 1800, 1400)}
          alt="Women gathered together at a Kindred Circle event"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-ink/80 via-brand-ink/25 to-brand-ink/10" />

        <div className="relative flex h-full flex-col justify-end px-6 pb-14 sm:px-10 sm:pb-20">
          <div className="mx-auto w-full max-w-6xl">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-brand-sand">
              Est. for women who show up
            </p>
            <h1 className="mt-5 max-w-2xl text-balance font-serif-display text-4xl font-semibold leading-[1.05] text-brand-ivory sm:text-6xl">
              Find your circle.
              <br />
              Show up as you are.
            </h1>
            <p className="mt-6 max-w-md text-balance text-base leading-relaxed text-brand-ivory/80">
              Meetups and social events for like-minded women — wellness
              mornings, hikes, founder talks, and studio nights.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/events"
                className="inline-flex items-center justify-center gap-2 bg-brand-ivory px-7 py-3.5 text-sm font-semibold tracking-wide text-brand-ink transition-colors hover:bg-brand-sand"
              >
                Browse Upcoming Events
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border border-brand-ivory/50 px-7 py-3.5 text-sm font-semibold tracking-wide text-brand-ivory transition-colors hover:bg-brand-ivory/10"
              >
                Meet the Community
              </Link>
            </div>
          </div>
        </div>
      </div>

      <dl className="mx-auto grid max-w-6xl grid-cols-3 gap-6 border-b border-brand-line px-6 py-8 sm:px-10">
        <div>
          <dt className="sr-only">Members</dt>
          <dd className="font-serif-display text-2xl font-semibold text-brand-ink sm:text-3xl">2,400+</dd>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brand-ink-soft">Members</p>
        </div>
        <div>
          <dt className="sr-only">Events hosted</dt>
          <dd className="font-serif-display text-2xl font-semibold text-brand-ink sm:text-3xl">180+</dd>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brand-ink-soft">Events hosted</p>
        </div>
        <div>
          <dt className="sr-only">Cities</dt>
          <dd className="font-serif-display text-2xl font-semibold text-brand-ink sm:text-3xl">12</dd>
          <p className="mt-1 text-xs uppercase tracking-[0.15em] text-brand-ink-soft">Cities</p>
        </div>
      </dl>
    </section>
  );
}
