"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "Our Community" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line bg-brand-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <span className="font-serif-display text-xl font-semibold tracking-tight text-brand-ink">
            Kindred Circle
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-brand-ink-soft transition-colors hover:text-brand-ink"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/events"
            className="bg-brand-ink px-5 py-2.5 text-xs font-medium uppercase tracking-[0.15em] text-brand-ivory transition-colors hover:bg-brand-clay"
          >
            Find an Event
          </Link>
        </nav>

        <button
          type="button"
          className="text-brand-ink md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-brand-line bg-brand-paper px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-sm font-medium text-brand-ink-soft"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/events"
                className="mt-2 block w-full bg-brand-ink px-5 py-2.5 text-center text-xs font-medium uppercase tracking-[0.15em] text-brand-ivory"
                onClick={() => setOpen(false)}
              >
                Find an Event
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
