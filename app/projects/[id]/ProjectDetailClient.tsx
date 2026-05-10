'use client'
import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import Link from 'next/link'
import { Project } from '../../data/projects'
import { Home, FileText, BookOpen, Lightbulb, Edit, Save, X, Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useSidebar } from '../../context/sidebar'

const divisionColors: Record<string, { bg: string; text: string }> = {
  FS:  { bg: '#FFEFF4', text: '#A50064' },
  UTI: { bg: '#E0F2FE', text: '#0284C7' },
  OTA: { bg: '#DCFCE7', text: '#16A34A' },
  GPD: { bg: '#F9AFB5', text: '#E5303F' },
}

const tagColors: Record<string, string[]> = {
  SEO: ['#E6EEFF', '#1848B8'],
  Credit: ['#F0EEE6', 'var(--clay)'],
  Insurance: ['#EDE8FF', '#4B1DB8'],
  BNPL: ['#F0EEE6', 'var(--clay)'],
  GEO: ['#EDE8FF', '#4B1DB8'],
  PLG: ['#E0F5EA', '#00663A'],
  JTBD: ['#FFF3DC', '#8B5800'],
  Framework: ['#F0EDE8', '#8C7D74'],
  pSEO: ['#E6EEFF', '#1848B8'],
  IA: ['#E6EEFF', '#1848B8'],
  Schema: ['#F0EEE6', 'var(--clay)'],
  Directory: ['#E0F5EA', '#00663A'],
  'Content Clusters': ['#E6EEFF', '#1848B8'],
  'Link Building': ['#FFF3DC', '#8B5800'],
  'Internal Linking': ['#F0EEE6', 'var(--clay)'],
  'Content Architecture': ['#E6EEFF', '#1848B8'],
  'Auto Insurance': ['#EDE8FF', '#4B1DB8'],
  'Template System': ['#F0EDE8', '#8C7D74'],
  'AI Overview': ['#EDE8FF', '#4B1DB8'],
  SGE: ['#EDE8FF', '#4B1DB8'],
  'Multi-product': ['#E0F5EA', '#00663A'],
  'Search Intent': ['#FFF3DC', '#8B5800'],
  'Deep Link': ['#E0F5EA', '#00663A'],
  CTA: ['#F0EEE6', 'var(--clay)'],
  'Credit Ecosystem': ['#F0EEE6', 'var(--clay)'],
  default: ['#F0EDE8', '#8C7D74'],
}

function getTagColors(tag: string): string[] {
  return tagColors[tag] || tagColors['default']
}

