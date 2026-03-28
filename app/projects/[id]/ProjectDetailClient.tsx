'use client'
import Sidebar from '../../components/Sidebar'
import Link from 'next/link'
import { Project } from '../../data/projects'

const statusStyle: Record<string, { bg: string; text: string; label: string }> = {
  live: { bg: '#E0F5EA', text: '#00663A', label: 'LIVE' },
  review: { bg: '#FFF3DC', text: '#8B5800', label: 'REVIEW' },
  draft: { bg: '#F0EDE8', text: '#8C7D74', label: 'DRAFT' },
}

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

export default function ProjectDetailClient({ project }: { project: Project }) {
  const s = statusStyle[project.status]

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Breadcrumb bar */}
        <div
          className="flex items-center gap-3 px-8 py-3.5 flex-shrink-0"
          style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border)' }}
        >
          <Link
            href="/"
            className="text-xs font-medium flex items-center gap-1.5 hover:opacity-70 transition-opacity"
            style={{ color: 'var(--ink-3)' }}
          >
            <span>🏠</span> Home
          </Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-xs font-medium" style={{ color: 'var(--ink-3)' }}>
            {project.category === 'use-case' ? 'Use Case Document' : 'Knowledge & Guideline'}
          </span>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="text-xs font-semibold truncate max-w-xs" style={{ color: 'var(--ink)' }}>
            {project.title}
          </span>

          <div className="ml-auto flex items-center gap-3">
            <span
              className="text-[10px] font-bold px-2.5 py-1 rounded-full"
              style={{ background: s.bg, color: s.text }}
            >
              {s.label}
            </span>
            <span className="text-[10px]" style={{ color: 'var(--ink-3)' }}>
              Updated {new Date(project.updatedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        {project.htmlFile ? (
          <div className="flex-1 flex flex-col">
            {/* Meta bar */}
            <div
              className="flex items-center gap-4 px-8 py-3 flex-shrink-0"
              style={{ background: '#F6F3EF', borderBottom: '1px solid var(--border)' }}
            >
              <div>
                <h1 className="text-sm font-black" style={{ color: 'var(--ink)' }}>
                  {project.title}
                </h1>
                <code className="text-[10px] font-mono" style={{ color: 'var(--ink-3)' }}>
                  {project.subtitle}
                </code>
              </div>
              <div className="flex gap-1.5 ml-4 flex-wrap">
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
                <div className="ml-auto flex gap-6">
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

            {/* Full HTML document in iframe */}
            <iframe
              src={project.htmlFile}
              className="flex-1 w-full border-0"
              style={{ minHeight: 'calc(100vh - 116px)' }}
              title={project.title}
            />
          </div>
        ) : (
          /* Placeholder for projects without HTML file yet */
          <div
            className="flex-1 flex flex-col items-center justify-center px-12 py-16"
            style={{ background: 'var(--bg)' }}
          >
            <div
              className="max-w-lg w-full rounded-2xl p-10 text-center"
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--border)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
              }}
            >
              <div className="text-5xl mb-5">📄</div>
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
                  className="flex justify-center gap-8 mt-6 pt-5"
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
                className="mt-8 px-5 py-3 rounded-xl text-xs font-medium text-left"
                style={{ background: '#FFF3DC', color: '#8B5800' }}
              >
                💡 <strong>Chưa có tài liệu HTML.</strong> Gửi file HTML cho dự án này để hiển thị nội dung chi tiết tại đây.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
