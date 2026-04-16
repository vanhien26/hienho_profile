'use client'
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Link from 'next/link'
import { Project } from '../../data/projects'
import { Home, FileText, Lightbulb, Edit, Save, X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSidebar } from '../../context/sidebar'

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
  const { open: sidebarOpen, setOpen: setSidebarOpen } = useSidebar()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminAccess'))
  }, [])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      tags: project.tags.join(', '),
      status: project.status,
    }
  })

  const onSubmit = (data: any) => {
    // For now, just log - in real app, save to backend
    console.log('Updated project:', data)
    setIsEditing(false)
    // Could update local state or refetch
  }

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} alwaysOverlay />

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Breadcrumb bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 px-4 sm:px-6 lg:px-8 py-3.5 flex-shrink-0"
          style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border)' }}
        >
          {/* Breadcrumb items with horizontal scroll on mobile */}
          <div className="overflow-x-auto flex items-center gap-2 flex-shrink-0 scrollbar-hide">
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
            <span className="text-xs font-semibold flex-shrink-0" style={{ color: 'var(--ink)' }}>
              {project.title}
            </span>
          </div>

          {/* Division badge and date - centered on mobile, right-aligned on tablet+ */}
          <div className="flex items-center justify-center sm:justify-end gap-3 flex-shrink-0 sm:ml-auto">
            {project.division && (
              <span
                className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                style={{ background: '#F5E0EC', color: '#AE2070' }}
              >
                {project.division}
              </span>
            )}
            <span className="text-[10px]" style={{ color: 'var(--ink-3)' }}>
              Updated {new Date(project.updatedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        </div>

        {project.htmlFile ? (
          <div className="flex-1 flex flex-col">
            {/* Meta bar */}
            <div
              className="px-4 sm:px-6 lg:px-8 py-4 sm:py-3 flex-shrink-0"
              style={{ background: '#F6F3EF', borderBottom: '1px solid var(--border)' }}
            >
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-1">
                  <input
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-3 py-2 border rounded text-sm"
                    placeholder="Project title"
                  />
                  {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                  <input
                    {...register('subtitle')}
                    className="w-full px-3 py-2 border rounded text-sm"
                    placeholder="Subtitle"
                  />
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="w-full px-3 py-2 border rounded text-sm"
                    rows={2}
                    placeholder="Description"
                  />
                  {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tags <span className="text-gray-400">(phân cách bằng dấu phẩy)</span></label>
                    <input
                      {...register('tags')}
                      className="w-full px-3 py-2 border rounded text-sm"
                      placeholder="SEO, GEO, Content Architecture"
                    />
                  </div>
                  <select {...register('status')} className="w-full px-3 py-2 border rounded text-sm">
                    <option value="live">Live</option>
                    <option value="review">Review</option>
                    <option value="draft">Draft</option>
                  </select>
                  <div className="flex gap-2">
                    <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded text-sm flex items-center gap-1">
                      <Save size={14} /> Save
                    </button>
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded text-sm flex items-center gap-1">
                      <X size={14} /> Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  {/* Main content area - responsive layout */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 min-w-0">
                    {/* Title and subtitle section - full width on mobile, auto on tablet+ */}
                    <div className="min-w-0 flex-1">
                      <h1 className="text-sm font-black leading-tight" style={{ color: 'var(--ink)' }}>
                        {project.title}
                      </h1>
                      <code className="text-xs font-mono block mt-0.5" style={{ color: 'var(--ink-3)' }}>
                        {project.subtitle}
                      </code>
                    </div>

                    {/* Metrics and edit button - right-aligned on tablet+ */}
                    {project.metrics && (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-shrink-0">
                        {/* Desktop metrics - horizontal layout */}
                        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                          {project.metrics.map(m => (
                            <div key={m.label} className="text-center">
                              <div className="text-sm font-black leading-tight" style={{ color: '#AE2070' }}>{m.value}</div>
                              <div className="text-[9px] leading-tight" style={{ color: 'var(--ink-3)' }}>{m.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Mobile metrics pills */}
                        <div className="flex gap-1.5 sm:hidden">
                          {project.metrics.map(m => (
                            <span key={m.label} className="text-[10px] font-black px-1.5 py-0.5 rounded-md" style={{ background: '#FFEFF4', color: '#AE2070' }}>
                              {m.value}
                            </span>
                          ))}
                        </div>

                        {/* Edit button - hidden on mobile, visible on tablet+ */}
                        {isAdmin && (
                          <button
                            onClick={() => setIsEditing(true)}
                            className="hidden sm:flex flex-shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-blue-600"
                            style={{ background: '#3B82F6', color: '#fff' }}
                          >
                            <Edit size={13} />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>
                    )}

                    {/* Edit button for mobile - if no metrics */}
                    {!project.metrics && isAdmin && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="hidden sm:flex flex-shrink-0 items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-blue-600"
                        style={{ background: '#3B82F6', color: '#fff' }}
                      >
                        <Edit size={13} />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>

                  {/* Row 3: tags — horizontal scroll on mobile, wrap on tablet+ */}
                  {project.tags.length > 0 && (
                    <div className="flex gap-1.5 mt-3 sm:mt-2 overflow-x-auto pb-0.5 sm:overflow-x-visible sm:flex-wrap sm:pb-0 scrollbar-hide">
                      {project.tags.map(t => {
                        const [bg, color] = getTagColors(t)
                        return (
                          <span
                            key={t}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap sm:whitespace-normal flex-shrink-0 sm:flex-shrink"
                            style={{ background: bg, color }}
                          >
                            {t}
                          </span>
                        )
                      })}
                    </div>
                  )}
                </>
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
