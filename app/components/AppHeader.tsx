'use client'
import Link from 'next/link'
import { Shield, Menu, TrendingUp } from 'lucide-react'
import { useSidebar } from '../context/sidebar'

export default function AppHeader() {
  const { setOpen } = useSidebar()

  return (
    <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md" style={{ borderColor: 'var(--gray-300)' }}>
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-colors"
            style={{}}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--gray-100)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            aria-label="Open menu"
          >
            <Menu size={18} style={{ color: 'var(--clay)' }} />
          </button>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-all" style={{ border: '1.5px solid var(--gray-300)', background: 'var(--ivory)', color: 'var(--clay)' }}>
            <TrendingUp size={18} style={{ color: 'var(--clay)', strokeWidth: 2 }} />
            <span style={{ fontWeight: 700, color: 'var(--clay)' }}>GPD</span>
          </Link>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-all"
          style={{ border: '1.5px solid var(--gray-300)', background: 'var(--ivory)', color: 'var(--clay)' }}
        >
          <Shield size={16} /> Admin
        </Link>
      </div>
    </header>
  )
}
