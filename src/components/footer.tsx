import Link from "next/link";
import { Camera, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-ivory">
      <div className="mx-auto max-w-6xl px-6 py-14 sm:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <span className="text-lg font-extrabold uppercase tracking-tight text-brand-ink">
              Kindred Circle
            </span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-ink-soft">
              A community of meetups and social events for like-minded women —
              built on the belief that showing up for each other changes
              everything.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-ink">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm text-brand-ink-soft">
              <li>
                <Link href="/events" className="hover:text-brand-rust">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-rust">
                  Our Community
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-brand-rust">
                  Host with Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-ink">Stay in the loop</h3>
            <p className="mt-3 text-sm text-brand-ink-soft">
              New events land in your inbox every week — no spam, just circles
              worth joining.
            </p>
            <div className="mt-4 flex items-center gap-3 text-brand-ink">
              <a
                href="mailto:hello@kindredcircle.co"
                aria-label="Email Kindred Circle"
                className="border border-brand-line p-2 transition-colors hover:border-brand-ink"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="Kindred Circle on Instagram"
                className="border border-brand-line p-2 transition-colors hover:border-brand-ink"
              >
                <Camera className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-brand-line pt-6 text-xs text-brand-ink-soft sm:flex-row">
          <p>© {new Date().getFullYear()} Kindred Circle. Made with care, by and for women.</p>
          <p>Powered by Wix Headless</p>
        </div>
      </div>
    </footer>
  );
}
