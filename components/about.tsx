import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-cream py-24 px-6 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs tracking-[0.22em] uppercase text-green-mid font-medium">
            Our Story
          </div>

          <h2 dir="rtl" className="font-arabic text-right text-4xl md:text-5xl text-ink mt-2 mb-1">
            الرؤية والرسالة
          </h2>
          <h3 className="font-display text-lg text-ink/60 italic mb-6">
            Vision &amp; Message
          </h3>

          <p dir="rtl" className="font-arabic text-right text-ink/85 leading-loose text-lg mb-5">
            &quot;نيمه&quot; هو مساحة أنيقة ومألوفة مستوحاة من شجرة النيم وظلها، حيث يلتقي الناس ليجدوا الراحة والتواصل بعد إيقاع الحياة السريع. نُقدِّم تجربة مقهى راقية تمزج بين الأصالة والدفء، من خلال مشروبات عالية الجودة وأجواء مستلهمة من الطبيعة والثقافة السودانية. نطمح أن يكون &quot;نيمه&quot; محطة يومية للناس، مكانًا يعكس البساطة الراقية ويمنح لحظات صفاء حقيقية، وكأنك قاعد تحت شجرة نيم وسط صحبة محبة.
          </p>

          <p className="text-ink/65 leading-relaxed text-sm border-t border-ink/10 pt-4">
            Neema is an elegant, familiar space inspired by the neem tree and its shade — where people come to find comfort and connection after the fast pace of life. We offer a refined café experience that blends authenticity with warmth, through high-quality drinks and an atmosphere inspired by nature and Sudanese culture. We aspire for Neema to be part of people&apos;s daily rhythm — a place that reflects understated elegance and offers moments of real serenity, like sitting under a neem tree among beloved company.
          </p>
        </div>

        <div className="relative aspect-[4/5] rounded overflow-hidden">
          <Image
            src="/images/tree.jpg"
            alt="A neem tree growing against a weathered green courtyard wall"
            fill
            className="object-cover"
          />
        <div className="absolute left-8 bottom-8 bg-green-deep text-gold px-4 py-2.5 rounded-sm text-right" dir="rtl">
            <div className="font-arabic text-base leading-none">
                الشجرة التي منحتنا اسمنا
            </div>
            <div className="font-display text-[10px] tracking-wider uppercase text-gold/70 mt-1 text-left" dir="ltr">
                The tree that gave us our name
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}