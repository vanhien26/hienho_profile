'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Sidebar from '../components/Sidebar'
import { projects, Project } from '../data/projects'
import { Menu, Shield, LayoutDashboard, Tag, FileText } from 'lucide-react'

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

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const persistedTags = localStorage.getItem('adminTags')
    const initialTags = Array.from(new Set(projects.flatMap((project: Project) => project.tags))).sort((a, b) => a.localeCompare(b))

    if (persistedTags) {
      try {
        const parsed = JSON.parse(persistedTags)
        if (Array.isArray(parsed)) {
          setTags(parsed)
          return
        }
      } catch {
        // ignore invalid persisted data
      }
    }

    setTags(initialTags)
  }, [])

  return (
    <div className="flex min-h-screen w-full bg-[#F9F2F7]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#E4DDD6] px-6 sm:px-10 py-6">
          <h1 className="text-2xl font-black tracking-tight text-[#18120E]">Admin Backend</h1>
          <p className="text-sm text-[#8C7D74] mt-2">Quản trị New Projects, Tags và dữ liệu admin-only.</p>
        </div>

        <div className="px-6 sm:px-10 py-8 space-y-8">
          <div className="grid gap-5 md:grid-cols-4">
            <Link href="/admin/create" className="rounded-3xl border-2 border-[#202940] bg-[#202940] p-6 shadow-sm transition hover:opacity-90">
              <div className="flex items-center gap-3 mb-3">
                <FileText size={20} className="text-white" />
                <h2 className="text-lg font-bold text-white">Markdown → Doc</h2>
              </div>
              <p className="text-sm text-[#8A9AB5]">Viết Markdown → tự động render thành HTML document theo Klaus DS template.</p>
            </Link>

            <Link href="/new-project" className="rounded-3xl border border-[#E9D6E3] bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <LayoutDashboard size={20} className="text-[#AE2070]" />
                <h2 className="text-lg font-bold text-[#18120E]">Create New Project</h2>
              </div>
              <p className="text-sm text-[#6B4D60]">Mở form tạo mới dự án, upload document và cấu hình metadata.</p>
            </Link>

            <Link href="/admin/tags" className="rounded-3xl border border-[#E9D6E3] bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <Tag size={20} className="text-[#AE2070]" />
                <h2 className="text-lg font-bold text-[#18120E]">Tag Management</h2>
              </div>
              <p className="text-sm text-[#6B4D60] mb-4">Đi sâu vào quản lý tag: thêm, sửa, xóa và tối ưu metadata.</p>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 6).map((tag) => (
                  <span key={tag} className="rounded-full bg-[#FCE7F3] px-3 py-1 text-xs font-semibold text-[#7E3A56]">
                    {tag}
                  </span>
                ))}
                {tags.length > 6 && (
                  <span className="rounded-full bg-[#EAD6E6] px-3 py-1 text-xs font-semibold text-[#5B3A53]">
                    +{tags.length - 6} more
                  </span>
                )}
              </div>
            </Link>

            <Link href="/admin/use-cases" className="rounded-3xl border border-[#E9D6E3] bg-white p-6 shadow-sm transition hover:shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <FileText size={20} className="text-[#AE2070]" />
                <h2 className="text-lg font-bold text-[#18120E]">Use Case CRUD</h2>
              </div>
              <p className="text-sm text-[#6B4D60]">Quản lý danh sách Mini Web / Use Case: thêm, sửa, xóa dữ liệu.</p>
            </Link>
          </div>

          <div className="rounded-3xl border border-[#E9D6E3] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Shield size={20} className="text-[#AE2070]" />
              <h2 className="text-lg font-bold text-[#18120E]">Admin Only</h2>
            </div>
            <p className="text-sm text-[#6B4D60]">Tất cả tính năng ở trang này chỉ do Admin tạo và quản lý. Mã passcode 4 chữ số là điều kiện bắt buộc để truy cập.</p>
          </div>
        </div>
      </div>
      <HamburgerButton onClick={() => setSidebarOpen(true)} />
    </div>
  )
}
