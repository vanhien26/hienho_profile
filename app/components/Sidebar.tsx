'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Home, FileText, BookOpen, ChevronDown, X } from 'lucide-react'
import { projects } from '../data/projects'

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
    { label: 'Use Case', href: '/use-case', icon: FileText },
  ]

  const navTree = [
    {
      section: 'Use Case Document',
      icon: FileText,
      key: 'use-case',
      items: projects
        .filter(p => p.category === 'use-case')
        .map(p => ({ label: p.title, href: `/projects/${p.id}` })),
    },
    {
      section: 'Knowledge & Guideline',
      icon: BookOpen,
      key: 'knowledge',
      items: projects
        .filter(p => p.category === 'knowledge')
        .map(p => ({ label: p.title, href: `/projects/${p.id}` })),
    },
  ]

  return (
    <>
      {mobileOpen && (
        <div
          className={`fixed inset-0 bg-black/40 z-40 ${alwaysOverlay ? '' : 'lg:hidden'}`}
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
        style={{ width: 240, background: '#FFFFFF', borderRight: '1px solid #E5E7EB' }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 z-10 transition-colors ${alwaysOverlay ? '' : 'lg:hidden'}`}
          style={{ color: '#6B7280' }}
        >
          <X size={18} />
        </button>

        {/* Brand */}
        <div className="px-4 pt-5 pb-4" style={{ borderBottom: '1px solid #F3F4F6' }}>
          <Link href="/" className="block" onClick={handleLinkClick}>
            <div
              className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-lg"
              style={{ background: '#FFEFF4' }}
            >
              <span className="font-black text-xs tracking-tight" style={{ color: '#AE2070' }}>MoMo</span>
              <span className="text-xs font-medium" style={{ color: '#AE2070', opacity: 0.6 }}>Out-App Traffic</span>
            </div>
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.jpg"
                alt="Klaus"
                className="rounded-full flex-shrink-0 object-cover"
                style={{ width: 32, height: 32, border: '2px solid #F9C9DC' }}
              />
              <div>
                <p className="text-xs font-bold leading-tight" style={{ color: '#111827' }}>Van Hien (Klaus)</p>
                <p className="text-[10px] mt-0.5" style={{ color: '#9CA3AF' }}>SEO & GEO Lead · momo.vn</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-0 overflow-y-auto">
          {/* Main links */}
          <div className="px-3 mb-3">
            {mainLinks.map((link) => {
              const Icon = link.icon
              const active = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150 mb-0.5"
                  style={{
                    background: active ? '#FFEFF4' : 'transparent',
                    color: active ? '#AE2070' : '#4B5563',
                  }}
                >
                  <Icon size={15} strokeWidth={active ? 2.5 : 2} />
                  <span className="text-[13px] font-semibold">{link.label}</span>
                </Link>
              )
            })}
          </div>

          <div className="mx-4 mb-3" style={{ height: 1, background: '#F3F4F6' }} />

          {/* Dynamic sections */}
          {navTree.map(group => {
            const Icon = group.icon
            const isCollapsed = collapsed[group.key]
            return (
              <div key={group.key} className="mb-1">
                <button
                  onClick={() => toggle(group.key)}
                  className="w-full flex items-center justify-between px-4 py-1.5"
                >
                  <span className="text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5" style={{ color: '#9CA3AF' }}>
                    <Icon size={11} />
                    {group.section}
                    <span className="ml-1 font-black" style={{ color: '#D1D5DB' }}>{group.items.length}</span>
                  </span>
                  <ChevronDown
                    size={12}
                    style={{
                      color: '#D1D5DB',
                      transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>

                {!isCollapsed && (
                  <div className="mt-0.5 px-3">
                    {group.items.map(item => {
                      const active = pathname === item.href
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="flex items-center px-3 py-1.5 rounded-lg text-[12px] transition-all duration-150"
                          style={{
                            background: active ? '#FFEFF4' : 'transparent',
                            color: active ? '#AE2070' : '#6B7280',
                            fontWeight: active ? 600 : 400,
                          }}
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
        <div className="px-4 py-3" style={{ borderTop: '1px solid #F3F4F6' }}>
          <p className="font-mono text-[10px]" style={{ color: '#D1D5DB' }}>v2026.03 · Growth Portfolio</p>
        </div>
      </aside>
    </>
  )
}
