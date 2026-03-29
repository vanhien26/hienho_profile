'use client'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Link from 'next/link'
import { Project } from '../../data/projects'
import { Menu, Home, FileText, Lightbulb } from 'lucide-react'

const tagColors: Record<string, string[]> = {
  SEO: ['#E6EEFF', '#1848B8'],
  Credit: ['#F5E0EC', '#AE2070'],
  Insurance: ['#EDE8FF', '#4B1DB8'],
  BNPL: ['#F5E0EC', '#AE2070'],
  GEO: ['#EDE8FF', '#4B1DB8'],
  PLG: ['#E0F5EA', '#00663A'],
  JTBD: ['#FFF3DC', '#8B5800'],
  Framework: ['#F0EDE8', '#8C7D74'],
  pSEO: ['#E6EEFF', '#1848B8'],
  IA: ['#E6EEFF', '#1848B8'],
  Schema: ['#F5E0EC', '#AE2070'],
  Directory: ['#E0F5EA', '#00663A'],
  'Content Clusters': ['#E6EEFF', '#1848B8'],
  'Link Building': ['#FFF3DC', '#8B5800'],
  'Internal Linking': ['#F5E0EC', '#AE2070'],
  'Content Architecture': ['#E6EEFF', '#1848B8'],
  'Auto Insurance': ['#EDE8FF', '#4B1DB8'],
  'Template System': ['#F0EDE8', '#8C7D74'],
  'AI Overview': ['#EDE8FF', '#4B1DB8'],
  SGE: ['#EDE8FF', '#4B1DB8'],
  'Multi-product': ['#E0F5EA', '#00663A'],
  'Search Intent': ['#FFF3DC', '#8B5800'],
  'Deep Link': ['#E0F5EA', '#00663A'],
  CTA: ['#F5E0EC', '#AE2070'],
  'Credit Ecosystem': ['#F5E0EC', '#AE2070'],
  default: ['#F0EDE8', '#8C7D74'],
}

function getTagColors(tag: string): string[] {
  return tagColors[tag] || tagColors['default']
}

function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 left-4 z-30 flex items-center justify-center w-10 h-10 rounded-lg"
      style={{ background: '#18120E', boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}
    >
      <Menu size={18} color="white" />
    </button>
  )
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} alwaysOverlay />
      <HamburgerButton onClick={() => setSidebarOpen(true)} />

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Breadcrumb bar */}
        <div
          className="flex items-center gap-2 sm:gap-3 pl-16 pr-4 sm:pr-8 py-3.5 flex-shrink-0 overflow-x-auto"
          style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border)' }}
        >
          <Link
            href="/"
            className="text-xs font-medium flex items-center gap-1.5 hover:opacity-70 transition-opacity flex-shrink-0"
            style={{ color: 'var(--ink-3)' }}
          >
            <Home size={12} /> Home
          </Link>
          <span style={{ color: 'var(--border)' }} className="flex-shrink-0">/</span>
          <span className="text-xs font-medium flex-shrink-0 hidden sm:inline" style={{ color: 'var(--ink-3)' }}>
            {project.category === 'use-case' ? 'Use Case Document' : 'Knowledge & Guideline'}
          </span>
          <span style={{ color: 'var(--border)' }} className="flex-shrink-0 hidden sm:inline">/</span>
          <span className="text-xs font-semibold truncate" style={{ color: 'var(--ink)' }}>
            {project.title}
          </span>

          <div className="ml-auto flex items-center gap-3 flex-shrink-0">
            {project.division && (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#F5E0EC', color: '#AE2070' }}
              >
                {project.division}
              </span>
            )}
            <span className="text-[10px] hidden sm:inline" style={{ color: 'var(--ink-3)' }}>
              Updated {new Date(project.updatedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        {project.htmlFile ? (
          <div className="flex-1 flex flex-col">
            {/* Meta bar */}
            <div
              className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-4 sm:px-8 py-3 flex-shrink-0"
              style={{ background: '#F6F3EF', borderBottom: '1px solid var(--border)' }}
            >
              <div className="min-w-0">
                <h1 className="text-sm font-black truncate" style={{ color: 'var(--ink)' }}>
                  {project.title}
                </h1>
                <code className="text-[10px] font-mono" style={{ color: 'var(--ink-3)' }}>
                  {project.subtitle}
                </code>
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {project.tags.map(t => {
                  const [bg, color] = getTagColors(t)
                  return (
                    <span
                      key={t}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: bg, color }}
                    >
                      {t}
                    </span>
                  )
                })}
              </div>
              {project.metrics && (
                <div className="sm:ml-auto flex gap-4 sm:gap-6">
                  {project.metrics.map(m => (
                    <div key={m.label} className="text-center">
                      <div className="text-base font-black" style={{ color: '#AE2070' }}>
                        {m.value}
                      </div>
                      <div className="text-[9px]" style={{ color: 'var(--ink-3)' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Full HTML document in iframe with Loading state */}
            <div className="flex-1 relative">
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 transition-opacity duration-300">
                  <div className="w-10 h-10 border-4 border-[#F5E0EC] border-t-[#AE2070] rounded-full animate-spin mb-4" />
                  <p className="text-[10px] font-bold tracking-widest text-[#8C7D74] uppercase animate-pulse">
                    Đang tải tài liệu chiến lược
                  </p>
                </div>
              )}
              <iframe
                src={project.htmlFile}
                onLoad={() => setLoading(false)}
                className="w-full h-full border-0"
                style={{ minHeight: 'calc(100vh - 116px)' }}
                title={project.title}
              />
            </div>
          </div>
        ) : (
          /* Placeholder for projects without HTML file yet */
          <div
            className="flex-1 flex flex-col items-center justify-center px-4 sm:px-12 py-12 sm:py-16"
            style={{ background: 'var(--bg)' }}
          >
            <div
              className="max-w-lg w-full rounded-2xl p-6 sm:p-10 text-center"
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              }}
            >
              <div className="flex justify-center mb-5">
                <FileText size={48} style={{ color: 'var(--ink-3)' }} strokeWidth={1} />
              </div>
              <h1 className="text-xl font-black mb-1" style={{ color: 'var(--ink)' }}>
                {project.title}
              </h1>
              <code className="text-xs font-mono" style={{ color: 'var(--ink-3)' }}>
                {project.subtitle}
              </code>

              <p className="text-sm mt-4 leading-relaxed" style={{ color: 'var(--ink-2)' }}>
                {project.description}
              </p>

              {project.metrics && (
                <div
                  className="flex justify-center gap-6 sm:gap-8 mt-6 pt-5 flex-wrap"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  {project.metrics.map(m => (
                    <div key={m.label}>
                      <div className="text-2xl font-black" style={{ color: '#AE2070' }}>
                        {m.value}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: 'var(--ink-3)' }}>
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap justify-center gap-2 mt-5">
                {project.tags.map(t => {
                  const [bg, color] = getTagColors(t)
                  return (
                    <span
                      key={t}
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: bg, color }}
                    >
                      {t}
                    </span>
                  )
                })}
              </div>

              <div
                className="mt-8 px-5 py-3 rounded-xl text-xs font-medium text-left flex items-start gap-2"
                style={{ background: '#FFF3DC', color: '#8B5800' }}
              >
                <Lightbulb size={14} className="flex-shrink-0 mt-0.5" />
                <span><strong>Chưa có tài liệu HTML.</strong> Gửi file HTML cho dự án này để hiển thị nội dung chi tiết tại đây.</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
