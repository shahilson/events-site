"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";

export default function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitted");
  }

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="overflow-hidden rounded-3xl bg-brand-plum-700 px-8 py-14 text-center sm:px-16">
        <h2 className="text-balance font-serif-display text-3xl font-semibold text-brand-ivory sm:text-4xl">
          Never miss a gathering
        </h2>
        <p className="mx-auto mt-4 max-w-md text-balance text-brand-blush-100/90">
          Get new events delivered to your inbox weekly. Free to join, easy to
          leave, always worth opening.
        </p>

        {status === "submitted" ? (
          <p className="mt-8 text-sm font-medium text-brand-gold-soft">
            You&apos;re in! Keep an eye on your inbox for what&apos;s next.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-full border border-transparent bg-brand-ivory px-5 py-3 text-sm text-brand-ink placeholder:text-brand-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-brand-gold"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gold px-6 py-3 text-sm font-semibold text-brand-plum-900 transition-colors hover:bg-brand-gold-soft"
            >
              Join
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
