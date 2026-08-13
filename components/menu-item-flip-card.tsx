"use client";

import { useState } from "react";
import Image from "next/image";
import { FlipCard } from "@/components/animata/card/flip-card";

type MenuItem = {
  id: string;
  name: string;
  name_ar?: string | null;
  description?: string | null;
  description_ar?: string | null;
  price: number;
  image_url?: string | null;
};

export default function MenuItemFlipCard({ item }: { item: MenuItem }) {
  const [flipped, setFlipped] = useState(false);
  const hasDescription = Boolean(item.description || item.description_ar);

  return (
    <FlipCard
      flipped={flipped}
      className="
        h-[22rem] w-[17rem]
        min-h-[22rem] min-w-[17rem]
        max-h-[22rem] max-w-[17rem]
        shrink-0
      "
    >
      <FlipCard.Front className="overflow-hidden rounded-md bg-cream shadow-sm">
        <div className="flex h-full flex-col">
          {item.image_url ? (
            <figure className="relative h-[58%] w-full shrink-0 bg-white">
              <Image
                src={item.image_url}
                alt={item.name}
                fill
                className="object-contain p-3"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </figure>
          ) : (
            <figure className="relative h-[48%] w-full shrink-0 bg-cream-deep" />
          )}

          <div className="relative flex flex-1 flex-col p-3">
            {item.name_ar && (
              <div dir="rtl" className="absolute right-5 top-2 font-arabic text-right text-2xl text-ink">
                {item.name_ar}
              </div>
            )}
            <h2 className="mt-9 text-lg font-medium text-ink">{item.name}</h2>
            <div className="mt-auto font-display text-2xl text-ink">{item.price} SAR</div>

            {hasDescription && (
              <div className="card-actions mt-auto justify-end">
                <button
                  type="button"
                  onClick={() => setFlipped(true)}
                  className="text-base text-ink/60 underline-offset-2 transition-colors hover:text-ink hover:underline"
                >
                  Description
                </button>
              </div>
            )}
          </div>
        </div>
      </FlipCard.Front>

      <FlipCard.Back className="overflow-hidden rounded-md bg-cream shadow-sm">
        {item.image_url && (
          <>
            <Image
              src={item.image_url}
              alt=""
              fill
              className="object-cover opacity-25"
              sizes="(max-width: 768px) 100vw, 50vw"
              aria-hidden
            />
            <div className="absolute inset-0 bg-cream/75" />
          </>
        )}

        <div className="relative flex h-full flex-col p-5">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-medium text-ink">{item.name}</h2>
            {item.name_ar && (
              <div dir="rtl" className="shrink-0 font-arabic text-right text-2xl text-ink">
                {item.name_ar}
              </div>
            )}
          </div>

          <div className="mt-6 flex items-end justify-between gap-3">
            {item.description ? (
              <p className="max-w-[48%] text-base text-ink/70">{item.description}</p>
            ) : (
              <span />
            )}
            {item.description_ar ? (
              <p dir="rtl" className="max-w-[48%] font-arabic text-right text-base text-ink/70">
                {item.description_ar}
              </p>
            ) : (
              <span />
            )}
          </div>

          <div className="card-actions mt-auto justify-end">
            <button
              type="button"
              onClick={() => setFlipped(false)}
              className="text-base text-ink/60 underline-offset-2 transition-colors hover:text-ink hover:underline"
            >
              Back
            </button>
          </div>
        </div>
      </FlipCard.Back>
    </FlipCard>
  );
}
