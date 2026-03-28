'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Home, FileText, BookOpen, ChevronDown, X } from 'lucide-react'

const navTree = [
  {
    section: 'Use Case Document',
    icon: FileText,
    key: 'use-case',
    items: [
      { label: 'Vay Nhanh Strategy', href: '/projects/vay-nhanh-strategy', tag: 'LIVE' },
      { label: 'Ví Trả Sau BNPL', href: '/projects/vi-tra-sau-bnpl', tag: 'REVIEW' },
      { label: 'Credit Ecosystem', href: '/projects/credit-ecosystem', tag: 'LIVE' },
      { label: 'Bảo Hiểm Xe Máy', href: '/projects/bao-hiem-xe-may', tag: 'LIVE' },
      { label: 'Insurance Hub IA', href: '/projects/bao-hiem-hub', tag: 'LIVE' },
      { label: 'Bảo Hiểm Ô Tô', href: '/projects/bao-hiem-o-to', tag: 'LIVE' },
      { label: 'Partner Directory', href: '/projects/doi-tac-directory', tag: 'DRAFT' },
      { label: 'Telecom Hub', href: '/projects/telco-hub', tag: 'LIVE' },
      { label: 'Travel Hub', href: '/projects/travel-hub', tag: 'LIVE' },
      { label: 'Dịch Vụ Công', href: '/projects/dich-vu-cong', tag: 'LIVE' },
      { label: 'eSIM Du Lịch', href: '/projects/esim-du-lich', tag: 'LIVE' },
      { label: 'Phạt Nguội', href: '/projects/phat-nguoi', tag: 'LIVE' },
    ],
  },
  {
    section: 'Knowledge & Guideline',
    icon: BookOpen,
    key: 'knowledge',
    items: [
      { label: 'GEO Framework', href: '/projects/geo-framework', tag: 'LIVE' },
      { label: 'JTBD Fintech', href: '/projects/jtbd-fintech', tag: 'LIVE' },
      { label: 'Web-to-App Playbook', href: '/projects/web-to-app-funnel', tag: 'LIVE' },
    ],
  },
]

const tagColor: Record<string, string> = {
  LIVE: 'bg-emerald-500/15 text-emerald-400',
  REVIEW: 'bg-amber-500/15 text-amber-400',
  DRAFT: 'bg-white/10 text-white/40',
}

export default function Sidebar({ mobileOpen, onClose, alwaysOverlay }: { mobileOpen?: boolean; onClose?: () => void; alwaysOverlay?: boolean }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (key: string) =>
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }))

  const handleLinkClick = () => {
    if (onClose) onClose()
  }

  return (
    <>
      {/* Overlay backdrop */}
      {mobileOpen && (
        <div
          className={`fixed inset-0 bg-black/50 z-40 ${alwaysOverlay ? '' : 'lg:hidden'}`}
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col flex-shrink-0 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${alwaysOverlay ? '' : 'lg:sticky lg:translate-x-0 lg:z-auto'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ width: 256, background: '#18120E', borderRight: '1px solid rgba(255,255,255,0.07)' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 text-white/50 hover:text-white z-10 transition-colors ${alwaysOverlay ? '' : 'lg:hidden'}`}
        >
          <X size={18} />
        </button>

        {/* Brand */}
        <div className="px-5 pt-6 pb-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <Link href="/" className="block" onClick={handleLinkClick}>
            <div
              className="inline-flex items-center gap-2 mb-3"
              style={{ background: '#AE2070', borderRadius: 8, padding: '5px 11px' }}
            >
              <span className="text-white font-black text-sm tracking-tight">MoMo</span>
              <span className="text-white/60 text-xs font-medium">Growth</span>
            </div>
            <p className="text-xs font-bold text-white/80 leading-tight">Van Hien (Klaus)</p>
            <p className="text-[10px] text-white/35 mt-0.5">SEO & GEO Lead · momo.vn</p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-0">
          <Link
            href="/"
            onClick={handleLinkClick}
            className={`flex items-center gap-2.5 px-5 py-2 text-xs font-semibold transition-all duration-150 ${
              pathname === '/'
                ? 'text-white border-l-2 border-pink-500 bg-white/5'
                : 'text-white/50 hover:text-white/80 border-l-2 border-transparent'
            }`}
          >
            <Home size={14} /> Home
          </Link>

          {navTree.map(group => {
            const Icon = group.icon
            return (
              <div key={group.key} className="mt-4">
                <button
                  onClick={() => toggle(group.key)}
                  className="w-full flex items-center justify-between px-5 py-1.5 group"
                >
                  <span className="text-[10px] font-bold tracking-widest uppercase text-white/25 group-hover:text-white/40 transition-colors flex items-center gap-1.5">
                    <Icon size={12} /> {group.section}
                  </span>
                  <ChevronDown
                    size={12}
                    className="text-white/20 transition-transform duration-200"
                    style={{ transform: collapsed[group.key] ? 'rotate(-90deg)' : 'rotate(0)' }}
                  />
                </button>

                {!collapsed[group.key] && (
                  <div className="mt-1">
                    {group.items.map(item => {
                      const active = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleLinkClick}
                          className={`flex items-center justify-between px-5 py-2 text-[12px] font-medium transition-all duration-150 border-l-2 ${
                            active
                              ? 'text-white border-pink-500 bg-white/6'
                              : 'text-white/50 border-transparent hover:text-white/80 hover:bg-white/3'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${tagColor[item.tag] || ''} ml-2 flex-shrink-0`}>
                            {item.tag}
                          </span>
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <p className="font-mono text-[10px] text-white/20">v2026.03 · Growth Portfolio</p>
        </div>
      </aside>
    </>
  )
}
