import { createClient } from '@/lib/supabase/server'
import { addEvent, deleteEvent } from './actions'

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase
    .from('events')
    .select('*')
    .order('event_date', { ascending: true })

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-6">Events</h1>

      <form action={addEvent} className="bg-white border border-ink/10 rounded-sm p-6 mb-8 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Title (English)</label>
          <input name="title" required className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Title (Arabic)</label>
          <input name="title_ar" dir="rtl" className="w-full border border-ink/15 rounded-sm px-3 py-2 font-arabic" />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Description (English)</label>
          <textarea name="description" rows={2} className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Description (Arabic)</label>
          <textarea name="description_ar" dir="rtl" rows={2} className="w-full border border-ink/15 rounded-sm px-3 py-2 font-arabic" />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Date</label>
          <input name="event_date" type="date" required className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Time (optional)</label>
          <input name="event_time" type="time" className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>

        <div className="col-span-2">
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Image</label>
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="w-full border border-ink/15 rounded-sm px-3 py-2 bg-white" />
        </div>

        <div className="col-span-2">
          <button type="submit" className="bg-green-deep text-gold px-5 py-2 rounded-sm text-sm uppercase tracking-wider">
            Add Event
          </button>
        </div>
      </form>

      <div className="bg-white border border-ink/10 rounded-sm divide-y divide-ink/10">
        {events?.length === 0 && (
          <p className="p-6 text-ink/50 text-sm">No events yet — add one above.</p>
        )}
        {events?.map((event) => (
          <div key={event.id} className="flex items-center justify-between px-6 py-4 gap-4">
            <div className="flex items-center gap-4 flex-1">
            {event.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={event.image_url} alt={event.title} className="w-14 h-14 object-cover rounded-sm" />
              )}
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-ink font-medium">{event.title}</span>
                  {event.title_ar && <span dir="rtl" className="font-arabic text-ink/60">{event.title_ar}</span>}
                </div>
                <div className="text-ink/50 text-sm">
                  {event.event_date}{event.event_time ? ` · ${event.event_time}` : ''}
                </div>
              </div>
            </div>
            <form action={deleteEvent.bind(null, event.id)}>
              <button type="submit" className="text-terracotta text-sm hover:underline">
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  )
}
