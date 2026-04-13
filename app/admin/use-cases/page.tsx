'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Sidebar from '../../components/Sidebar'
import { miniWebs, MiniWebEntry } from '../../data/mini_webs'
import { Menu, Shield, FileText, Plus, Save, X, ArrowLeft, LogOut } from 'lucide-react'

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

const defaultEntry: MiniWebEntry = {
  division: '',
  useCase: '',
  product: '',
  serviceName: '',
  url: '',
  status: 'Live',
  pageType: '',
  note: '',
}

export default function AdminUseCasesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [hasAccess, setHasAccess] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [authError, setAuthError] = useState('')
  const [entries, setEntries] = useState<MiniWebEntry[]>([])
  const [formState, setFormState] = useState<MiniWebEntry>(defaultEntry)
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)
  const [tempRowData, setTempRowData] = useState<MiniWebEntry | null>(null)
  const [droplists, setDroplists] = useState({
    divisions: [] as string[],
    useCases: [] as string[],
    pageTypes: [] as string[],
    statuses: ['Live', 'Monitor', 'Stop'] as string[]
  })
  const [formError, setFormError] = useState('')

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

    const persisted = localStorage.getItem('adminUseCases')
    if (persisted) {
      try {
        const parsed = JSON.parse(persisted)
        if (Array.isArray(parsed) && parsed.every((item: unknown) => typeof item === 'object' && item !== null)) {
          setEntries(parsed as MiniWebEntry[])
          return
        }
      } catch {
        // ignore invalid persisted data
      }
    }
    setEntries(miniWebs)
    
    // Extract droplists from data
    const divisions = Array.from(new Set(miniWebs.map(e => e.division))).sort() as string[]
    const useCases = Array.from(new Set(miniWebs.map(e => e.useCase))).sort() as string[]
    const pageTypes = Array.from(new Set(miniWebs.map(e => e.pageType))).sort() as string[]
    setDroplists({ divisions, useCases, pageTypes, statuses: ['Live', 'Monitor', 'Stop'] })
  }, [])

  const persistEntries = (nextEntries: MiniWebEntry[]) => {
    setEntries(nextEntries)
    localStorage.setItem('adminUseCases', JSON.stringify(nextEntries))
  }

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

  const resetForm = () => {
    setEditingRowIndex(null)
    setFormState(defaultEntry)
    setFormError('')
  }

  const handleSave = async () => {
    const trimmed = {
      ...formState,
      division: formState.division.trim(),
      useCase: formState.useCase.trim(),
      product: formState.product.trim(),
      serviceName: formState.serviceName.trim(),
      url: formState.url.trim(),
      pageType: formState.pageType.trim(),
      note: formState.note?.trim() || '',
    }

    if (!trimmed.division || !trimmed.useCase || !trimmed.serviceName || !trimmed.url || !trimmed.pageType) {
      setFormError('Division, Use Case, Service Name, URL và Page Type là bắt buộc.')
      return
    }

    try {
      const response = await fetch('/api/use-cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(trimmed),
      })

      if (!response.ok) {
        const error = await response.json()
        setFormError(error.error || 'Lỗi khi lưu use-case')
        return
      }

      persistEntries([...entries, trimmed])
      resetForm()
    } catch (error) {
      setFormError('Lỗi khi lưu use-case: ' + (error instanceof Error ? error.message : 'Unknown error'))
    }
  }

  const handleEditRow = (index: number) => {
    setEditingRowIndex(index)
  }

  const handleDelete = (index: number) => {
    if (!window.confirm('Bạn có chắc muốn xóa use case này không?')) return
    const nextEntries = entries.filter((_, idx) => idx !== index)
    persistEntries(nextEntries)
    if (editingRowIndex === index) {
      setEditingRowIndex(null)
      setTempRowData(null)
    }
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
                <p className="text-sm text-[#FFE6F0] mt-2">Nhập code admin 4 chữ số để tiếp tục.</p>
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
            <h1 className="text-2xl font-black tracking-tight text-[#18120E]">Use Case</h1>
            <p className="text-sm text-[#8C7D74] mt-2">Quản lý danh sách Use Case / Mini Web trực tiếp từ admin.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-[#E4DDD6] px-4 py-2 text-sm font-semibold text-[#5B3A53] hover:bg-[#F3E6F5] transition">
              <ArrowLeft size={16} /> Quay lại Admin
            </Link>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-[#E4DDD6] px-4 py-2 text-sm font-semibold text-[#5B3A53] hover:bg-[#F3E6F5] transition"
            >
              <LogOut size={16} /> Đăng xuất
            </button>
          </div>
        </div>

        <div className="px-6 sm:px-10 py-8 space-y-8">
          <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <div className="rounded-3xl border border-[#E9D6E3] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-[#18120E]">Danh sách Use Case</h2>
                  <p className="text-sm text-[#6B4D60]">Tìm, sửa hoặc xóa entries hiện tại.</p>
                </div>
                <div className="text-sm font-semibold text-[#5B3A53]">{entries.length} items</div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[720px]">
                  <thead>
                    <tr className="bg-[#F7F1F7] border-b border-[#E9D6E3]">
                      <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">DIV</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">Use Case</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">Service</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">URL</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">Status</th>
                      <th className="px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ECE3E9]">
                    {entries.map((item, index) => (
                      <tr key={`${item.serviceName}-${index}`} className="hover:bg-[#FEF7FB] transition-colors">
                        <td className="px-4 py-3 text-xs text-[#4A3F38]">{item.division}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-[#5B3A53]">{item.useCase}</td>
                        <td className="px-4 py-3 text-xs text-[#4A3F38]">{item.serviceName}</td>
                        <td className="px-4 py-3 text-xs text-[#AE2070] truncate max-w-[220px]">{item.url}</td>
                        <td className="px-4 py-3 text-xs text-[#4A3F38]">{item.status}</td>
                        <td className="px-4 py-3 flex flex-wrap gap-2">
                          <button
                          onClick={() => handleEditRow(index)}
                          className="rounded-2xl bg-[#F3E6F3] px-3 py-2 text-[10px] font-semibold text-[#5B3A53] hover:bg-[#EAD4E6] transition"
                        >
                          Edit
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="rounded-2xl bg-[#FCE7F3] px-3 py-2 text-[10px] font-semibold text-[#A82B5B] hover:bg-[#F6D0E0] transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-3xl border border-[#E9D6E3] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-[#AE2070]" />
                  <div>
                    <h2 className="text-lg font-bold text-[#18120E]">Thêm Use Case mới</h2>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="grid gap-3 grid-cols-2">
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    Division *
                    <select
                      value={formState.division}
                      onChange={(e) => setFormState({ ...formState, division: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                    >
                      <option value="">Chọn Division</option>
                      {droplists.divisions.map(div => (
                        <option key={div} value={div}>{div}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    Use Case *
                    <input
                      value={formState.useCase}
                      onChange={(e) => setFormState({ ...formState, useCase: e.target.value })}
                      placeholder="Nhập Use Case"
                      className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                    />
                  </label>
                </div>

                <div className="grid gap-3 grid-cols-2">
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    Service Name *
                    <input
                      value={formState.serviceName}
                      onChange={(e) => setFormState({ ...formState, serviceName: e.target.value })}
                      placeholder="Tên dịch vụ"
                      className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    URL *
                    <input
                      value={formState.url}
                      onChange={(e) => setFormState({ ...formState, url: e.target.value })}
                      placeholder="https://momo.vn/..."
                      className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                    />
                  </label>
                </div>

                <div className="grid gap-3 grid-cols-2">
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    Page Type *
                    <select
                      value={formState.pageType}
                      onChange={(e) => setFormState({ ...formState, pageType: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                    >
                      <option value="">Chọn Page Type</option>
                      {droplists.pageTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </label>
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    Status
                    <select
                      value={formState.status}
                      onChange={(e) => setFormState({ ...formState, status: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                    >
                      <option value="Live">Live</option>
                      <option value="Monitor">Monitor</option>
                      <option value="Stop">Stop</option>
                    </select>
                  </label>
                </div>

                <label className="block text-xs font-semibold text-[#5B3A53]">
                  Product
                  <input
                    value={formState.product}
                    onChange={(e) => setFormState({ ...formState, product: e.target.value })}
                    placeholder="(Tùy chọn)"
                    className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                  />
                </label>

                <label className="block text-xs font-semibold text-[#5B3A53]">
                  Note
                  <textarea
                    value={formState.note}
                    onChange={(e) => setFormState({ ...formState, note: e.target.value })}
                    placeholder="(Tùy chọn)"
                    className="mt-1 w-full h-16 rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                  />
                </label>

                {formError && <p className="text-xs text-[#D92D3B] bg-[#FEE7ED] rounded-lg p-3">{formError}</p>}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#AE2070] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#C84C8C] transition"
                  >
                    <Plus size={16} /> Thêm
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E4DDD6] bg-white px-4 py-2.5 text-sm font-semibold text-[#5B3A53] hover:bg-[#F9F9F9] transition"
                  >
                    <X size={16} /> Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <HamburgerButton onClick={() => setSidebarOpen(true)} />
    </div>
  )
}
