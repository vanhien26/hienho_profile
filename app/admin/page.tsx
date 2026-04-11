'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Sidebar from '../components/Sidebar'
import { projects, Project } from '../data/projects'
import { Menu, Shield, LayoutDashboard, Tag, Plus, X, FileText, LogOut } from 'lucide-react'

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
  const [hasAccess, setHasAccess] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [tags, setTags] = useState<string[]>([])

  useEffect(() => {
    const savedAuth = localStorage.getItem('adminAccess')
    if (savedAuth) {
      const { timestamp } = JSON.parse(savedAuth)
      const now = Date.now()
      const oneHour = 60 * 60 * 1000
      if (now - timestamp < oneHour) {
        setHasAccess(true)
      } else {
        localStorage.removeItem('adminAccess')
      }
    }

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

  const handleCodeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (codeInput === '1507') {
      localStorage.setItem('adminAccess', JSON.stringify({ timestamp: Date.now() }))
      setHasAccess(true)
      setAuthError('')
    } else {
      setAuthError('Mã truy cập không đúng. Vui lòng nhập lại 4 chữ số.')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAccess')
    setHasAccess(false)
    setCodeInput('')
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5EBF5] px-4">
        <div className="w-full max-w-md bg-white rounded-[28px] border border-[#E6D5E0] shadow-[0_24px_80px_rgba(174,32,112,0.12)] overflow-hidden">
          <div className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #AE2070 0%, #D97706 100%)' }}>
            <div className="flex items-center gap-3">
              <Shield size={24} color="white" />
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Admin Access</h1>
                <p className="text-sm text-[#FFE6F0] mt-2">Nhập code admin 4 chữ số để mở quyền quản trị backend.</p>
              </div>
            </div>
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
                Xác nhận code
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full bg-[#F9F2F7]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#E4DDD6] px-6 sm:px-10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#18120E]">Admin Backend</h1>
            <p className="text-sm text-[#8C7D74] mt-2">Quản trị New Projects, Tags và dữ liệu admin-only.</p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-[#E4DDD6] px-4 py-2 text-sm font-semibold text-[#5B3A53] hover:bg-[#F3E6F5] transition"
          >
            <LogOut size={16} /> Đăng xuất
          </button>
        </div>

        <div className="px-6 sm:px-10 py-8 space-y-8">
          <div className="grid gap-5 md:grid-cols-3">
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
