'use client'
import { useState, useEffect, FormEvent } from 'react'
import Sidebar from '../components/Sidebar'
import { useForm, useFieldArray } from 'react-hook-form'
import { Menu, Plus, X, Save } from 'lucide-react'

interface NewProjectForm {
  id: string
  title: string
  subtitle: string
  category: 'use-case' | 'knowledge'
  division?: string
  tags: { value: string }[]
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

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<NewProjectForm>({
    defaultValues: {
      category: 'use-case',
      status: 'draft',
      tags: [{ value: '' }],
      metrics: [{ label: '', value: '' }]
    }
  })

  const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
    control,
    name: 'tags'
  })

  const { fields: metricFields, append: appendMetric, remove: removeMetric } = useFieldArray({
    control,
    name: 'metrics'
  })

  const onSubmit = (data: NewProjectForm) => {
    // Clean up data
    const cleanedData = {
      ...data,
      tags: data.tags.map(t => t.value).filter(tag => tag.trim()),
      metrics: data.metrics.filter(m => m.label.trim() && m.value.trim()),
      updatedAt: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    }

    console.log('New Project Data:', cleanedData)
    alert('Project data logged to console. In production, this would be saved to backend/database.')

    // Reset form
    reset()
  }

  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (codeInput === '2026') {
      localStorage.setItem('newProjectAuth', JSON.stringify({ timestamp: Date.now() }))
      setHasAccess(true)
      setAuthError('')
    } else {
      setAuthError('Mã code không đúng. Vui lòng thử lại.')
    }
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-3">Truy cập New Project</h1>
          <p className="text-sm text-gray-600 mb-4">Nhập mã truy cập để vào trang tạo dự án. Liên hệ quản trị để lấy mã.</p>
          <form onSubmit={handleCodeSubmit} className="space-y-4">
            <input
              type="password"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
              placeholder="Nhập mã code"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {authError && <p className="text-red-500 text-sm">{authError}</p>}
            <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Xác nhận
            </button>
          </form>
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
                {tagFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2">
                    <input
                      {...register(`tags.${index}.value`)}
                      className="flex-1 px-3 py-2 border rounded-lg text-sm"
                      placeholder="Tag name"
                    />
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendTag({ value: '' })}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm flex items-center gap-2"
                >
                  <Plus size={14} /> Add Tag
                </button>
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