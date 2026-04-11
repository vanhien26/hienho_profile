'use client'
import { useState, useRef } from 'react'
import Sidebar from './components/Sidebar'
import Link from 'next/link'
import { projects, Project } from './data/projects'
import { Menu, Phone, Mail, MessageCircle, FileText, BookOpen, Search, Globe, Target, Map, BarChart2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Fuse from 'fuse.js'

const divisionColors: Record<string, { bg: string; text: string; border: string }> = {
  FS: { bg: '#FFEFF4', text: '#A50064', border: '#A50064' },
  UTI: { bg: '#E0F2FE', text: '#0284C7', border: '#0284C7' },
  OTA: { bg: '#DCFCE7', text: '#16A34A', border: '#16A34A' },
  MDS: { bg: '#FEF3C7', text: '#D97706', border: '#D97706' },
  DLS: { bg: '#EDE9FE', text: '#7C3AED', border: '#7C3AED' },
  SP: { bg: '#FEE2E2', text: '#DC2626', border: '#DC2626' },
  BMC: { bg: '#DBEAFE', text: '#2563EB', border: '#2563EB' },
  GPD: { bg: '#F9AFB5', text: '#E5303F', border: '#E5303F' },
}


const knowledgeIcons: Record<string, React.ReactNode> = {
  'geo-framework': <Globe size={16} style={{ color: '#0284C7' }} />,
  'jtbd': <Target size={16} style={{ color: '#7C3AED' }} />,
  'web-to-app': <Map size={16} style={{ color: '#16A34A' }} />,
}

const knowledgeIconBg: Record<string, string> = {
  'geo-framework': '#E0F2FE',
  'jtbd': '#EDE9FE',
  'web-to-app': '#DCFCE7',
}

function HoverPreview({ project, anchorRect }: { project: Project; anchorRect: DOMRect }) {
  const dc = project.division ? divisionColors[project.division] : null
  const viewportW = typeof window !== 'undefined' ? window.innerWidth : 1440
  const spaceRight = viewportW - anchorRect.right
  const showLeft = spaceRight < 320

  const style: React.CSSProperties = {
    position: 'fixed',
    top: Math.min(anchorRect.top, window.innerHeight - 280),
    ...(showLeft
      ? { right: viewportW - anchorRect.left + 8 }
      : { left: anchorRect.right + 8 }),
    width: 280,
    zIndex: 999,
    pointerEvents: 'none',
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: 4 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      style={style}
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: '#fff',
          border: '1px solid #E5E7EB',
          boxShadow: '0 20px 60px rgba(0,0,0,0.12), 0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        {/* Coloured top strip */}
        <div className="h-1" style={{ background: dc ? dc.border : '#AE2070' }} />

        <div className="p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            {dc && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: dc.bg, color: dc.text }}>
                {project.division}
              </span>
            )}
            <span className="text-[10px]" style={{ color: 'var(--ink-ghost)' }}>
              {new Date(project.updatedAt).toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' })}
            </span>
          </div>

          <p className="font-bold text-[14px] leading-snug mb-0.5" style={{ color: 'var(--ink)' }}>
            {project.title}
          </p>
          <p className="text-[10px] font-mono mb-2 truncate" style={{ color: 'var(--ink-ghost)' }}>
            {project.subtitle}
          </p>
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ink-2)' }}>
            {project.description}
          </p>

          {project.metrics && (
            <div className="flex gap-3 mt-3 pt-2.5" style={{ borderTop: '1px solid var(--border)' }}>
              {project.metrics.map(m => (
                <div key={m.label}>
                  <div className="text-xs font-black" style={{ color: 'var(--pink)' }}>{m.value}</div>
                  <div className="text-[9px]" style={{ color: 'var(--ink-ghost)' }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2.5">
              {project.tags.map(t => (
                <span key={t} className="text-[9px] font-semibold px-1.5 py-0.5 rounded" style={{ background: '#F1F5F9', color: 'var(--ink-3)' }}>
                  {t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 pt-2.5 flex items-center gap-1" style={{ borderTop: '1px solid var(--border)' }}>
            <span className="text-[10px] font-semibold" style={{ color: 'var(--pink)' }}>Click để xem tài liệu →</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-30 lg:hidden flex items-center justify-center w-10 h-10 rounded-xl"
      style={{ background: '#FFFFFF', boxShadow: 'var(--shadow-md)', border: '1px solid #E5E7EB' }}
    >
      <Menu size={18} color="#111827" />
    </button>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut' as const }
  },
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeDivision, setActiveDivision] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredProject, setHoveredProject] = useState<{ project: Project; rect: DOMRect } | null>(null)
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const useCaseProjects = projects.filter(p => p.category === 'use-case')
  const knowledgeProjects = projects.filter(p => p.category === 'knowledge')

  // Setup Fuse for fuzzy search
  const fuse = new Fuse(useCaseProjects, {
    keys: ['title', 'description', 'tags', 'subtitle'],
    threshold: 0.3, // Lower = more strict
    includeScore: true,
  })

  const filteredUseCases = useCaseProjects.filter(p => {
    const matchesDivision = activeDivision ? p.division === activeDivision : true
    if (!searchQuery.trim()) return matchesDivision
    
    const result = fuse.search(searchQuery)
    const matchesSearch = result.some(r => r.item.id === p.id)
    return matchesDivision && matchesSearch
  })

  const knowledgeFuse = new Fuse(knowledgeProjects, {
    keys: ['title', 'description', 'tags', 'subtitle'],
    threshold: 0.3,
    includeScore: true,
  })

  const filteredKnowledge = knowledgeProjects.filter(p => {
    if (!searchQuery.trim()) return true
    const result = knowledgeFuse.search(searchQuery)
    return result.some(r => r.item.id === p.id)
  })

  const allDivisions = Array.from(new Set(useCaseProjects.map(p => p.division).filter(Boolean))) as string[]
  const filterTabs = [
    { id: null, label: 'Tất cả', count: useCaseProjects.length },
    ...allDivisions.map(d => ({
      id: d,
      label: d,
      count: useCaseProjects.filter(p => p.division === d).length,
    })),
  ]

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(true)} />

      <AnimatePresence>
        {hoveredProject && (
          <HoverPreview project={hoveredProject.project} anchorRect={hoveredProject.rect} />
        )}
      </AnimatePresence>

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

          {/* MoMo Logo - top right */}
          <div className="absolute top-4 right-6 sm:right-12 z-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/momo-logo-white.png" alt="MoMo" className="h-10 sm:h-12 w-auto opacity-70" />
          </div>

          <div className="relative px-6 sm:px-12 pt-8 sm:pt-10 pb-0 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-8">
            {/* Avatar */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
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
            </motion.div>
            {/* Info */}
            <div className="pb-4 sm:pb-8 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(174,32,112,0.3)', color: '#F5BCDA', border: '1px solid rgba(174,32,112,0.4)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Growth Traffic Portfolio
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                Van Hien (Klaus)
              </h1>
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

          {/* Spacer */}
          <div className="mt-6 sm:mt-10" />
        </div>

        {/* Content */}
        <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-10">

          {/* Use Case Document Section */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--pink-light)' }}>
                  <FileText size={16} style={{ color: 'var(--pink)' }} />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--ink)' }}>
                    Use Case Document
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--ink-3)' }}>
                    Chiến lược và tài liệu thực thi cho từng Use Case
                  </p>
                </div>
              </div>

              <div className="relative w-full md:w-60">
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border rounded-xl text-xs transition-all outline-none"
                  style={{ borderColor: 'var(--border)' }}
                  onFocus={(e) => { e.target.style.borderColor = '#A50064'; e.target.style.boxShadow = '0 0 0 3px rgba(165,0,100,0.08)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <Search size={14} className="absolute left-3 top-3" style={{ color: 'var(--ink-ghost)' }} />
              </div>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2 mb-8 flex-wrap">
              {filterTabs.map((tab) => {
                const isActive = activeDivision === tab.id
                const dc = tab.id ? divisionColors[tab.id] : null
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveDivision(tab.id as string | null)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200"
                    style={{
                      background: isActive
                        ? (dc ? dc.text : '#111827')
                        : 'var(--bg-panel)',
                      color: isActive ? '#fff' : 'var(--ink-3)',
                      border: `1px solid ${isActive ? (dc ? dc.text : '#111827') : 'var(--border)'}`,
                      boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                    }}
                  >
                    {tab.label}
                    <span
                      className="text-[10px] font-black opacity-60"
                    >
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Empty State */}
            {filteredUseCases.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'var(--pink-light)' }}>
                  <Search size={20} style={{ color: 'var(--pink)' }} />
                </div>
                <p className="text-sm font-bold" style={{ color: 'var(--ink-2)' }}>Không tìm thấy kết quả</p>
                <p className="text-xs mt-1" style={{ color: 'var(--ink-ghost)' }}>
                  Thử từ khoá khác hoặc{' '}
                  <button
                    onClick={() => { setSearchQuery(''); setActiveDivision(null) }}
                    className="underline font-semibold"
                    style={{ color: 'var(--pink)' }}
                  >
                    xoá bộ lọc
                  </button>
                </p>
              </motion.div>
            )}

            {/* Use Case Grid */}
            <motion.div
              variants={containerVariants}
              initial={false}
              animate="visible"
              key={activeDivision || 'all'}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              <AnimatePresence mode="popLayout">
                {filteredUseCases.map(p => {
                  const dc = p.division ? divisionColors[p.division] : null
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      variants={cardVariants}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Link href={`/projects/${p.id}`} className="block group">
                        <div
                          className="rounded-2xl transition-all duration-300 group-hover:-translate-y-1 border overflow-hidden relative flex"
                          style={{
                            background: 'var(--bg-panel)',
                            borderColor: 'var(--border)',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                            e.currentTarget.style.borderColor = dc ? dc.text + '40' : '#AE207040'
                            const rect = e.currentTarget.getBoundingClientRect()
                            hoverTimeout.current = setTimeout(() => setHoveredProject({ project: p, rect }), 400)
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                            e.currentTarget.style.borderColor = 'var(--border)'
                            if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
                            setHoveredProject(null)
                          }}
                        >
                          {/* Left border accent */}
                          <div
                            className="w-1 flex-shrink-0 rounded-l-2xl"
                            style={{ background: dc ? dc.border : '#AE2070' }}
                          />

                          <div className="p-4 flex-1 min-w-0">
                            {/* Top row: division badge + date */}
                            <div className="flex items-center justify-between mb-2">
                              {dc && (
                                <span
                                  className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                                  style={{ background: dc.bg, color: dc.text }}
                                >
                                  {p.division}
                                </span>
                              )}
                              <span className="text-[10px]" style={{ color: 'var(--ink-ghost)' }}>
                                {new Date(p.updatedAt).toLocaleDateString('vi-VN', { month: 'short', year: 'numeric' })}
                              </span>
                            </div>

                            <h3
                              className="font-bold text-[14px] leading-snug mb-0.5"
                              style={{ color: 'var(--ink)' }}
                            >
                              {p.title}
                            </h3>
                            <p
                              className="text-[10px] font-mono mb-1.5 truncate"
                              style={{ color: 'var(--ink-ghost)' }}
                            >
                              {p.subtitle}
                            </p>

                            <p
                              className="text-[11px] leading-relaxed line-clamp-2"
                              style={{ color: 'var(--ink-2)' }}
                            >
                              {p.description}
                            </p>

                            {p.metrics && (
                              <div className="flex gap-3 mt-3 pt-2.5" style={{ borderTop: '1px solid var(--border)' }}>
                                {p.metrics.slice(0, 3).map(m => (
                                  <div key={m.label}>
                                    <div className="text-xs font-black" style={{ color: 'var(--pink)' }}>{m.value}</div>
                                    <div className="text-[9px]" style={{ color: 'var(--ink-ghost)' }}>{m.label}</div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Knowledge & Guideline */}
          <div className="mb-12 mt-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: '#F3E8FF' }}>
                <BookOpen size={16} style={{ color: '#7C3AED' }} />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--ink)' }}>
                  Knowledge & Guideline
                </h2>
                <p className="text-xs" style={{ color: 'var(--ink-3)' }}>
                  Framework và Playbook áp dụng cross-product
                </p>
              </div>
              <span
                className="ml-auto text-[11px] font-bold px-3 py-1 rounded-lg"
                style={{ background: '#F3E8FF', color: '#7C3AED' }}
              >
                {filteredKnowledge.length} docs
              </span>
            </div>

            <motion.div
              variants={containerVariants}
              initial={false}
              whileInView="visible"
              viewport={{ once: true }}
              key={`knowledge-${searchQuery}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredKnowledge.map(p => {
                const kIcon = knowledgeIcons[p.id]
                const kIconBg = knowledgeIconBg[p.id] || '#F3E8FF'
                return (
                  <motion.div key={p.id} variants={cardVariants}>
                    <Link href={`/projects/${p.id}`} className="block group">
                      <div
                        className="rounded-2xl transition-all duration-300 group-hover:-translate-y-1 border overflow-hidden flex"
                        style={{
                          background: 'var(--bg-panel)',
                          borderColor: 'var(--border)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                          e.currentTarget.style.borderColor = '#7C3AED40'
                          const rect = e.currentTarget.getBoundingClientRect()
                          hoverTimeout.current = setTimeout(() => setHoveredProject({ project: p, rect }), 400)
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                          e.currentTarget.style.borderColor = 'var(--border)'
                          if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
                          setHoveredProject(null)
                        }}
                      >
                        {/* Left border accent — purple for knowledge */}
                        <div className="w-1 flex-shrink-0 rounded-l-2xl" style={{ background: '#7C3AED' }} />

                        <div className="p-5 flex-1 min-w-0">
                          {/* Icon row */}
                          <div className="flex items-center mb-3">
                            <div
                              className="w-8 h-8 rounded-xl flex items-center justify-center"
                              style={{ background: kIconBg }}
                            >
                              {kIcon || <BarChart2 size={16} style={{ color: '#7C3AED' }} />}
                            </div>
                          </div>

                          <h3
                            className="font-bold text-[15px] leading-snug mb-2 transition-colors"
                            style={{ color: 'var(--ink)' }}
                          >
                            {p.title}
                          </h3>

                          <p
                            className="text-xs leading-relaxed line-clamp-3"
                            style={{ color: 'var(--ink-2)' }}
                          >
                            {p.description}
                          </p>

                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {p.tags.map(t => (
                              <span
                                key={t}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-md"
                                style={{ background: '#F1F5F9', color: 'var(--ink-3)', border: '1px solid var(--border)' }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>


        </div>
      </main>
    </div>
  )
}
