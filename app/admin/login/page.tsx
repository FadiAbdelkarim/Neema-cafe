'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Invalid email or password.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-green-deeper flex items-center justify-center px-6">
      <form onSubmit={handleLogin} className="bg-cream rounded-sm p-10 w-full max-w-sm">
        <h1 className="font-display text-2xl text-ink mb-1">Neema Admin</h1>
        <p className="text-ink/50 text-sm mb-8">Sign in to manage the site.</p>

        <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-ink/15 rounded-sm px-3 py-2 mb-4 bg-white text-ink"
        />

        <label className="block text-xs uppercase tracking-wider text-ink/50 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-ink/15 rounded-sm px-3 py-2 mb-6 bg-white text-ink"
        />

        {error && <p className="text-terracotta text-sm mb-4">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-deep hover:bg-green-deeper transition-colors text-gold py-3 rounded-sm text-sm tracking-wider uppercase disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}