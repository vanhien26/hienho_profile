'use client'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Link from 'next/link'
import { projects } from './data/projects'
import { Menu, Phone, Mail, MessageCircle, FileText, BookOpen } from 'lucide-react'

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
  live: { bg: '#E0F5EA', text: '#00663A', label: 'LIVE' },
  review: { bg: '#FFF3DC', text: '#8B5800', label: 'REVIEW' },
  draft: { bg: '#F0EDE8', text: '#8C7D74', label: 'DRAFT' },
}

const tagStyle: Record<string, string> = {
  SEO: '#E6EEFF|#1848B8',
  Credit: '#F5E0EC|#AE2070',
  Insurance: '#EDE8FF|#4B1DB8',
  BNPL: '#F5E0EC|#AE2070',
  GEO: '#EDE8FF|#4B1DB8',
  PLG: '#E0F5EA|#00663A',
  JTBD: '#FFF3DC|#8B5800',
  Framework: '#F0EDE8|#8C7D74',
  pSEO: '#E6EEFF|#1848B8',
  IA: '#E6EEFF|#1848B8',
  Schema: '#F5E0EC|#AE2070',
  Directory: '#E0F5EA|#00663A',
  'Content Clusters': '#E6EEFF|#1848B8',
  'Link Building': '#FFF3DC|#8B5800',
  'Internal Linking': '#F5E0EC|#AE2070',
  'Content Architecture': '#E6EEFF|#1848B8',
  'Auto Insurance': '#EDE8FF|#4B1DB8',
  'Template System': '#F0EDE8|#8C7D74',
  'AI Overview': '#EDE8FF|#4B1DB8',
  SGE: '#EDE8FF|#4B1DB8',
  'Multi-product': '#E0F5EA|#00663A',
  'Search Intent': '#FFF3DC|#8B5800',
  'Deep Link': '#E0F5EA|#00663A',
  CTA: '#F5E0EC|#AE2070',
  'Credit Ecosystem': '#F5E0EC|#AE2070',
}

