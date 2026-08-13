'use client'

import { useState } from 'react'
import { updateMenuItem, toggleAvailability, deleteMenuItem } from '@/app/admin/(dashboard)/menu-items/actions'

type Category = {
  id: string
  name: string
}

type MenuItem = {
  id: string
  name: string
  name_ar: string | null
  description: string | null
  description_ar: string | null
  price: number
  category_id: string | null
  image_url: string | null
  is_available: boolean
  categories: { name: string } | null
}

export default function MenuItemRow({
  item,
  categories,
}: {
  item: MenuItem
  categories: Category[]
}) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateMenuItem(item.id, formData)
          setEditing(false)
        }}
        className="grid grid-cols-2 gap-4 px-6 py-6 bg-cream/40"
      >
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Name (English)</label>
          <input name="name" defaultValue={item.name} required className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Name (Arabic)</label>
          <input name="name_ar" dir="rtl" defaultValue={item.name_ar ?? ''} className="w-full border border-ink/15 rounded-sm px-3 py-2 font-arabic" />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Description (English)</label>
          <textarea name="description" rows={2} defaultValue={item.description ?? ''} className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Description (Arabic)</label>
          <textarea name="description_ar" dir="rtl" rows={2} defaultValue={item.description_ar ?? ''} className="w-full border border-ink/15 rounded-sm px-3 py-2 font-arabic" />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Price (SAR)</label>
          <input name="price" type="number" step="0.01" defaultValue={item.price} required className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Category</label>
          <select name="category_id" defaultValue={item.category_id ?? ''} className="w-full border border-ink/15 rounded-sm px-3 py-2">
            <option value="">— None —</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">
            Replace Image (optional — leave blank to keep current)
          </label>
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="w-full border border-ink/15 rounded-sm px-3 py-2 bg-white" />
        </div>

        <div className="col-span-2 flex gap-4">
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
    <div className="flex items-center justify-between px-6 py-4 gap-4">
      <div className="flex items-center gap-4 flex-1">
        {item.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.image_url} alt={item.name} className="w-14 h-14 object-cover rounded-sm" />
        )}
        <div>
          <div className="flex items-center gap-2">
            <span className="text-ink font-medium">{item.name}</span>
            {item.name_ar && <span dir="rtl" className="font-arabic text-ink/60">{item.name_ar}</span>}
            {!item.is_available && (
              <span className="text-[10px] uppercase tracking-wider bg-terracotta/15 text-terracotta px-2 py-0.5 rounded-sm">Sold out</span>
            )}
          </div>
          <div className="text-ink/50 text-sm">
            {item.categories?.name ?? 'Uncategorized'} · {item.price} SAR
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button onClick={() => setEditing(true)} className="text-green-mid text-sm hover:underline">
          Edit
        </button>
        <form action={toggleAvailability.bind(null, item.id, item.is_available)}>
          <button type="submit" className="text-sm text-green-mid hover:underline">
            {item.is_available ? 'Mark sold out' : 'Mark available'}
          </button>
        </form>
        <form action={deleteMenuItem.bind(null, item.id)}>
          <button type="submit" className="text-terracotta text-sm hover:underline">
            Delete
          </button>
        </form>
      </div>
    </div>
  )
}
