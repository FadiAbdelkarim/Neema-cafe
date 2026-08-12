import Image from "next/image";
import PatternDivider from "@/components/pattern-divider";


const items = [
  {
    src: "/images/storefront.jpg",
    alt: "Neema Cafe storefront in deep olive green with gold lettering",
    ar: "الواجهة، أخضر نيمة",
    en: "The storefront, Neema green",
    span: "row-span-2",
    ratio: "aspect-[4/5.1]",
  },
  {
    src: "/images/mug.jpg",
    alt: "Neema Cafe branded ceramic mug in olive green with gold Arabic logotype",
    ar: "أواني البيت",
    en: "House ceramics",
    span: "",
    ratio: "aspect-[16/10]",
  },
  {
    src: "/images/card.jpg",
    alt: "Neema Cafe coffee cup with a branded card resting against it",
    ar: "ركن هادئ، أول رشفة",
    en: "A quiet corner, first pour",
    span: "",
    ratio: "aspect-[16/10]",
  },
];
<PatternDivider />
export default function Gallery() {
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

        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item) => (
            <figure
              key={item.src}
              className={`relative overflow-hidden rounded ${item.span} ${item.ratio}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
              />
              <figcaption
                className="absolute left-0 right-0 bottom-0 px-6 py-5 text-right"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,22,10,0.8), transparent)",
                }}
                dir="rtl"
              >
                <div className="font-arabic text-white text-sm">{item.ar}</div>
                <div
                  className="font-display text-[10px] tracking-wider uppercase text-white/60 mt-1 text-left"
                  dir="ltr"
                >
                  {item.en}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}