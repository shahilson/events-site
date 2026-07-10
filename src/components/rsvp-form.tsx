"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export default function RsvpForm({
  eventId,
  eventTitle,
}: {
  eventId: string;
  eventTitle: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    guestCount: 1,
    notes: "",
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, ...form }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-brand-blush-100 p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-brand-plum-600" strokeWidth={1.5} />
        <h3 className="font-serif-display text-xl font-semibold text-brand-plum-900">
          You&apos;re RSVP&apos;d!
        </h3>
        <p className="text-sm text-brand-ink-soft">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="firstName" className="text-xs font-medium text-brand-ink-soft">
            First name
          </label>
          <input
            id="firstName"
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="mt-1 w-full rounded-xl border border-brand-blush-200 bg-brand-ivory px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-rose-400"
          />
        </div>
        <div>
          <label htmlFor="lastName" className="text-xs font-medium text-brand-ink-soft">
            Last name
          </label>
          <input
            id="lastName"
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="mt-1 w-full rounded-xl border border-brand-blush-200 bg-brand-ivory px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-rose-400"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="text-xs font-medium text-brand-ink-soft">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="mt-1 w-full rounded-xl border border-brand-blush-200 bg-brand-ivory px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-rose-400"
        />
      </div>

      <div>
        <label htmlFor="guestCount" className="text-xs font-medium text-brand-ink-soft">
          Number of guests (including you)
        </label>
        <select
          id="guestCount"
          value={form.guestCount}
          onChange={(e) => setForm({ ...form, guestCount: Number(e.target.value) })}
          className="mt-1 w-full rounded-xl border border-brand-blush-200 bg-brand-ivory px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-rose-400"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="notes" className="text-xs font-medium text-brand-ink-soft">
          Anything we should know? (optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="mt-1 w-full rounded-xl border border-brand-blush-200 bg-brand-ivory px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-rose-400"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-brand-plum-700" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-plum-600 px-6 py-3.5 text-sm font-semibold text-brand-ivory transition-colors hover:bg-brand-plum-700 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting RSVP…
          </>
        ) : (
          `RSVP for ${eventTitle}`
        )}
      </button>
    </form>
  );
}
