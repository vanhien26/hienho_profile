'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Sidebar from '../../components/Sidebar'
import { projects, Project } from '../../data/projects'
import { Menu, Tag, Plus, X, ArrowLeft, Save } from 'lucide-react'

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

export default function AdminTagsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [authError, setAuthError] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState('')

  useEffect(() => {
    const persistedTags = localStorage.getItem('adminTags')
    const initialTags = Array.from(new Set(projects.flatMap((project: Project) => project.tags))).sort((a, b) => a.localeCompare(b))

    if (persistedTags) {
      try {
        const parsed = JSON.parse(persistedTags)
        if (Array.isArray(parsed) && parsed.every((item: unknown) => typeof item === 'string')) {
          setTags(parsed)
          return
        }
      } catch {
        // ignore invalid persisted data
      }
    }

    setTags(initialTags)
  }, [])

  const persistTags = (nextTags: string[]) => {
    setTags(nextTags)
    localStorage.setItem('adminTags', JSON.stringify(nextTags))
  }

  const handleAddTag = () => {
    const tag = newTag.trim()
    if (!tag) return
    if (tags.includes(tag)) {
      setAuthError('Tag đã tồn tại.')
      return
    }
    persistTags([...tags, tag])
    setNewTag('')
    setAuthError('')
  }

  const handleEditTag = (index: number) => {
    setEditingIndex(index)
    setEditingValue(tags[index])
    setAuthError('')
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditingValue('')
    setAuthError('')
  }

  const handleSaveEdit = () => {
    if (editingIndex === null) return
    const tag = editingValue.trim()
    if (!tag) {
      setAuthError('Tag không được để trống.')
      return
    }
    if (tags.some((item, idx) => item === tag && idx !== editingIndex)) {
      setAuthError('Tag đã tồn tại.')
      return
    }
    const nextTags = [...tags]
    nextTags[editingIndex] = tag
    persistTags(nextTags)
    setEditingIndex(null)
    setEditingValue('')
    setAuthError('')
  }

  const handleDeleteTag = (index: number) => {
    const nextTags = tags.filter((_, idx) => idx !== index)
    persistTags(nextTags)
    if (editingIndex === index) {
      setEditingIndex(null)
      setEditingValue('')
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F9F2F7]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#E4DDD6] px-6 sm:px-10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#18120E]">Tag Management</h1>
            <p className="text-sm text-[#8C7D74] mt-2">Chỉnh sâu tag dùng chung cho Use Case và Knowledge.</p>
          </div>
          <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-[#E4DDD6] px-4 py-2 text-sm font-semibold text-[#5B3A53] hover:bg-[#F3E6F5] transition">
            <ArrowLeft size={16} /> Quay lại Admin
          </Link>
        </div>

        <div className="px-6 sm:px-10 py-8 space-y-8">
          <div className="rounded-3xl border border-[#E9D6E3] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-[#18120E]">Danh sách tag</h2>
                <p className="text-sm text-[#6B4D60]">Sửa, xóa hoặc thêm mới tag dùng chung cho toàn bộ tài liệu.</p>
              </div>
              <div className="text-sm font-semibold text-[#5B3A53]">{tags.length} tags</div>
            </div>

            <div className="space-y-3">
              {tags.map((tag, index) => {
                const isEditing = editingIndex === index
                return (
                  <div key={`${tag}-${index}`} className="flex flex-col gap-3 rounded-3xl border border-[#EAD6E6] bg-[#FEF3F8] p-4 md:flex-row md:items-center md:justify-between">
                    {isEditing ? (
                      <input
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                        className="w-full rounded-2xl border border-[#E3C7D4] bg-white px-3 py-2 text-sm md:max-w-lg"
                      />
                    ) : (
                      <div className="flex items-center gap-3 text-sm font-semibold text-[#7E3A56]">
                        <Tag size={16} className="text-[#AE2070]" />
                        <span>{tag}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      {isEditing ? (
                        <>
                          <button
                            type="button"
                            onClick={handleSaveEdit}
                            className="inline-flex items-center gap-2 rounded-2xl bg-[#AE2070] px-4 py-2 text-xs font-semibold text-white hover:bg-[#C84C8C] transition"
                          >
                            <Save size={14} /> Save
                          </button>
                          <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="inline-flex items-center gap-2 rounded-2xl border border-[#D1B6C7] bg-white px-4 py-2 text-xs font-semibold text-[#5B3A53] hover:bg-[#F8F0F5] transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleEditTag(index)}
                            className="inline-flex items-center gap-2 rounded-2xl bg-[#F3E6F3] px-4 py-2 text-xs font-semibold text-[#5B3A53] hover:bg-[#EAD4E6] transition"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteTag(index)}
                            className="inline-flex items-center gap-2 rounded-2xl bg-[#FCE7F3] px-4 py-2 text-xs font-semibold text-[#A82B5B] hover:bg-[#F6D0E0] transition"
                          >
                            <X size={14} /> Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-[#E9D6E3] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Plus size={20} className="text-[#AE2070]" />
              <h2 className="text-lg font-bold text-[#18120E]">Thêm tag mới</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Nhập tên tag"
                className="flex-1 rounded-2xl border border-[#E5D0DD] bg-[#FAF4FB] px-4 py-3 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="inline-flex items-center gap-2 rounded-2xl bg-[#AE2070] px-5 py-3 text-sm font-semibold text-white hover:bg-[#C84C8C] transition"
              >
                Add Tag
              </button>
            </div>
            {authError && <p className="mt-3 text-sm text-[#D92D3B]">{authError}</p>}
          </div>
        </div>
      </div>
      <HamburgerButton onClick={() => setSidebarOpen(true)} />
    </div>
  )
}
