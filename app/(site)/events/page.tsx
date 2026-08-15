import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import PatternDivider from "@/components/pattern-divider";

export default async function EventsPage() {
  const supabase = await createClient();
  const today = new Date().toISOString().split("T")[0];

  const { data: upcoming } = await supabase
    .from("events")
    .select("*")
    .gte("event_date", today)
    .order("event_date", { ascending: true });

  const { data: past } = await supabase
    .from("events")
    .select("*")
    .lt("event_date", today)
    .order("event_date", { ascending: false });

  return (
    <main className="min-h-screen">
      <div className="relative h-[420px] flex items-center justify-center text-center overflow-hidden mb-4">
        <div
          className="absolute inset-0 bg-cover scale-110"
          style={{
            backgroundImage: "url('/images/storefront.jpg')",
            backgroundPosition: "center 35%",
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
            Under the Shade
          </div>
          <img
            src="/logo/neema_logo_white.svg"
            alt="Neema Cafe"
            className="w-[clamp(160px,20vw,220px)] mx-auto"
          />
          <div className="font-display text-2xl md:text-3xl text-gold/70 italic mt-4">Events</div>
        </div>
      </div>

      <PatternDivider />

      <section className="bg-cream py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 dir="rtl" className="font-arabic text-right text-3xl text-ink mb-1">
            الفعاليات القادمة
          </h2>
          <h3 className="font-display text-ink/50 italic mb-10">Upcoming</h3>

          {(!upcoming || upcoming.length === 0) && (
            <div className="text-center py-6">
              <p dir="rtl" className="font-arabic text-ink/60 text-lg mb-1">لا توجد فعاليات قادمة حالياً — تابعونا قريباً.</p>
              <p className="text-ink/40 text-sm">Nothing on the calendar yet — check back soon.</p>
            </div>
          )}

          <div className="space-y-6">
            {upcoming?.map((event) => (
              <div key={event.id} className="bg-cream-deep rounded-md p-6 flex gap-5 items-start">
                {event.image_url && (
                  <div className="relative w-44 h-44 shrink-0 rounded-md overflow-hidden">
                    <Image src={event.image_url} alt={event.title} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1" style={{ maxWidth: "36rem" }}>
                  <div className="text-terracotta text-sm font-medium mb-1">
                    {new Date(event.event_date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                    {event.event_time ? ` · ${event.event_time}` : ""}
                  </div>
                  {event.title_ar && (
                    <div dir="rtl" className="font-arabic text-right text-xl text-ink mb-1">
                      {event.title_ar}
                    </div>
                  )}
                  <div className="text-ink font-medium mb-2">{event.title}</div>
                  {event.description_ar && (
                    <p dir="rtl" className="font-arabic text-right text-ink/65 text-sm mb-1">
                      {event.description_ar}
                    </p>
                  )}
                  {event.description && (
                    <p className="text-ink/50 text-sm">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {past && past.length > 0 && (
        <>
          <PatternDivider />
          <section className="bg-cream-deep py-16 px-6 md:px-16">
            <div className="max-w-4xl mx-auto">
              <h2 dir="rtl" className="font-arabic text-right text-2xl text-ink/70 mb-1">
                فعاليات سابقة
              </h2>
              <h3 className="font-display text-ink/40 italic mb-8 text-sm">Past Events</h3>

              <div className="space-y-3">
                {past.map((event) => (
                  <div key={event.id} className="flex items-baseline justify-between border-b border-ink/10 pb-3 opacity-70">
                    <div>
                      <span className="text-ink text-sm">{event.title}</span>
                      {event.title_ar && (
                        <span dir="rtl" className="font-arabic text-ink/60 text-sm ml-3">{event.title_ar}</span>
                      )}
                    </div>
                    <span className="text-ink/40 text-xs whitespace-nowrap">
                      {new Date(event.event_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
