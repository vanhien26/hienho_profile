'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Sidebar from '../../components/Sidebar'
import { useCases, UseCase } from '../../data/use-cases'
import { Menu, FileText, Save, X, ArrowLeft } from 'lucide-react'

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

const defaultEntry: UseCase = {
  id: '',
  division: 'FS',
  serviceName: '',
  useCase: '',
  product: '',
  pageType: '',
  status: 'Live',
  url: '',
  urlPath: '',
  description: '',
  owner: '',
  launchDate: '',
  updateDate: new Date().toISOString().split('T')[0],
  note: '',
  tags: [],
  priority: 'Medium',
}

export default function AdminUseCasesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [entries, setEntries] = useState<UseCase[]>([])
  const [formState, setFormState] = useState<UseCase>(defaultEntry)
  const [editingRowIndex, setEditingRowIndex] = useState<number | null>(null)
  const [tempRowData, setTempRowData] = useState<UseCase | null>(null)
  const [droplists, setDroplists] = useState({
    divisions: [] as string[],
    useCases: [] as string[],
    pageTypes: [] as string[],
    statuses: ['Live', 'Monitor', 'Stop'] as string[]
  })
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const persisted = localStorage.getItem('adminUseCases')
    if (persisted) {
      try {
        const parsed = JSON.parse(persisted)
        if (Array.isArray(parsed) && parsed.every((item: unknown) => typeof item === 'object' && item !== null)) {
          setEntries(parsed as UseCase[])
          return
        }
      } catch {
        // ignore invalid persisted data
      }
    }
    setEntries(useCases)

    // Extract droplists from data
    const divisions = Array.from(new Set(useCases.map(e => e.division))).sort() as string[]
    const useCaseNames = Array.from(new Set(useCases.map(e => e.useCase))).sort() as string[]
    const pageTypes = Array.from(new Set(useCases.map(e => e.pageType))).sort() as string[]
    setDroplists({ divisions, useCases: useCaseNames, pageTypes, statuses: ['Live', 'Monitor', 'Stop'] })
  }, [])

  const persistEntries = (nextEntries: UseCase[]) => {
    setEntries(nextEntries)
    localStorage.setItem('adminUseCases', JSON.stringify(nextEntries))
  }

  const resetForm = () => {
    setEditingRowIndex(null)
    setFormState(defaultEntry)
    setFormError('')
  }

  const handleSave = () => {
    const trimmed: UseCase = {
      ...formState,
      id: formState.id || `uc-${Date.now()}`,
      division: formState.division.trim() as 'FS' | 'OTA' | 'GPD' | 'MDS' | 'BMC' | 'CX' | 'PS',
      useCase: formState.useCase.trim(),
      product: formState.product.trim(),
      serviceName: formState.serviceName.trim(),
      url: formState.url.trim(),
      urlPath: formState.urlPath.trim(),
      pageType: formState.pageType.trim(),
      description: formState.description?.trim() || '',
      note: formState.note?.trim() || '',
      owner: formState.owner?.trim() || '',
      launchDate: formState.launchDate || '',
      updateDate: new Date().toISOString().split('T')[0],
    }

    if (!trimmed.division || !trimmed.useCase || !trimmed.serviceName || !trimmed.url || !trimmed.pageType) {
      setFormError('Division, Use Case, Service Name, URL và Page Type là bắt buộc.')
      return
    }

    if (editingRowIndex !== null) {
      // Update existing entry
      const nextEntries = entries.map((item, idx) => idx === editingRowIndex ? trimmed : item)
      persistEntries(nextEntries)
    } else {
      // Add new entry
      persistEntries([...entries, trimmed])
    }
    resetForm()
  }

  const handleEditRow = (index: number) => {
    setEditingRowIndex(index)
    setFormState(entries[index])
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

  return (
    <div className="flex min-h-screen w-full bg-[#F9F2F7]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#E4DDD6] px-6 sm:px-10 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#18120E]">Use Case</h1>
            <p className="text-sm text-[#8C7D74] mt-2">Quản lý danh sách Use Case / Mini Web trực tiếp từ admin.</p>
          </div>
          <Link href="/admin" className="inline-flex items-center gap-2 rounded-full border border-[#E4DDD6] px-4 py-2 text-sm font-semibold text-[#5B3A53] hover:bg-[#F3E6F5] transition">
            <ArrowLeft size={16} /> Quay lại Admin
          </Link>
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
                    <h2 className="text-lg font-bold text-[#18120E]">{editingRowIndex !== null ? 'Cập nhật' : 'Thêm'} Use Case</h2>
                  </div>
                </div>
              </div>

              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                <div className="grid gap-3 grid-cols-2">
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    Division *
                    <select
                      value={formState.division}
                      onChange={(e) => setFormState({ ...formState, division: e.target.value as 'FS' | 'OTA' | 'GPD' | 'MDS' | 'BMC' | 'CX' | 'PS' })}
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
                      onChange={(e) => setFormState({ ...formState, status: e.target.value as 'Live' | 'Monitor' | 'Stop' | 'Draft' })}
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
                  URL Path
                  <input
                    value={formState.urlPath}
                    onChange={(e) => setFormState({ ...formState, urlPath: e.target.value })}
                    placeholder="(Tùy chọn)"
                    className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                  />
                </label>

                <label className="block text-xs font-semibold text-[#5B3A53]">
                  Description
                  <textarea
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    placeholder="(Tùy chọn)"
                    className="mt-1 w-full h-12 rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                  />
                </label>

                <div className="grid gap-3 grid-cols-2">
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    Owner
                    <input
                      value={formState.owner}
                      onChange={(e) => setFormState({ ...formState, owner: e.target.value })}
                      placeholder="(Tùy chọn)"
                      className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                    />
                  </label>
                  <label className="block text-xs font-semibold text-[#5B3A53]">
                    Launch Date
                    <input
                      type="date"
                      value={formState.launchDate}
                      onChange={(e) => setFormState({ ...formState, launchDate: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                    />
                  </label>
                </div>

                <label className="block text-xs font-semibold text-[#5B3A53]">
                  Note
                  <textarea
                    value={formState.note}
                    onChange={(e) => setFormState({ ...formState, note: e.target.value })}
                    placeholder="(Tùy chọn)"
                    className="mt-1 w-full h-12 rounded-xl border border-[#E5D0DD] bg-[#FAF4FB] px-3 py-2 text-sm outline-none focus:border-[#AE2070] focus:ring-2 focus:ring-[#F6D2E3]"
                  />
                </label>

                {formError && <p className="text-xs text-[#D92D3B] bg-[#FEE7ED] rounded-lg p-3">{formError}</p>}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#AE2070] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#C84C8C] transition"
                  >
                    <Save size={16} /> {editingRowIndex !== null ? 'Cập nhật' : 'Thêm'}
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
