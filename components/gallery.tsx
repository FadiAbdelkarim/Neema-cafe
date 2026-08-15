"use client";

import { useRef, useState } from "react";

const photos = [
  "/images/gallery/interior-1.jpg",
  "/images/gallery/interior-2.jpg",
  "/images/gallery/interior-3.jpg",
  "/images/gallery/interior-4.jpg",
  "/images/gallery/interior-5.jpg",
];

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const figureRef = useRef<HTMLElement>(null);

  function updateActiveFromClientX(clientX: number) {
    const el = figureRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relativeX = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    const index = Math.min(
      photos.length - 1,
      Math.floor((relativeX / rect.width) * photos.length)
    );
    setActiveIndex(index);
  }

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    updateActiveFromClientX(e.clientX);
  }

  function handleTouchMove(e: React.TouchEvent<HTMLElement>) {
    if (e.touches.length > 0) {
      updateActiveFromClientX(e.touches[0].clientX);
    }
  }

  return (
    <section id="gallery" className="bg-green-deeper py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-xs tracking-[0.22em] uppercase text-terracotta font-medium">
          Moments
        </div>

        <h2 dir="rtl" className="font-arabic text-right text-4xl md:text-5xl text-white mt-2 mb-1">
          تحت الظل
        </h2>
        <h3 className="font-display text-lg text-gold/60 italic mb-4">
          Under the Shade
        </h3>

        <p dir="rtl" className="font-arabic text-right text-gold/75 text-lg leading-relaxed mb-1 max-w-xl ml-auto">
          لمحات من المكان، الطاولة، والتفاصيل التي لم نستعجل فيها.
        </p>
        <p className="text-gold/50 text-sm mb-14 max-w-xl">
          Glimpses of the room, the counter, and the details we didn&apos;t rush.
        </p>

        <figure
          ref={figureRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setActiveIndex(0)}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
          className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-md shadow-lg touch-none select-none"
        >
          {photos.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={src}
              src={src}
              alt="A moment inside Neema Cafe"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-200"
              style={{ opacity: i === activeIndex ? 1 : 0 }}
            />
          ))}

          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 px-6 py-5 text-right"
            style={{ background: "linear-gradient(to top, rgba(20,22,10,0.75), transparent)" }}
            dir="rtl"
          >
            <div className="font-arabic text-white text-sm">حرّك إصبعك لترى المزيد</div>
            <div className="font-display text-[10px] tracking-wider uppercase text-white/60 mt-1 text-left" dir="ltr">
              Swipe or move your cursor to see more
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
}
