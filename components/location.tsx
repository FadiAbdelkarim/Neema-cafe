import { createClient } from "@/lib/supabase/server";

export default async function LocationSection() {
  const supabase = await createClient();
  const { data: location } = await supabase.from("location").select("*").single();

  return (
    <section id="location" className="bg-cream py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        {/* Left: heading, address, directions button */}
        <div>
          <div className="text-xs tracking-[0.22em] uppercase text-green-mid font-medium">
            Visit
          </div>
          <h2 dir="rtl" className="font-arabic text-right text-4xl md:text-5xl text-ink mt-2 mb-1">
            تعال اجلس قليلاً
          </h2>
          <h3 className="font-display text-lg text-ink/50 italic mb-8">
            Come Sit a While
          </h3>

          <h4 dir="rtl" className="font-arabic text-right text-green-deep text-xl mb-1">
            العنوان
          </h4>
          <h5 className="font-display text-xs tracking-widest uppercase text-ink/40 mb-3">
            Address
          </h5>
          <p dir="rtl" className="font-arabic text-right text-ink/85 text-lg mb-1">
            {location?.address_ar ?? "—"}
          </p>
          <p className="text-ink/55 text-sm mb-8">
            {location?.address ?? "Address coming soon"}
          </p>

          {location?.maps_url && (
            <a href={location.maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-1 bg-green-deep hover:bg-green-deeper transition-colors text-gold px-8 py-4 rounded-sm text-center"
            >
              <span dir="rtl" className="font-arabic text-lg">
                احصل على الاتجاهات
              </span>
              <span className="font-display text-[10px] tracking-widest uppercase text-gold/70">
                Get Directions
              </span>
            </a>
          )}
        </div>

        {/* Right: hours panel */}
        <div>
          <h4 dir="rtl" className="font-arabic text-right text-green-deep text-xl mb-1">
            ساعات العمل
          </h4>
          <h5 className="font-display text-xs tracking-widest uppercase text-ink/40 mb-5">
            Hours
          </h5>

          <div dir="rtl" className="flex justify-between items-center py-3 border-b border-ink/10">
            <span className="font-arabic text-ink/85 text-lg">
              {location?.hours_ar ?? "—"}
            </span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-ink/10">
            <span className="text-ink/60 text-sm">
              {location?.hours ?? "Hours coming soon"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}