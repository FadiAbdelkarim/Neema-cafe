import { createClient } from '@/lib/supabase/server'
import { addCategory, deleteCategory } from './actions'

export default async function CategoriesPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-6">Categories</h1>

      <form action={addCategory} className="bg-white border border-ink/10 rounded-sm p-6 mb-8 flex gap-4 items-end flex-wrap">
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Name (English)</label>
          <input name="name" required className="border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Name (Arabic)</label>
          <input name="name_ar" dir="rtl" className="border border-ink/15 rounded-sm px-3 py-2 font-arabic" />
        </div>
        <button type="submit" className="bg-green-deep text-gold px-5 py-2 rounded-sm text-sm uppercase tracking-wider">
          Add Category
        </button>
      </form>

      <div className="bg-white border border-ink/10 rounded-sm divide-y divide-ink/10">
        {categories?.length === 0 && (
          <p className="p-6 text-ink/50 text-sm">No categories yet — add one above.</p>
        )}
        {categories?.map((cat) => (
          <div key={cat.id} className="flex items-center justify-between px-6 py-4">
            <div>
              <span className="text-ink">{cat.name}</span>
              {cat.name_ar && (
                <span dir="rtl" className="font-arabic text-ink/60 ml-3">{cat.name_ar}</span>
              )}
            </div>
            <form action={deleteCategory.bind(null, cat.id)}>
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
