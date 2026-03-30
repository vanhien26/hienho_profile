'use client'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Link from 'next/link'
import { projects } from './data/projects'
import { miniwebs, type MiniWebDivision } from './data/miniwebs'
import { Menu, Phone, Mail, MessageCircle, FileText, BookOpen, Search, Globe, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const divisionColors: Record<string, { bg: string; text: string }> = {
  FS: { bg: '#FFEFF4', text: '#A50064' },
  UTI: { bg: '#E0F2FE', text: '#0284C7' },
  OTA: { bg: '#DCFCE7', text: '#16A34A' },
  MDS: { bg: '#FEF3C7', text: '#D97706' },
  DLS: { bg: '#EDE9FE', text: '#7C3AED' },
  SP: { bg: '#FEE2E2', text: '#DC2626' },
  BMC: { bg: '#DBEAFE', text: '#2563EB' },
  GPD: { bg: '#F9AFB5', text: '#E5303F' },
}

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-30 lg:hidden flex items-center justify-center w-10 h-10 rounded-xl"
      style={{ background: '#111827', boxShadow: 'var(--shadow-md)' }}
    >
      <Menu size={18} color="white" />
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
  const [miniWebDivision, setMiniWebDivision] = useState<string | null>(null)
  const [miniWebSearch, setMiniWebSearch] = useState('')
  const useCaseProjects = projects.filter(p => p.category === 'use-case')
  const knowledgeProjects = projects.filter(p => p.category === 'knowledge')

  const filteredUseCases = useCaseProjects.filter(p => {
    const matchesDivision = activeDivision ? p.division === activeDivision : true
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesDivision && matchesSearch
  })

  const filteredKnowledge = knowledgeProjects.filter(p => {
    return p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
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

      <main className="flex-1 overflow-y-auto w-full">
        {/* Profile Header / Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden"
          style={{ minHeight: 220 }}
        >
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
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3"
                style={{ background: 'rgba(174,32,112,0.3)', color: '#F5BCDA', border: '1px solid rgba(174,32,112,0.4)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                Growth Traffic Portfolio
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none"
              >
                Van Hien (Klaus)
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-white/60 text-sm font-medium mt-1.5"
              >
                SEO & GEO Lead ·{' '}
                <span className="text-white/80 font-semibold">MoMo (momo.vn)</span>
              </motion.p>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-white/40 text-xs mt-2 max-w-md leading-relaxed"
              >
                Web Growth Traffic & Web to App Optimization
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex flex-wrap items-center gap-3 mt-3"
              >
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
              </motion.div>
            </div>
          </div>

          {/* Spacer */}
          <div className="mt-6 sm:mt-10" />
        </motion.div>

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
            <div className="flex items-center gap-2 mb-8">
              {filterTabs.map((tab) => {
                const isActive = activeDivision === tab.id
                return (
                  <button
                    key={tab.label}
                    onClick={() => setActiveDivision(tab.id as string | null)}
                    className="relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200"
                    style={{
                      background: isActive ? '#111827' : 'var(--bg-panel)',
                      color: isActive ? '#fff' : 'var(--ink-3)',
                      border: `1px solid ${isActive ? '#111827' : 'var(--border)'}`,
                      boxShadow: isActive ? 'var(--shadow-md)' : 'none',
                    }}
                  >
                    {tab.label}
                    <span
                      className="ml-1.5 text-[10px] font-black"
                      style={{ opacity: isActive ? 0.6 : 0.4 }}
                    >
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Use Case Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
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
                          className="rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-1 border overflow-hidden relative"
                          style={{
                            background: 'var(--bg-panel)',
                            borderColor: 'var(--border)',
                            boxShadow: 'var(--shadow-sm)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                            e.currentTarget.style.borderColor = dc ? dc.text + '30' : 'var(--pink)' + '30'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                            e.currentTarget.style.borderColor = 'var(--border)'
                          }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            {dc && (
                              <span
                                className="text-[10px] font-bold px-2.5 py-1 rounded-lg"
                                style={{ background: dc.bg, color: dc.text }}
                              >
                                {p.division}
                              </span>
                            )}
                          </div>

                          <h3
                            className="font-bold text-[15px] leading-snug mb-1.5 transition-colors"
                            style={{ color: 'var(--ink)' }}
                          >
                            {p.title}
                          </h3>
                          <p
                            className="text-[11px] font-medium mb-3"
                            style={{ color: 'var(--ink-ghost)' }}
                          >
                            {p.subtitle}
                          </p>

                          <p
                            className="text-xs leading-relaxed line-clamp-2"
                            style={{ color: 'var(--ink-2)' }}
                          >
                            {p.description}
                          </p>

                          {p.metrics && (
                            <div className="flex gap-4 mt-4 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
                              {p.metrics.map(m => (
                                <div key={m.label}>
                                  <div className="text-sm font-black" style={{ color: 'var(--pink)' }}>{m.value}</div>
                                  <div className="text-[9px] font-medium" style={{ color: 'var(--ink-ghost)' }}>{m.label}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {p.tags.slice(0, 2).map(t => (
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              key={`knowledge-${searchQuery}`}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filteredKnowledge.map(p => {
                return (
                  <motion.div key={p.id} variants={cardVariants}>
                    <Link href={`/projects/${p.id}`} className="block group">
                      <div
                        className="rounded-2xl p-5 transition-all duration-300 group-hover:-translate-y-1 border"
                        style={{
                          background: 'var(--bg-panel)',
                          borderColor: 'var(--border)',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                          e.currentTarget.style.borderColor = '#7C3AED30'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                          e.currentTarget.style.borderColor = 'var(--border)'
                        }}
                      >
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
                    </Link>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>

          {/* Mini Web 2026 Section */}
          <div className="mt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--pink-light)' }}>
                  <Globe size={16} style={{ color: 'var(--pink)' }} />
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--ink)' }}>
                    Mini Web 2026
                  </h2>
                  <p className="text-xs" style={{ color: 'var(--ink-3)' }}>
                    {miniwebs.length} mini-webs across {Array.from(new Set(miniwebs.map(m => m.division))).length} divisions
                  </p>
                </div>
              </div>

              <div className="relative w-full md:w-60">
                <input
                  type="text"
                  placeholder="Tìm kiếm mini web..."
                  value={miniWebSearch}
                  onChange={(e) => setMiniWebSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border rounded-xl text-xs transition-all outline-none"
                  style={{ borderColor: 'var(--border)' }}
                  onFocus={(e) => { e.target.style.borderColor = '#A50064'; e.target.style.boxShadow = '0 0 0 3px rgba(165,0,100,0.08)' }}
                  onBlur={(e) => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none' }}
                />
                <Search size={14} className="absolute left-3 top-3" style={{ color: 'var(--ink-ghost)' }} />
              </div>
            </div>

            {/* Division filter pills */}
            <div className="flex flex-wrap gap-2 mb-5">
              {[
                { id: null, label: 'Tất cả', count: miniwebs.length },
                ...(['FS', 'UTI', 'MDS', 'DLS', 'SP', 'BMC', 'GPD'] as const).map(d => ({
                  id: d as string,
                  label: d,
                  count: miniwebs.filter(m => m.division === d).length,
                })).filter(d => d.count > 0),
              ].map(tab => (
                <button
                  key={tab.label}
                  onClick={() => setMiniWebDivision(tab.id)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5"
                  style={miniWebDivision === tab.id ? {
                    background: 'var(--ink)',
                    color: '#fff',
                  } : {
                    background: 'var(--bg-panel)',
                    color: 'var(--ink-2)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {tab.label}
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full"
                    style={miniWebDivision === tab.id ? {
                      background: 'rgba(255,255,255,0.2)',
                      color: '#fff',
                    } : {
                      background: '#F1F5F9',
                      color: 'var(--ink-3)',
                    }}
                  >
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Status legend */}
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--ink-3)' }}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Live
              </span>
              <span className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--ink-3)' }}>
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Monitor
              </span>
              <span className="flex items-center gap-1.5 text-[10px]" style={{ color: 'var(--ink-3)' }}>
                <span className="w-2 h-2 rounded-full bg-gray-400 inline-block" /> Stop
              </span>
            </div>

            {/* Mini Web Table */}
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ background: 'var(--bg-panel)', borderColor: 'var(--border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid var(--border)' }}>
                      <th className="text-left py-3 px-4 font-bold" style={{ color: 'var(--ink-2)' }}>Division</th>
                      <th className="text-left py-3 px-4 font-bold" style={{ color: 'var(--ink-2)' }}>Service Name</th>
                      <th className="text-left py-3 px-4 font-bold hidden sm:table-cell" style={{ color: 'var(--ink-2)' }}>Product</th>
                      <th className="text-left py-3 px-4 font-bold hidden md:table-cell" style={{ color: 'var(--ink-2)' }}>Page Type</th>
                      <th className="text-center py-3 px-4 font-bold" style={{ color: 'var(--ink-2)' }}>Status</th>
                      <th className="text-center py-3 px-4 font-bold" style={{ color: 'var(--ink-2)' }}>URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {miniwebs
                      .filter(m => miniWebDivision ? m.division === miniWebDivision : true)
                      .filter(m => {
                        if (!miniWebSearch) return true
                        const q = miniWebSearch.toLowerCase()
                        return m.serviceName.toLowerCase().includes(q) ||
                          m.product.toLowerCase().includes(q) ||
                          m.useCase.toLowerCase().includes(q) ||
                          m.division.toLowerCase().includes(q)
                      })
                      .map((m, i) => {
                        const dc = divisionColors[m.division] || { bg: '#F1F5F9', text: 'var(--ink-3)' }
                        const statusColor = m.status === 'Live' ? '#10B981' : m.status === 'Monitor' ? '#F59E0B' : '#9CA3AF'
                        return (
                          <tr
                            key={i}
                            className="transition-colors hover:bg-gray-50"
                            style={{ borderBottom: '1px solid var(--border)' }}
                          >
                            <td className="py-2.5 px-4">
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                                style={{ background: dc.bg, color: dc.text }}
                              >
                                {m.division}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 font-semibold" style={{ color: 'var(--ink)' }}>
                              {m.serviceName}
                            </td>
                            <td className="py-2.5 px-4 hidden sm:table-cell" style={{ color: 'var(--ink-3)' }}>
                              {m.useCase}
                            </td>
                            <td className="py-2.5 px-4 hidden md:table-cell">
                              <span
                                className="text-[10px] font-medium px-2 py-0.5 rounded-md"
                                style={{ background: '#F1F5F9', color: 'var(--ink-3)' }}
                              >
                                {m.pageType}
                              </span>
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <span
                                className="w-2 h-2 rounded-full inline-block"
                                style={{ background: statusColor }}
                                title={m.status}
                              />
                            </td>
                            <td className="py-2.5 px-4 text-center">
                              <a
                                href={m.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-6 h-6 rounded-md transition-colors hover:bg-gray-100"
                                style={{ color: 'var(--ink-3)' }}
                              >
                                <ExternalLink size={12} />
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