function Tag({ label }: { label: string }) {
  const colors = tagStyle[label]?.split('|') || ['#F0EDE8', '#8C7D74']
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
      style={{ background: colors[0], color: colors[1] }}
    >
      {label}
    </span>
  )
}

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-30 lg:hidden flex items-center justify-center w-10 h-10 rounded-lg"
      style={{ background: '#18120E', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
    >
      <Menu size={18} color="white" />
    </button>
  )
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeDivision, setActiveDivision] = useState<string | null>(null)
  const useCaseProjects = projects.filter(p => p.category === 'use-case')
  const knowledgeProjects = projects.filter(p => p.category === 'knowledge')

  const filteredUseCases = activeDivision
    ? useCaseProjects.filter(p => p.division === activeDivision)
    : useCaseProjects

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(true)} />

      <main className="flex-1 overflow-y-auto w-full">
        {/* Profile Header / Banner */}
        <div className="relative overflow-hidden" style={{ minHeight: 220 }}>
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #18120E 0%, #2D1A28 40%, #AE2070 100%)',
            }}
          />
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
              backgroundSize: '200px',
            }}
          />
          {/* Grid lines */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />

          <div className="relative px-6 sm:px-12 pt-8 sm:pt-10 pb-0 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8">
            {/* Avatar */}
            <div
              className="flex-shrink-0 rounded-full mb-0 z-10 overflow-hidden"
              style={{
                width: 88,
                height: 88,
                border: '4px solid #F6F3EF',
                boxShadow: '0 8px 32px rgba(174,32,112,0.4)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/avatar.jpg"
                alt="Klaus"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Info */}
            <div className="pb-4 sm:pb-8 text-center sm:text-left">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(174,32,112,0.3)', color: '#F5BCDA', border: '1px solid rgba(174,32,112,0.4)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Growth Traffic Portfolio
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">Van Hien (Klaus)</h1>
              <p className="text-white/60 text-sm font-medium mt-1.5">
                SEO & GEO Lead ·{' '}
                <span className="text-white/80 font-semibold">MoMo (momo.vn)</span>
              </p>
              <p className="text-white/40 text-xs mt-2 max-w-md leading-relaxed">
                Web Growth Traffic & Web to App Optimization
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className="text-white/50 text-xs flex items-center gap-1.5">
                  <Phone size={12} />
                  090 6973942
                </span>
                <span className="text-white/50 text-xs flex items-center gap-1.5">
                  <Mail size={12} />
                  hien.ho@momo.vn
                </span>
                <a
                  href="https://chat.google.com/dm/hien.ho@mservice.com.vn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all hover:opacity-80"
                  style={{ background: '#AE2070', color: '#fff' }}
                >
                  <MessageCircle size={12} />
                  Chat
                </a>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="relative px-6 sm:px-12 py-4 mt-6 sm:mt-10 grid grid-cols-4 gap-2 sm:flex sm:items-center sm:gap-10"
            style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(8px)', borderTop: '1px solid rgba(255,255,255,0.07)' }}
          >
            {[
              { value: useCaseProjects.length.toString(), label: 'Use Cases' },
              { value: projects.filter(p => p.division === 'FS').length.toString(), label: 'FS' },
              { value: projects.filter(p => p.division === 'UTI').length.toString(), label: 'UTI' },
              { value: projects.filter(p => p.division === 'OTA').length.toString(), label: 'OTA' },
            ].map(stat => (
              <div key={stat.label} className="text-center sm:text-left">
                <div className="text-lg sm:text-xl font-black text-white leading-none">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-white/40 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-10">

          {/* Use Case Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F5E0EC' }}>
                <FileText size={16} style={{ color: '#AE2070' }} />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--ink)' }}>
                  Use Case Document
                </h2>
                <p className="text-xs" style={{ color: 'var(--ink-3)' }}>
                  Chiến lược và tài liệu thực thi cho từng vertical
                </p>
              </div>
              <span
                className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#F5E0EC', color: '#AE2070' }}
              >
                {filteredUseCases.length} docs
              </span>
            </div>

            {/* Division Filter (Card style from user image) */}
            <div className="flex mb-8">
              <div
                className="inline-flex items-center p-1 rounded-2xl"
                style={{ background: '#18120E', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}
              >
                {[
                  { id: null, label: 'ALL', count: useCaseProjects.length },
                  { id: 'FS', label: 'FS', count: useCaseProjects.filter(p => p.division === 'FS').length },
                  { id: 'UTI', label: 'UTI', count: useCaseProjects.filter(p => p.division === 'UTI').length },
                  { id: 'OTA', label: 'OTA', count: useCaseProjects.filter(p => p.division === 'OTA').length },
                ].map((div) => (
                  <button
                    key={div.label}
                    onClick={() => setActiveDivision(div.id as any)}
                    className={`flex flex-col items-center justify-center min-w-[72px] sm:min-w-[84px] py-2.5 rounded-xl transition-all duration-200 ${activeDivision === div.id ? 'bg-white/10' : 'hover:bg-white/5 opacity-60 hover:opacity-100'}`}
                  >
                    <span
                      className={`text-xl sm:text-2xl font-black leading-none ${activeDivision === div.id ? 'text-white' : 'text-white/90'}`}
                    >
                      {div.count}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold tracking-widest mt-1.5 ${activeDivision === div.id ? 'text-white/80' : 'text-white/30'}`}
                    >
                      {div.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUseCases.map(p => {

                const s = statusStyle[p.status]
                return (
                  <Link key={p.id} href={`/projects/${p.id}`} className="block group">
                    <div
                      className="rounded-xl p-5 transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {s.label}
                        </span>
                        <span className="text-[10px]" style={{ color: 'var(--ink-3)' }}>
                          {new Date(p.updatedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </span>
                      </div>

                      <h3
                        className="font-bold text-sm leading-snug mb-1 group-hover:text-pink-600 transition-colors"
                        style={{ color: 'var(--ink)' }}
                      >
                        {p.title}
                      </h3>
                      <code
                        className="text-[10px] font-mono"
                        style={{ color: 'var(--ink-3)' }}
                      >
                        {p.subtitle}
                      </code>

                      <p
                        className="text-xs mt-2.5 leading-relaxed line-clamp-2"
                        style={{ color: 'var(--ink-2)' }}
                      >
                        {p.description}
                      </p>

                      {p.metrics && (
                        <div className="flex gap-3 mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                          {p.metrics.map(m => (
                            <div key={m.label}>
                              <div className="text-sm font-black" style={{ color: '#AE2070' }}>{m.value}</div>
                              <div className="text-[9px]" style={{ color: 'var(--ink-3)' }}>{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.tags.slice(0, 3).map(t => <Tag key={t} label={t} />)}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Knowledge Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#EDE8FF' }}>
                <BookOpen size={16} style={{ color: '#4B1DB8' }} />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--ink)' }}>
                  Knowledge & Guideline
                </h2>
                <p className="text-xs" style={{ color: 'var(--ink-3)' }}>
                  Framework và Playbook áp dụng cross-vertical
                </p>
              </div>
              <span
                className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#EDE8FF', color: '#4B1DB8' }}
              >
                {knowledgeProjects.length} docs
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {knowledgeProjects.map(p => {
                const s = statusStyle[p.status]
                return (
                  <Link key={p.id} href={`/projects/${p.id}`} className="block group">
                    <div
                      className="rounded-xl p-5 transition-all duration-200 group-hover:shadow-lg group-hover:-translate-y-0.5"
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ background: s.bg, color: s.text }}
                        >
                          {s.label}
                        </span>
                        <span className="text-[10px]" style={{ color: 'var(--ink-3)' }}>
                          {new Date(p.updatedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                        </span>
                      </div>

                      <h3
                        className="font-bold text-sm leading-snug mb-1 group-hover:text-pink-600 transition-colors"
                        style={{ color: 'var(--ink)' }}
                      >
                        {p.title}
                      </h3>

                      <p
                        className="text-xs mt-2.5 leading-relaxed line-clamp-3"
                        style={{ color: 'var(--ink-2)' }}
                      >
                        {p.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.tags.map(t => <Tag key={t} label={t} />)}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
