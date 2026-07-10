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
    <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-10">
      <div className="bg-brand-periwinkle px-8 py-14 text-center sm:px-16">
        <h2 className="text-balance font-extralight leading-[1.02] tracking-tight text-brand-ivory text-4xl sm:text-5xl">
          Never miss a gathering
        </h2>
        <p className="mx-auto mt-4 max-w-md text-balance text-brand-ivory/80">
          Get new events delivered to your inbox weekly. Free to join, easy to
          leave, always worth opening.
        </p>

        {status === "submitted" ? (
          <p className="mt-8 text-sm font-medium text-brand-butter">
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
              className="w-full border border-brand-ivory/30 bg-transparent px-5 py-3 text-sm text-brand-ivory placeholder:text-brand-ivory/60 focus:outline-none focus:ring-1 focus:ring-brand-ivory"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-brand-butter px-6 py-3 text-sm font-bold uppercase tracking-wide text-brand-ink transition-colors hover:bg-brand-ivory"
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
