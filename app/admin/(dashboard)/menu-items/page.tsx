import { createClient } from '@/lib/supabase/server'
import { addMenuItem, toggleAvailability, deleteMenuItem } from './actions'

export default async function MenuItemsPage() {
  const supabase = await createClient()

  const { data: items } = await supabase
    .from('menu_items')
    .select('*, categories(name)')
    .order('sort_order')

  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order')

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-6">Menu Items</h1>

      <form action={addMenuItem} className="bg-white border border-ink/10 rounded-sm p-6 mb-8 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Name (English)</label>
          <input name="name" required className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Name (Arabic)</label>
          <input name="name_ar" dir="rtl" className="w-full border border-ink/15 rounded-sm px-3 py-2 font-arabic" />
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
        <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Price (SAR)</label>
          <input name="price" type="number" step="0.01" required className="w-full border border-ink/15 rounded-sm px-3 py-2" />
        </div>
        <div>
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Category</label>
          <select name="category_id" className="w-full border border-ink/15 rounded-sm px-3 py-2">
            <option value="">— None —</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Image</label>
          <input name="image" type="file" accept="image/jpeg,image/png,image/webp" className="w-full border border-ink/15 rounded-sm px-3 py-2 bg-white" />
        </div>

        <div className="col-span-2">
          <button type="submit" className="bg-green-deep text-gold px-5 py-2 rounded-sm text-sm uppercase tracking-wider">
            Add Menu Item
          </button>
        </div>
      </form>

      <div className="bg-white border border-ink/10 rounded-sm divide-vide-ink/10">
        {items?.length === 0 && (
          <p className="p-6 text-ink/50 text-sm">No menu items yet — add one above.</p>
        )}
        {items?.map((item) => (
          <div key={item.id} className="flex items-center justify-between px-6 py-4 gap-4">
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
        ))}
      </div>
    </div>
  )
}
