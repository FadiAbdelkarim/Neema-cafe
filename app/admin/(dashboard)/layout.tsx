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
      <header className="bg-green-deep text-gold px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-display text-lg">Neema Admin</span>
          <nav className="flex gap-6 text-sm">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/menu-items">Menu Items</Link>
            <Link href="/admin/categories">Categories</Link>
            <Link href="/admin/events">Events</Link>
          </nav>
        </div>
        <LogoutButton />
      </header>
      <main className="p-8">{children}</main>
    </div>
  )
}