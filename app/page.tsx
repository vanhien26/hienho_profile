'use client'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Link from 'next/link'
import { projects } from './data/projects'
import { tagStyle } from './data/tags'
import { Menu, Phone, Mail, MessageCircle, FileText, BookOpen } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  },
}

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeDivision, setActiveDivision] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
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

        {/* Content area */}
        <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-10">

          {/* Use Case Section Header with Filter & Search */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#F5E0EC' }}>
                  <FileText size={16} style={{ color: '#AE2070' }} />
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

              {/* Global Search Bar */}
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Tìm kiếm chiến lược..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E4DDD6] rounded-xl text-xs focus:ring-2 focus:ring-[#AE2070]/20 focus:border-[#AE2070] transition-all outline-none"
                />
                <svg
                  className="absolute left-3 top-2.5 w-4 h-4 text-[#8C7D74]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Division Filter (Card style from user image) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div
                className="inline-flex items-center p-1 rounded-2xl relative"
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
                    className="flex flex-col items-center justify-center min-w-[72px] sm:min-w-[84px] py-2.5 rounded-xl transition-all duration-200 relative z-10"
                    style={{ opacity: activeDivision === div.id ? 1 : 0.4 }}
                  >
                    {activeDivision === div.id && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-white/10 rounded-xl"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span
                      className={`text-xl sm:text-2xl font-black leading-none relative z-10 ${activeDivision === div.id ? 'text-white' : 'text-white/90'}`}
                    >
                      {div.count}
                    </span>
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold tracking-widest mt-1.5 relative z-10 ${activeDivision === div.id ? 'text-white/80' : 'text-white/30'}`}
                    >
                      {div.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeDivision || 'all'}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredUseCases.map(p => {
                  return (
                    <motion.div
                      key={p.id}
                      layout
                      variants={cardVariants}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Link href={`/projects/${p.id}`} className="block group">
                        <div
                          className="rounded-xl p-5 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1.5 group-hover:border-[#AE2070]/30 border border-[#E4DDD6]"
                          style={{
                            background: '#FFFFFF',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            {p.division && (
                              <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded"
                                style={{ background: '#F5E0EC', color: '#AE2070' }}
                              >
                                {p.division}
                              </span>
                            )}
                            <span className="text-[10px]" style={{ color: 'var(--ink-3)' }}>
                              {new Date(p.updatedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                            </span>
                          </div>

                          <h3
                            className="font-bold text-sm leading-snug mb-1 group-hover:text-[#AE2070] transition-colors"
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
                                  <div className="text-sm font-black transition-colors" style={{ color: '#AE2070' }}>{m.value}</div>
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
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Knowledge Section */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#EDE8FF' }}>
                <BookOpen size={16} style={{ color: '#4B1DB8' }} />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-tight" style={{ color: 'var(--ink)' }}>
                  Knowledge & Guideline
                </h2>
                <p className="text-xs" style={{ color: 'var(--ink-3)' }}>
                  Framework và Playbook áp dụng cross-sale
                </p>
              </div>
              <span
                className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#EDE8FF', color: '#4B1DB8' }}
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
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredKnowledge.map(p => {
                return (
                  <motion.div key={p.id} variants={cardVariants}>
                    <Link href={`/projects/${p.id}`} className="block group">
                      <div
                        className="rounded-xl p-5 transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1.5 group-hover:border-[#4B1DB8]/30 border border-[#E4DDD6]"
                        style={{
                          background: '#FFFFFF',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        }}
                      >
                        <div className="flex items-end justify-end mb-3">
                          <span className="text-[10px]" style={{ color: 'var(--ink-3)' }}>
                            {new Date(p.updatedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit' })}
                          </span>
                        </div>

                        <h3
                          className="font-bold text-sm leading-snug mb-1 group-hover:text-[#4B1DB8] transition-colors"
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
