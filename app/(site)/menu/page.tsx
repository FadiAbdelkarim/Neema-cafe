import { createClient } from "@/lib/supabase/server";
import PatternDivider from "@/components/pattern-divider";
import MenuItemFlipCard from "@/components/menu-item-flip-card";

export default async function MenuPage() {
  const supabase = await createClient();

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");

  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .eq("is_available", true)
    .order("sort_order");

  const grouped = (categories ?? []).map((cat) => ({
    category: cat,
    items: (items ?? []).filter((item) => item.category_id === cat.id),
  })).filter((group) => group.items.length > 0);

  const uncategorized = (items ?? []).filter((item) => !item.category_id);

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

      {grouped.length > 0 && (
        <div className="bg-cream py-12 px-6 md:px-16">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
            {grouped.map((group) => (
              <a
                key={group.category.id}
                href={`#category-${group.category.id}`}
                className="rounded-full py-5 text-center font-display text-lg tracking-wide transition-colors bg-green-deep/90 text-gold/80 hover:bg-green-deep hover:text-gold"
              >
                {group.category.name}
              </a>
            ))}
          </div>
        </div>
      )}

      <PatternDivider />

      {grouped.length === 0 && uncategorized.length === 0 && (
        <div className="bg-cream-deep py-24 px-6 text-center">
          <p className="text-ink/50">No items on the menu yet — check back soon.</p>
        </div>
      )}

      {grouped.map((group, index) => (
        <div key={group.category.id}>
          {index > 0 && <PatternDivider />}
          <section id={`category-${group.category.id}`} className="scroll-mt-24 bg-cream-deep py-14 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                {group.category.name_ar && (
                  <h2 dir="rtl" className="font-arabic text-right text-3xl text-ink mb-1">
                    {group.category.name_ar}
                  </h2>
                )}
                <h3 className="font-display text-2xl text-ink/70 italic">{group.category.name}</h3>
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-6 justify-items-center">
                {group.items.map((item) => (
                  <MenuItemFlipCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        </div>
      ))}

      {uncategorized.length > 0 && (
        <div>
          {grouped.length > 0 && <PatternDivider />}
          <section className="bg-cream-deep py-14 px-6 md:px-16">
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h3 className="font-display text-2xl text-ink/70 italic">Other</h3>
              </div>

              <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-6 justify-items-center">
                {uncategorized.map((item) => (
                  <MenuItemFlipCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
