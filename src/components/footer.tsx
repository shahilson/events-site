import Link from "next/link";
import { Sparkle, Camera, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-brand-blush-200/70 bg-brand-ivory">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 text-brand-plum-600" strokeWidth={1.75} />
              <span className="font-serif-display text-lg font-semibold text-brand-plum-700">
                Kindred Circle
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-ink-soft">
              A community of meetups and social events for like-minded women —
              built on the belief that showing up for each other changes
              everything.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-plum-700">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-ink-soft">
              <li>
                <Link href="/events" className="hover:text-brand-plum-700">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-plum-700">
                  Our Community
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-brand-plum-700">
                  Host with Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-brand-plum-700">Stay in the loop</h3>
            <p className="mt-3 text-sm text-brand-ink-soft">
              New events land in your inbox every week — no spam, just circles
              worth joining.
            </p>
            <div className="mt-4 flex items-center gap-3 text-brand-plum-700">
              <a
                href="mailto:hello@kindredcircle.co"
                aria-label="Email Kindred Circle"
                className="rounded-full border border-brand-plum-600/30 p-2 transition-colors hover:bg-brand-blush-100"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Kindred Circle on Instagram"
                className="rounded-full border border-brand-plum-600/30 p-2 transition-colors hover:bg-brand-blush-100"
              >
                <Camera className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-blush-200/70 pt-6 text-xs text-brand-ink-soft/80 sm:flex-row">
          <p>© {new Date().getFullYear()} Kindred Circle. Made with care, by and for women.</p>
          <p>Powered by Wix Headless</p>
        </div>
      </div>
    </footer>
  );
}
