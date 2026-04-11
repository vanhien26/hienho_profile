'use client'
import { useState, useEffect, FormEvent } from 'react'
import Sidebar from '../components/Sidebar'
import { projects } from '../data/projects'
import { useForm, useFieldArray } from 'react-hook-form'
import { Menu, Plus, X, Save } from 'lucide-react'

interface NewProjectForm {
  id: string
  title: string
  subtitle: string
  category: 'use-case' | 'knowledge'
  division?: string
  tags: string[]
  status: 'live' | 'draft' | 'review'
  description: string
  htmlFile?: string
  metrics: { label: string; value: string }[]
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

export default function NewProjectPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    const savedAuth = localStorage.getItem('newProjectAuth')
    if (savedAuth) {
      const { timestamp } = JSON.parse(savedAuth)
      const now = Date.now()
      const oneHour = 60 * 60 * 1000
      if (now - timestamp < oneHour) {
        setHasAccess(true)
      } else {
        localStorage.removeItem('newProjectAuth')
      }
    }
  }, [])

  const tagOptions = Array.from(new Set(projects.flatMap((project) => project.tags))).sort((a, b) => a.localeCompare(b))
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<NewProjectForm>({
    defaultValues: {
      category: 'use-case',
      status: 'draft',
      tags: [],
      metrics: [{ label: '', value: '' }]
    }
  })

  const { fields: metricFields, append: appendMetric, remove: removeMetric } = useFieldArray({
    control,
    name: 'metrics'
  })

  const toggleTag = (tag: string) => {
    setSelectedTags((current) =>
      current.includes(tag) ? current.filter((item) => item !== tag) : [...current, tag]
    )
  }

  const onSubmit = (data: NewProjectForm) => {
    // Clean up data
    const cleanedData = {
      ...data,
      tags: selectedTags,
      metrics: data.metrics.filter((m) => m.label.trim() && m.value.trim()),
      updatedAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    }

    console.log('New Project Data:', cleanedData)
    alert('Project data logged to console. In production, this would be saved to backend/database.')

    // Reset form
    reset()
    setSelectedTags([])
  }

  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (codeInput === '1507') {
      localStorage.setItem('newProjectAuth', JSON.stringify({ timestamp: Date.now() }))
      setHasAccess(true)
      setAuthError('')
    } else {
      setAuthError('Mã truy cập không đúng. Vui lòng nhập lại 4 chữ số.')
    }
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EBF5] px-4">
        <div className="w-full max-w-md bg-white rounded-[28px] border border-[#E6D5E0] shadow-[0_24px_80px_rgba(174,32,112,0.12)] overflow-hidden">
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #AE2070 0%, #D97706 100%)' }}>
            <h1 className="text-2xl font-black text-white tracking-tight">Truy cập New Project</h1>
            <p className="text-sm text-[#FFE6F0] mt-2">Mã truy cập là thông tin riêng tư của bạn. Nhập đúng 4 chữ số để mở quyền tạo dự án.</p>
          </div>

          <div className="px-8 py-8">
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <input
                type="password"
                value={codeInput}
                onChange={(e) => setCodeInput(e.target.value)}
                maxLength={4}
                placeholder="••••"
                className="w-full px-4 py-3 rounded-2xl border border-[#E5D0DD] bg-[#FCF4FA] text-lg tracking-[0.35em] text-center outline-none transition duration-200 focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
              />
              {authError && <p className="text-sm text-[#D92D3B]">{authError}</p>}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 bg-[#AE2070] text-white font-semibold shadow-[0_16px_32px_rgba(174,32,112,0.24)] hover:bg-[#C84C8C] transition"
              >
                Xác nhận mã
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full">
        <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <HamburgerButton onClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto w-full">
          {/* Header */}
          <div className="bg-white border-b border-[#E4DDD6] px-6 sm:px-10 py-6">
            <h1 className="text-2xl font-black tracking-tight text-[#18120E]">New Project Builder</h1>
            <p className="text-xs text-[#8C7D74] mt-1">Tạo dự án mới với form upload và metadata</p>
          </div>

          {/* Form */}
          <div className="px-6 sm:px-10 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#18120E]">Thông tin cơ bản</h2>

                <div>
                  <label className="block text-sm font-medium text-[#4A3F38] mb-1">Project ID *</label>
                  <input
                    {...register('id', { required: 'Project ID is required' })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="e.g., vay-nhanh"
                  />
                  {errors.id && <p className="text-red-500 text-xs mt-1">{errors.id.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A3F38] mb-1">Title *</label>
                  <input
                    {...register('title', { required: 'Title is required' })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="e.g., Vay Nhanh"
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A3F38] mb-1">Subtitle</label>
                  <input
                    {...register('subtitle')}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="e.g., momo.vn/vay-nhanh"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A3F38] mb-1">Description *</label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    rows={3}
                    placeholder="Project description..."
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
                </div>
              </div>

              {/* Category & Status */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#18120E]">Phân loại</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A3F38] mb-1">Category *</label>
                    <select {...register('category')} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="use-case">Use Case</option>
                      <option value="knowledge">Knowledge</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A3F38] mb-1">Status</label>
                    <select {...register('status')} className="w-full px-3 py-2 border rounded-lg text-sm">
                      <option value="draft">Draft</option>
                      <option value="review">Review</option>
                      <option value="live">Live</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#4A3F38] mb-1">Division</label>
                  <select {...register('division')} className="w-full px-3 py-2 border rounded-lg text-sm">
                    <option value="">None</option>
                    <option value="FS">FS (Finance)</option>
                    <option value="UTI">UTI (Utilities)</option>
                    <option value="OTA">OTA (Travel)</option>
                    <option value="MDS">MDS (Marketplace)</option>
                    <option value="PS">PS (Platform)</option>
                    <option value="SP">SP (P2P)</option>
                    <option value="GPD">GPD</option>
                    <option value="BMC">BMC</option>
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#18120E]">Tags</h2>
                <p className="text-sm text-[#6B4D60]">Chọn tag hiện có từ tất cả Use Case và Knowledge Document.</p>
                <div className="flex flex-wrap gap-2">
                  {tagOptions.map((tag) => {
                    const isActive = selectedTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-2 rounded-full text-sm transition ${isActive ? 'bg-[#AE2070] text-white' : 'bg-[#F3E6F3] text-[#5B3A52] hover:bg-[#E9D1E2]'}`}
                      >
                        {tag}
                      </button>
                    )
                  })}
                </div>
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 rounded-full bg-[#FCE7F3] px-3 py-1 text-xs font-semibold text-[#7E3A56]"
                      >
                        {tag}
                        <button type="button" onClick={() => toggleTag(tag)} className="text-[#7E3A56] hover:text-[#AE2070]">
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Metrics */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#18120E]">Metrics</h2>
                {metricFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      {...register(`metrics.${index}.label`)}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      placeholder="Metric label"
                    />
                    <input
                      {...register(`metrics.${index}.value`)}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      placeholder="Metric value"
                    />
                    <button
                      type="button"
                      onClick={() => removeMetric(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendMetric({ label: '', value: '' })}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-2"
                >
                  <Plus size={14} /> Add Metric
                </button>
              </div>

              {/* HTML File */}
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-[#18120E]">HTML Document</h2>
                <div>
                  <label className="block text-sm font-medium text-[#4A3F38] mb-1">HTML File Path</label>
                  <input
                    {...register('htmlFile')}
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    placeholder="e.g., /projects/new-project.html"
                  />
                  <p className="text-xs text-[#8C7D74] mt-1">
                    Upload HTML file to public/projects/ folder and enter the path here
                  </p>
                </div>
              </div>

              {/* Submit */}
              <div className="pt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-[#AE2070] text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#8B1658] transition-colors"
                >
                  <Save size={16} /> Create Project
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    )
}