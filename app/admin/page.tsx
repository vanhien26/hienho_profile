'use client'
import { useState } from 'react'
import Link from 'next/link'
import Sidebar from '../components/Sidebar'
import { Menu, Shield, FileText } from 'lucide-react'

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

  return (
    <div className="flex min-h-screen w-full bg-[#F9F2F7]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#E4DDD6] px-6 sm:px-10 py-6">
          <h1 className="text-2xl font-black tracking-tight text-[#18120E]">Admin Backend</h1>
          <p className="text-sm text-[#8C7D74] mt-2">Quản trị New Projects, Tags và dữ liệu admin-only.</p>
        </div>

        <div className="px-6 sm:px-10 py-8 space-y-8">
          <div className="grid gap-5 md:grid-cols-1 max-w-sm">
            <Link href="/admin/create" className="rounded-3xl border-2 border-[#202940] bg-[#202940] p-6 shadow-sm transition hover:opacity-90">
              <div className="flex items-center gap-3 mb-3">
                <FileText size={20} className="text-white" />
                <h2 className="text-lg font-bold text-white">Markdown → Doc</h2>
              </div>
              <p className="text-sm text-[#8A9AB5]">Viết Markdown → tự động render thành HTML document theo Klaus DS template.</p>
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
