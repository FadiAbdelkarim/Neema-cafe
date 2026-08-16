import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from '@/components/admin/logout-button'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-green-deep text-gold">
        <div className="flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 gap-3">
          <span className="font-display text-base sm:text-lg shrink-0">Neema Admin</span>
          <div className="shrink-0">
            <LogoutButton />
          </div>
        </div>
        <nav className="flex gap-5 sm:gap-6 text-sm px-4 sm:px-8 pb-3 sm:pb-4 overflow-x-auto whitespace-nowrap [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <Link href="/admin" className="shrink-0">Dashboard</Link>
          <Link href="/admin/menu-items" className="shrink-0">Menu Items</Link>
          <Link href="/admin/categories" className="shrink-0">Categories</Link>
          <Link href="/admin/events" className="shrink-0">Events</Link>
        </nav>
      </header>
      <main className="p-4 sm:p-8">{children}</main>
    </div>
  )
}
