export default function MenuLoading() {
  return (
    <main className="min-h-screen pb-24 animate-pulse">
      <div className="relative h-[60vh] min-h-[420px] bg-green-deeper/40" />

      <div className="bg-cream py-12 px-6 md:px-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-full bg-ink/10" />
          ))}
        </div>
      </div>

      <div className="bg-cream-deep py-14 px-6 md:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-40 rounded bg-ink/10 mb-2 ml-auto" />
            <div className="h-5 w-28 rounded bg-ink/10" />
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(17rem,1fr))] gap-6 justify-items-center">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-[22rem] w-[17rem] rounded-md bg-white shadow-sm overflow-hidden">
                <div className="h-[58%] w-full bg-ink/10" />
                <div className="p-3 space-y-3">
                  <div className="h-4 w-2/3 rounded bg-ink/10" />
                  <div className="h-5 w-1/3 rounded bg-ink/10" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
