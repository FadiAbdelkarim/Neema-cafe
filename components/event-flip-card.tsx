"use client";

import { useState } from "react";
import Image from "next/image";
import { FlipCard } from "@/components/animata/card/flip-card";

type EventItem = {
  id: string;
  title: string;
  title_ar?: string | null;
  description?: string | null;
  description_ar?: string | null;
  event_date: string;
  event_time?: string | null;
  image_url?: string | null;
};

function formatTime(time?: string | null) {
  if (!time) return "";
  return time.slice(0, 5);
}

export default function EventFlipCard({ event }: { event: EventItem }) {
  const [flipped, setFlipped] = useState(false);
  const hasDescription = Boolean(event.description || event.description_ar);

  const dateLabel = new Date(event.event_date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <FlipCard flipped={flipped} className="relative w-full aspect-[4/5]">
      <FlipCard.Front className="overflow-hidden rounded-md bg-cream shadow-sm">
        {event.image_url ? (
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 bg-cream-deep" />
        )}

        <div
          className="absolute inset-x-0 bottom-0 p-4"
          style={{
            background:
              "linear-gradient(180deg, rgba(30,35,19,0) 0%, rgba(30,35,19,0.55) 45%, rgba(30,35,19,0.9) 100%)",
          }}
        >
          {event.title_ar && (
            <div dir="rtl" className="font-arabic text-right text-lg text-white">
              {event.title_ar}
            </div>
          )}
          <h2 className="text-base font-medium text-white">{event.title}</h2>

          <div className="mt-1 text-gold text-sm font-medium">
            {dateLabel}
            {event.event_time ? ` · ${formatTime(event.event_time)}` : ""}
          </div>

          {hasDescription && (
            <div className="card-actions mt-2 justify-end">
              <button
                type="button"
                onClick={() => setFlipped(true)}
                className="text-sm text-white/80 underline-offset-2 transition-colors hover:text-white hover:underline"
              >
                Description
              </button>
            </div>
          )}
        </div>
      </FlipCard.Front>

      <FlipCard.Back className="overflow-hidden rounded-md bg-cream shadow-sm">
        {event.image_url && (
          <>
            <Image
              src={event.image_url}
              alt=""
              fill
              className="object-cover opacity-25"
              sizes="(max-width: 768px) 100vw, 50vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-cream/80" />
          </>
        )}

        <div className="relative flex h-full flex-col p-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-base font-medium text-ink">{event.title}</h2>
            {event.title_ar && (
              <div dir="rtl" className="shrink-0 font-arabic text-right text-lg text-ink">
                {event.title_ar}
              </div>
            )}
          </div>

          <div className="mt-4 flex-1 overflow-y-auto space-y-3">
            {event.description && (
              <p className="text-sm text-ink/70">{event.description}</p>
            )}
            {event.description_ar && (
              <p dir="rtl" className="font-arabic text-right text-sm text-ink/70">
                {event.description_ar}
              </p>
            )}
          </div>

          <div className="card-actions mt-2 justify-end">
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="text-sm text-ink/60 underline-offset-2 transition-colors hover:text-ink hover:underline"
            >
              Back
            </button>
          </div>
        </div>
      </FlipCard.Back>
    </FlipCard>
  );
}
