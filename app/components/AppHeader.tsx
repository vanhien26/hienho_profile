'use client'
import Link from 'next/link'
import { Shield, Menu, TrendingUp } from 'lucide-react'
import { useSidebar } from '../context/sidebar'

export default function AppHeader() {
  const { setOpen } = useSidebar()

  return (
    <header className="sticky top-0 z-50 border-b border-[#E8E0E6] bg-white/95 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-[#FFEFF4]"
            aria-label="Open menu"
          >
            <Menu size={18} color="#AE2070" />
          </button>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-[#E4DDD6] bg-[#FBF7F8] px-4 py-2 text-sm font-semibold text-[#5B3A53] shadow-sm transition hover:bg-[#F3E6F5]">
            <TrendingUp size={20} color="#AE2070" />
            <span style={{ fontWeight: 'bold', color: '#AE2070' }}>GPD</span>
          </Link>
        </div>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 rounded-full border border-[#E4DDD6] bg-[#FBF7F8] px-4 py-2 text-sm font-semibold text-[#5B3A53] shadow-sm transition hover:bg-[#F3E6F5]"
        >
          <Shield size={16} /> Admin
        </Link>
      </div>
    </header>
  )
}