function MetaBar({ project, isEditing, setIsEditing, isAdmin, register, handleSubmit, errors, onSubmit }: {
  project: Project
  isEditing: boolean
  setIsEditing: (v: boolean) => void
  isAdmin: boolean
  register: any
  handleSubmit: any
  errors: any
  onSubmit: (data: any) => void
}) {
  const divColor = project.division ? divisionColors[project.division] : null

  if (isEditing) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0" style={{ background: 'var(--gray-100)', borderBottom: '1px solid var(--border)' }}>
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
          <div className="flex gap-2">
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded text-sm flex items-center gap-1">
              <Save size={14} strokeWidth={1.8} /> Save
            </button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-500 text-white rounded text-sm flex items-center gap-1">
              <X size={14} strokeWidth={1.8} /> Cancel
            </button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <div
      className="px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0"
      style={{ background: 'var(--gray-100)', borderBottom: '1px solid var(--border)' }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        {/* Left: badge + title + subtitle + description + tags */}
        <div className="min-w-0 flex-1">
          {/* Division + category badges */}
          <div className="flex items-center gap-2 mb-2">
            {divColor && (
              <span
                className="text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ background: divColor.bg, color: divColor.text }}
              >
                {project.division}
              </span>
            )}
            <span
              className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{ background: 'var(--gray-300)', color: 'var(--ink-3)' }}
            >
              {project.category === 'use-case'
                ? <FileText size={10} strokeWidth={1.8} />
                : <BookOpen size={10} strokeWidth={1.8} />}
              {project.category === 'use-case' ? 'Use Case' : 'Knowledge'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-base font-black leading-tight" style={{ color: 'var(--ink)' }}>
            {project.title}
          </h1>

          {/* Subtitle */}
          <code className="text-[10px] font-mono block mt-0.5" style={{ color: 'var(--ink-3)' }}>
            {project.subtitle}
          </code>

          {/* Description */}
          {project.description && (
            <p className="text-[11px] leading-relaxed mt-1.5 line-clamp-2" style={{ color: 'var(--ink-2)' }}>
              {project.description}
            </p>
          )}

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-0.5 sm:overflow-x-visible sm:flex-wrap sm:pb-0 scrollbar-hide">
              {project.tags.map(t => {
                const [bg, color] = getTagColors(t)
                return (
                  <span
                    key={t}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 sm:flex-shrink"
                    style={{ background: bg, color }}
                  >
                    {t}
                  </span>
                )
              })}
            </div>
          )}
        </div>

        {/* Right: metrics + edit */}
        <div className="flex items-start gap-4 flex-shrink-0">
          {project.metrics && (
            <div className="flex gap-5">
              {project.metrics.map(m => (
                <div key={m.label} className="text-center">
                  <div className="text-lg font-black leading-tight" style={{ color: 'var(--clay)' }}>{m.value}</div>
                  <div className="text-[9px] leading-snug mt-0.5" style={{ color: 'var(--ink-3)' }}>{m.label}</div>
                </div>
              ))}
            </div>
          )}
          {isAdmin && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:bg-blue-600"
              style={{ background: '#3B82F6', color: '#fff' }}
            >
              <Edit size={13} strokeWidth={1.8} />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectDetailClient({ project }: { project: Project }) {
  const { open: sidebarOpen, setOpen: setSidebarOpen } = useSidebar()
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    setIsAdmin(!!localStorage.getItem('adminAccess'))
  }, [])

  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setLoading(false), 5000)
    return () => clearTimeout(t)
  }, [loading])

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      title: project.title,
      subtitle: project.subtitle,
      description: project.description,
      tags: project.tags.join(', '),
    }
  })

  const onSubmit = (data: any) => {
    console.log('Updated project:', data)
    setIsEditing(false)
  }

  const divColor = project.division ? divisionColors[project.division] : null

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} alwaysOverlay />

      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Breadcrumb bar */}
        <div
          className="flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-8 py-3 flex-shrink-0"
          style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border)' }}
        >
          <div className="overflow-x-auto flex items-center gap-2 flex-shrink-0 scrollbar-hide">
            <Link
              href="/"
              className="text-xs font-medium flex items-center gap-1.5 hover:opacity-70 transition-opacity flex-shrink-0"
              style={{ color: 'var(--ink-3)' }}
            >
              <Home size={12} strokeWidth={1.8} /> Home
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

          <span className="inline-flex items-center gap-1 text-[10px] flex-shrink-0" style={{ color: 'var(--ink-3)' }}>
            <Calendar size={10} strokeWidth={1.8} />
            {new Date(project.updatedAt).toLocaleDateString('vi-VN')}
          </span>
        </div>

        {project.htmlFile ? (
          <div className="flex-1 flex flex-col">
            <MetaBar
              project={project}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isAdmin={isAdmin}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={onSubmit}
            />

            {/* iframe */}
            <div className="flex-1 relative">
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10 transition-opacity duration-300">
                  <div className="w-10 h-10 border-4 border-[#D1CFC5] border-t-[#202940] rounded-full animate-spin mb-4" />
                  <p className="text-[10px] font-bold tracking-widest text-[#8C7D74] uppercase animate-pulse">
                    Đang tải tài liệu chiến lược
                  </p>
                </div>
              )}
              <iframe
                src={project.htmlFile}
                onLoad={() => setLoading(false)}
                onError={() => setLoading(false)}
                className="w-full h-full border-0"
                style={{ minHeight: 'calc(100vh - 116px)' }}
                title={project.title}
                sandbox="allow-same-origin allow-scripts"
              />
            </div>
          </div>
        ) : (
          /* No HTML — meta bar + centered placeholder */
          <div className="flex-1 flex flex-col" style={{ background: 'var(--bg)' }}>
            <MetaBar
              project={project}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              isAdmin={isAdmin}
              register={register}
              handleSubmit={handleSubmit}
              errors={errors}
              onSubmit={onSubmit}
            />

            <div className="flex-1 flex items-center justify-center px-4 sm:px-12 py-12">
              <div
                className="max-w-md w-full rounded-2xl p-8 text-center"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <div className="flex justify-center mb-4">
                  <FileText size={40} style={{ color: 'var(--ink-3)' }} strokeWidth={1.8} />
                </div>
                <h2 className="text-lg font-black mb-1" style={{ color: 'var(--ink)' }}>
                  Chưa có tài liệu
                </h2>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--ink-3)' }}>
                  File HTML cho <strong>{project.title}</strong> chưa được upload.
                </p>
                <div
                  className="mt-6 px-4 py-3 rounded-xl text-xs font-medium text-left flex items-start gap-2"
                  style={{ background: '#FFF3DC', color: '#8B5800' }}
                >
                  <Lightbulb size={13} strokeWidth={1.8} className="flex-shrink-0 mt-0.5" />
                  <span>Gửi file HTML cho dự án này để hiển thị nội dung chi tiết tại đây.</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
