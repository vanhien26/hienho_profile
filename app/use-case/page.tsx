'use client'
import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { useCases } from '../data/use-cases'
import { Search, ExternalLink, Filter, ArrowUpDown } from 'lucide-react'
import { motion } from 'framer-motion'
import { useSidebar } from '../context/sidebar'

const divisionColors: Record<string, { bg: string; text: string }> = {
  FS: { bg: '#F5E0EC', text: '#AE2070' },
  UTI: { bg: '#EDE8FF', text: '#4B1DB8' },
  OTA: { bg: '#E6EEFF', text: '#1848B8' },
  MDS: { bg: '#E0F5EA', text: '#00663A' },
  PS: { bg: '#FFF3DC', text: '#8B5800' },
  SP: { bg: '#F0EDE8', text: '#8C7D74' },
  GPD: { bg: '#E6EEFF', text: '#1848B8' },
  BMC: { bg: '#F5E0EC', text: '#AE2070' },
  CX: { bg: '#E6EEFF', text: '#1848B8' },
}

export default function MiniWebRegistryPage() {
  const { open: sidebarOpen, setOpen: setSidebarOpen } = useSidebar()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeDivision, setActiveDivision] = useState<string | null>(null)
  const [activePageType, setActivePageType] = useState<string | null>(null)

  const filteredData = useCases.filter(item => {
    const matchesSearch =
      item.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.useCase.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDivision = activeDivision ? item.division === activeDivision : true
    const matchesPageType = activePageType ? item.pageType === activePageType : true

    return matchesSearch && matchesDivision && matchesPageType
  })

  const divisions = Array.from(new Set(useCases.map(i => i.division)))
  const pageTypes = Array.from(new Set(useCases.map(i => i.pageType)))

  return (
    <div className="flex min-h-screen w-full bg-[#F6F3EF]">
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 min-w-0 flex flex-col h-screen">
        {/* Header */}
        <div className="bg-white border-b border-[#E4DDD6] px-4 sm:px-6 lg:px-10 py-4 sm:py-6 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#18120E] truncate">Use Case</h1>
              <p className="text-xs text-[#8C7D74] mt-1">Danh sách toàn bộ các trang Mini Web đã triển khai và giám sát</p>
            </div>

            <div className="relative w-full sm:w-80 flex-shrink-0">
              <Search className="absolute left-3 top-2.5 text-[#8C7D74]" size={16} />
              <input
                type="text"
                placeholder="Tìm kiếm dịch vụ, use case, hoặc URL..."
                className="w-full pl-10 pr-4 py-2 bg-[#F6F3EF] border border-transparent rounded-xl text-sm focus:bg-white focus:border-[#AE2070] transition-all outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Division Filter */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 mt-6">
            <span className="text-[10px] font-bold text-[#8C7D74] sm:mr-2">DIVISION:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveDivision(null)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${!activeDivision ? 'bg-[#18120E] text-white' : 'bg-gray-100 text-[#8C7D74] hover:bg-gray-200'}`}
              >
                ALL
              </button>
              {divisions.map(div => (
                <button
                  key={div}
                  onClick={() => setActiveDivision(div)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${activeDivision === div ? 'bg-[#AE2070] text-white' : 'bg-white border border-[#E4DDD6] text-[#8C7D74] hover:bg-gray-50'}`}
                >
                  {div}
                </button>
              ))}
            </div>
          </div>

          {/* Page Type Filter */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 mt-4">
            <span className="text-[10px] font-bold text-[#8C7D74] sm:mr-2">PAGE TYPE:</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActivePageType(null)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${!activePageType ? 'bg-[#18120E] text-white' : 'bg-gray-100 text-[#8C7D74] hover:bg-gray-200'}`}
              >
                ALL
              </button>
              {pageTypes.map(pageType => (
                <button
                  key={pageType}
                  onClick={() => setActivePageType(pageType)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition-all ${activePageType === pageType ? 'bg-[#AE2070] text-white' : 'bg-white border border-[#E4DDD6] text-[#8C7D74] hover:bg-gray-50'}`}
                >
                  {pageType}
                </button>
              ))}
            </div>
          </div>

          {/* Clear All Filters */}
          {(activeDivision || activePageType) && (
            <div className="mt-4 flex justify-center sm:justify-start">
              <button
                onClick={() => {
                  setActiveDivision(null)
                  setActivePageType(null)
                }}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold hover:bg-red-100 transition-all"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6">
          <div className="bg-white rounded-2xl border border-[#E4DDD6] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-[#E4DDD6]">
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">Division</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">Service Name</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">Use Case</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">URL</th>
                    <th className="px-6 py-4 text-[10px] font-black uppercase tracking-wider text-[#8C7D74]">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredData.map((item, idx) => {
                    const colors = divisionColors[item.division] || { bg: '#F0EDE8', text: '#8C7D74' }
                    return (
                      <motion.tr
                        key={`${item.division}-${item.serviceName}-${idx}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.01 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-black" style={{ background: colors.bg, color: colors.text }}>
                            {item.division}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-xs font-bold text-[#18120E]">{item.serviceName}</div>
                          <div className="text-[10px] text-[#8C7D74] lowercase">{item.product}</div>
                        </td>
                        <td className="px-6 py-4 text-xs text-[#4A3F38]">{item.useCase}</td>
                        <td className="px-6 py-4">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-medium text-[#AE2070] hover:underline flex items-center gap-1"
                          >
                            {item.url}
                            <ExternalLink size={10} />
                          </a>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            item.status === 'Live' ? 'bg-green-100 text-green-800' :
                            item.status === 'Stop' ? 'bg-red-100 text-red-800' :
                            item.status === 'Monitor' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {item.status}
                          </span>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-4 sm:px-0">
            <p className="text-[10px] text-[#8C7D74] font-medium">
              Hiển thị <strong>{filteredData.length}</strong> / <strong>{useCases.length}</strong> dịch vụ
            </p>
            <p className="text-[10px] text-[#8C7D74] font-medium underline cursor-pointer hover:text-[#AE2070]">
              Tải file Excel (Coming soon)
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
