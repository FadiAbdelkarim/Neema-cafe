export default function Hero() {
    return (
      <header className="relative h-screen min-h-[640px] flex items-center justify-center text-center overflow-hidden bg-green-deeper">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{
            backgroundImage: "url('/images/tree.jpg')",
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
  
        <div className="relative z-10 text-gold px-5">
        <img
        src="/logo/neema_logo_white.svg"
        alt="Neema Cafe"
        className="w-[clamp(220px,28vw,340px)] mx-auto"
        />
          <div className="mt-8 flex flex-col items-center gap-1">
            <div className="font-arabic text-2xl">مذاق يَنبُت من الجذور</div>
            <div className="font-display italic text-sm text-gold/75">
              A taste that grows from the roots
            </div>
          </div>
        </div>
      </header>
    );
  }