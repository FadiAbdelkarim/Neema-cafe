export default function EventsLoading() {
  return (
    <main className="min-h-screen animate-pulse">
      <div className="relative h-[420px] bg-green-deeper/40 mb-4" />

      <section className="bg-cream py-16 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <div className="h-8 w-48 rounded bg-ink/10 mb-2 ml-auto" />
          <div className="h-5 w-24 rounded bg-ink/10 mb-10" />

          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-cream-deep rounded-md p-6 flex gap-5 items-start">
                <div className="w-44 h-44 shrink-0 rounded-md bg-ink/10" />
                <div className="flex-1 space-y-3" style={{ maxWidth: "36rem" }}>
                  <div className="h-4 w-32 rounded bg-ink/10" />
                  <div className="h-5 w-2/3 rounded bg-ink/10" />
                  <div className="h-4 w-full rounded bg-ink/10" />
                  <div className="h-4 w-4/5 rounded bg-ink/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
