"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/format";

export default function BuyTicketsForm({
  eventId,
  eventTitle,
  ticketDefinitionId,
  eventPageUrl,
  ticketPrice,
  ticketCurrency,
}: {
  eventId: string;
  eventTitle: string;
  ticketDefinitionId: string;
  eventPageUrl: string;
  ticketPrice: number;
  ticketCurrency: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId, ticketDefinitionId, eventPageUrl, quantity }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        }
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
      <div className="flex flex-col items-center gap-3 bg-brand-clay-soft p-8 text-center">
        <CheckCircle2 className="h-10 w-10 text-brand-clay-dark" strokeWidth={1.5} />
        <h3 className="font-serif-display text-xl font-semibold text-brand-ink">
          You&apos;re booked!
        </h3>
        <p className="text-sm text-brand-ink-soft">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-baseline justify-between border-b border-brand-line pb-4">
        <span className="text-xs uppercase tracking-wide text-brand-ink-soft">General Admission</span>
        <span className="font-serif-display text-2xl font-semibold text-brand-ink">
          {formatPrice(ticketPrice, ticketCurrency)}
        </span>
      </div>

      <div>
        <label htmlFor="quantity" className="text-xs font-medium text-brand-ink-soft">
          Number of tickets
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 w-full border border-brand-line bg-brand-ivory px-4 py-2.5 text-sm focus:outline-none focus:border-brand-ink"
        >
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {status === "error" && (
        <p className="text-sm text-brand-clay-dark" role="alert">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex w-full items-center justify-center gap-2 bg-brand-ink px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-brand-ivory transition-colors hover:bg-brand-clay disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Starting checkout…
          </>
        ) : (
          `Buy tickets for ${eventTitle} — ${formatPrice(ticketPrice * quantity, ticketCurrency)}`
        )}
      </button>
    </form>
  );
}
