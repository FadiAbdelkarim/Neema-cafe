'use client'

import { useState } from 'react'
import { updateCategory, deleteCategory } from '@/app/admin/(dashboard)/categories/actions'

type Category = {
  id: string
  name: string
  name_ar: string | null
}

export default function CategoryRow({ category }: { category: Category }) {
  const [editing, setEditing] = useState(false)

  if (editing) {
    return (
      <form
        action={async (formData) => {
          await updateCategory(category.id, formData)
          setEditing(false)
        }}
        className="flex items-center gap-3 px-6 py-4"
      >
        <input
          name="name"
          defaultValue={category.name}
          required
          className="border border-ink/15 rounded-sm px-3 py-1.5 flex-1"
        />
        <input
          name="name_ar"
          dir="rtl"
          defaultValue={category.name_ar ?? ''}
          className="border border-ink/15 rounded-sm px-3 py-1.5 flex-1 font-arabic"
        />
        <button type="submit" className="text-green-mid text-sm hover:underline">
          Save
        </button>
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="text-ink/50 text-sm hover:underline"
        >
          Cancel
        </button>
      </form>
    )
  }

  return (
    <div className="flex items-center justify-between px-6 py-4">
      <div>
        <span className="text-ink">{category.name}</span>
        {category.name_ar && (
          <span dir="rtl" className="font-arabic text-ink/60 ml-3">{category.name_ar}</span>
        )}
      </div>
      <div className="flex items-center gap-4">
        <button onClick={() => setEditing(true)} className="text-green-mid text-sm hover:underline">
          Edit
        </button>
        <form action={deleteCategory.bind(null, category.id)}>
          <button type="submit" className="text-terracotta text-sm hover:underline">
            Delete
          </button>
        </form>
      </div>
    </div>
  )
}
