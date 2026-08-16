'use client'

import { useState } from 'react'
import { updateEvent, deleteEvent } from '@/app/admin/(dashboard)/events/actions'

type Event = {
  id: string
  title: string
  title_ar: string | null
  description: string | null
  description_ar: string | null
  event_date: string
  event_time: string | null
  image_url: string | null
}

export default function EventRow({ event }: { event: Event }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateEvent(event.id, formData)
          setEditing(false)
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 sm:px-6 py-6 bg-cream/40"
      >
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Title (English)</label>
          <input name="title" defaultValue={event.title} required className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Title (Arabic)</label>
          <input name="title_ar" dir="rtl" defaultValue={event.title_ar ?? ''} className="w-full border border-ink/15 rounded-sm px-3 py-2 font-arabic" />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Description (English)</label>
          <textarea name="description" rows={2} defaultValue={event.description ?? ''} className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Description (Arabic)</label>
          <textarea name="description_ar" dir="rtl" rows={2} defaultValue={event.description_ar ?? ''} className="w-full border border-ink/15 rounded-sm px-3 py-2 font-arabic" />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Date</label>
          <input name="event_date" type="date" defaultValue={event.event_date} required className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Time (optional)</label>
          <input name="event_time" type="time" defaultValue={event.event_time ?? ''} className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">
            Replace Image (optional — leave blank to keep current)
          </label>
          <input
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="w-full border border-ink/15 rounded-sm px-3 py-2 bg-white"
          />
        </div>

        <div className="md:col-span-2 flex gap-4">
          <button type="submit" className="bg-green-deep text-gold px-5 py-2 rounded-sm text-sm uppercase tracking-wider">
            Save
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="text-ink/50 text-sm hover:underline"
          >
            Cancel
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="px-4 sm:px-6 py-6">
      <div className="flex items-center gap-4 mb-4">
        {event.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.image_url} alt={event.title} className="w-20 h-20 shrink-0 object-cover rounded-sm" />
        )}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-ink font-medium text-lg">{event.title}</span>
            {event.title_ar && (
              <span dir="rtl" className="font-arabic text-ink/60 text-lg">{event.title_ar}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ink/10">
        <div className="text-ink/50 text-sm">
          {event.event_date}{event.event_time ? ` · ${event.event_time}` : ''}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setEditing(true)} className="text-green-mid text-sm hover:underline">
            Edit
          </button>
          <form action={deleteEvent.bind(null, event.id)}>
            <button type="submit" className="text-terracotta text-sm hover:underline">
              Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
