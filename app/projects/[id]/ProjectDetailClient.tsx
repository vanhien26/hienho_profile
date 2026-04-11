'use client'
import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import Link from 'next/link'
import { Project } from '../../data/projects'
import { Menu, Home, FileText, Lightbulb, Edit, Save, X } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useForm } from 'react-hook-form'

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

function parseMetricValue(value: string): number {
  // Remove non-numeric characters and parse
  const num = parseFloat(value.replace(/[^\d.]/g, ''))
  return isNaN(num) ? 0 : num
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
  const [isEditing, setIsEditing] = useState(false)
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
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
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
                    
                    <input
                      {...register('tags')}
                      className="w-full px-3 py-2 border rounded text-sm"
                      placeholder="Tags (comma separated)"
                    />
                    
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
                    <h1 className="text-sm font-black truncate" style={{ color: 'var(--ink)' }}>
                      {project.title}
                    </h1>
                    <code className="text-[10px] font-mono" style={{ color: 'var(--ink-3)' }}>
                      {project.subtitle}
                    </code>
                  </>
                )}
              </div>
              
              {!isEditing && (
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
              )}
              
              {!isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-3 py-2 bg-blue-500 text-white rounded text-sm flex items-center gap-1 hover:bg-blue-600"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  
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
                  {project.metrics && project.metrics.length > 1 && (
                    <div className="sm:ml-auto mt-2 sm:mt-0">
                      <ResponsiveContainer width="100%" height={80}>
                        <BarChart data={project.metrics.map(m => ({ name: m.label, value: parseMetricValue(m.value) }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" fontSize={10} />
                          <YAxis fontSize={10} />
                          <Tooltip />
                          <Bar dataKey="value" fill="#AE2070" />
                        </BarChart>
                      </ResponsiveContainer>
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
