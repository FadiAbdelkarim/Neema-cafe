import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PatternDivider from "@/components/pattern-divider";
import MenuItemFlipCard from "@/components/menu-item-flip-card";

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: activeCategory } = await searchParams;
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  let query = supabase.from("menu_items").select("*").eq("is_available", true).order("sort_order");
  if (activeCategory) {
    query = query.eq("category_id", activeCategory);
  }
  const { data: items } = await query;

  return (
    <main className="min-h-screen pb-24">
      <div className="relative h-[60vh] min-h-[420px] flex items-center justify-center text-center overflow-hidden mb-4">
        <div
          className="absolute inset-0 bg-cover scale-110"
          style={{
            backgroundImage: "url('/images/mug.jpg')",
            backgroundPosition: "center 40%",
            filter: "saturate(0.75) brightness(0.55)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(44,51,28,0.55) 0%, rgba(44,51,28,0.35) 40%, rgba(30,35,19,0.88) 100%)",
          }}
        />
        <div className="relative z-10 px-6">
          <div className="text-xs tracking-[0.22em] uppercase text-terracotta font-medium mb-4">
            What Grows Here
          </div>
          <img
            src="/logo/neema_logo_white.svg"
            alt="Neema Cafe"
            className="w-[clamp(160px,20vw,220px)] mx-auto"
          />
          
          <div className="font-display text-2xl md:text-3xl text-gold/70 italic mt-4">Menu</div>
        </div>
      </div>

      {/* Category filter buttons */}
      <div className="bg-cream py-12 px-6 md:px-16">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
          <Link
            href="/menu"
            className={`rounded-full py-5 text-center font-display text-lg tracking-wide transition-colors ${
              !activeCategory ? "bg-green-deep text-gold" : "bg-green-deep/90 text-gold/80 hover:bg-green-deep"
            }`}
          >
            All
          </Link>
          {categories?.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className={`rounded-full py-5 text-center font-display text-lg tracking-wide transition-colors ${
                activeCategory === cat.id ? "bg-green-deep text-gold" : "bg-green-deep/90 text-gold/80 hover:bg-green-deep"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
      <PatternDivider />

      {/* Item cards */}
      <div className="bg-cream-deep py-14 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {items?.map((item) => (
            <MenuItemFlipCard key={item.id} item={item} />
          ))}

          {(!items || items.length === 0) && (
            <p className="text-ink/50 col-span-2 text-center py-10">
              No items in this category yet.
            </p>
          )}
        </div>
      </div>
      
    </main>
    
  );
}
