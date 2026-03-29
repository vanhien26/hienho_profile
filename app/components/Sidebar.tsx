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
      { label: 'Vay Nhanh', href: '/projects/vay-nhanh' },
      { label: 'Ví Trả Sau', href: '/projects/vi-tra-sau' },
      { label: 'Tín Dụng', href: '/projects/tin-dung' },
      { label: 'Bảo Hiểm Xe Máy', href: '/projects/bao-hiem-xe-may' },
      { label: 'Bảo Hiểm', href: '/projects/bao-hiem' },
      { label: 'Bảo Hiểm Ô Tô', href: '/projects/bao-hiem-o-to' },
      { label: 'Đối Tác', href: '/projects/doi-tac' },
      { label: 'Viễn Thông', href: '/projects/vien-thong' },
      { label: 'Du Lịch', href: '/projects/du-lich' },
      { label: 'Dịch Vụ Công', href: '/projects/dich-vu-cong' },
      { label: 'eSIM Du Lịch', href: '/projects/esim-du-lich' },
      { label: 'Phạt Nguội', href: '/projects/phat-nguoi' },
      { label: 'Thanh Toán Hóa Đơn', href: '/projects/thanh-toan-hoa-don' },
    ],
  },
  {
    section: 'Knowledge & Guideline',
    icon: BookOpen,
    key: 'knowledge',
    items: [
      { label: 'GEO Framework', href: '/projects/geo-framework' },
      { label: 'JTBD Analysis', href: '/projects/jtbd' },
      { label: 'Web-to-App Playbook', href: '/projects/web-to-app' },
    ],
  },
]

export default function Sidebar({ mobileOpen, onClose, alwaysOverlay }: { mobileOpen?: boolean; onClose?: () => void; alwaysOverlay?: boolean }) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  const toggle = (key: string) =>
    setCollapsed(prev => ({ ...prev, [key]: !prev[key] }))

  const handleLinkClick = () => {
    if (onClose) onClose()
  }

  const mainLinks = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Mini Web 2026', href: '/mini-web-2026', icon: FileText },
  ]

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
          <div className="px-3 mb-6">
            {mainLinks.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 mb-1 ${
                    active 
                      ? 'bg-[#AE2070] text-white shadow-lg shadow-[#AE2070]/20' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} strokeWidth={active ? 3 : 2} />
                  <span className={`text-[13px] font-black tracking-tight ${active ? 'opacity-100' : 'opacity-80'}`}>
                    {link.label}
                  </span>
                </Link>
              )
            })}
          </div>

          <div className="px-5 mb-2">
            <div className="h-px bg-white/5 w-full" />
          </div>

          {navTree.filter(g => (g as any).href === undefined).map(group => {
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
                          className={`flex items-center px-5 py-2 text-[12px] font-medium transition-all duration-150 border-l-2 ${
                            active
                              ? 'text-white border-pink-500 bg-white/6'
                              : 'text-white/50 border-transparent hover:text-white/80 hover:bg-white/3'
                          }`}
                        >
                          <span className="truncate">{item.label}</span>
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
