import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { count: categoryCount } = await supabase
    .from('categories')
    .select('*', { count: 'exact', head: true })

  const { count: menuItemCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })

  const { count: soldOutCount } = await supabase
    .from('menu_items')
    .select('*', { count: 'exact', head: true })
    .eq('is_available', false)

  const { count: eventCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true })
    .gte('event_date', new Date().toISOString().split('T')[0])

  const cards = [
    { label: 'Menu Items', value: menuItemCount ?? 0, href: '/admin/menu-items', note: `${soldOutCount ?? 0} sold out` },
    { label: 'Categories', value: categoryCount ?? 0, href: '/admin/categories', note: null },
    { label: 'Upcoming Events', value: eventCount ?? 0, href: '/admin/events', note: null },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl text-ink mb-2">Dashboard</h1>
      <p className="text-ink/60 mb-8">Manage your menu items, categories, and events from here.</p>

      <div className="grid grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white border border-ink/10 rounded-sm p-6 hover:border-green-deep transition-colors"
          >
            <div className="text-xs uppercase tracking-wider text-ink/50 mb-2">{card.label}</div>
            <div className="font-display text-4xl text-green-deep">{card.value}</div>
            {card.note && <div className="text-terracotta text-sm mt-1">{card.note}</div>}
          </Link>
        ))}
      </div>
    </div>
  )
}
