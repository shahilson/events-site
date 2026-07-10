import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-blush-100 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-32 top-40 h-80 w-80 rounded-full bg-brand-gold-soft/40 blur-3xl"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 pb-20 pt-16 text-center sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-blush-100 px-4 py-1.5 text-xs font-medium text-brand-plum-700">
          <Sparkles className="h-3.5 w-3.5" />
          Real women. Real rooms. Real connection.
        </span>

        <h1 className="mt-6 max-w-3xl text-balance font-serif-display text-4xl font-semibold leading-tight text-brand-plum-900 sm:text-6xl">
          Find your circle. Show up as you are.
        </h1>

        <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-brand-ink-soft">
          Kindred Circle is a community of meetups and social events for
          like-minded women — wellness mornings, hikes, founder talks, studio
          nights, and everything in between.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/events"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-plum-600 px-7 py-3.5 text-sm font-semibold text-brand-ivory transition-colors hover:bg-brand-plum-700"
          >
            Browse Upcoming Events
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-brand-plum-600/30 px-7 py-3.5 text-sm font-semibold text-brand-plum-700 transition-colors hover:bg-brand-blush-100"
          >
            Meet the Community
          </Link>
        </div>

        <dl className="mt-16 grid w-full max-w-xl grid-cols-3 gap-6 border-t border-brand-blush-200/70 pt-8">
          <div>
            <dt className="sr-only">Members</dt>
            <dd className="font-serif-display text-2xl font-semibold text-brand-plum-700">2,400+</dd>
            <p className="mt-1 text-xs uppercase tracking-wide text-brand-ink-soft">Members</p>
          </div>
          <div>
            <dt className="sr-only">Events hosted</dt>
            <dd className="font-serif-display text-2xl font-semibold text-brand-plum-700">180+</dd>
            <p className="mt-1 text-xs uppercase tracking-wide text-brand-ink-soft">Events hosted</p>
          </div>
          <div>
            <dt className="sr-only">Cities</dt>
            <dd className="font-serif-display text-2xl font-semibold text-brand-plum-700">12</dd>
            <p className="mt-1 text-xs uppercase tracking-wide text-brand-ink-soft">Cities</p>
          </div>
        </dl>
      </div>
    </section>
  );
}
