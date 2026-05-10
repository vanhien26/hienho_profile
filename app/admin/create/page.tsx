'use client'
import { useState, useRef, useCallback } from 'react'
import Link from 'next/link'
import { ArrowLeft, Play, Save, ExternalLink, FileText, Copy, Check } from 'lucide-react'

const STARTER_TEMPLATE = `---
title: "[Use Case] — Web Growth Strategy 2026"
slug: "ten-use-case"
url: "momo.vn/ten-use-case"
division: "FS"
score: 82
verdict_title: "[Tóm tắt cơ hội — 1 câu mạnh]"
verdict_desc: "[Mô tả 2–3 câu: thị trường, cơ hội, chiến lược tiếp cận]"
metrics:
  - { value: "4.3M", label: "SV/tháng", color: "primary" }
  - { value: "6%",   label: "SoV MoMo", color: "blue" }
  - { value: "400+", label: "Keywords",  color: "amber" }
  - { value: "7",    label: "Clusters",  color: "green" }
nav:
  - section: "Overview"
    items:
      - { id: "overview", label: "Overview & Funnel" }
      - { id: "okr",      label: "OKR & North Star" }
      - { id: "keywords", label: "Market Research" }
  - section: "Architecture"
    items:
      - { id: "sitemap",  label: "Sitemap Architecture" }
      - { id: "geo",      label: "GEO / AI Strategy" }
  - section: "Execution"
    items:
      - { id: "roadmap",  label: "Roadmap" }
      - { id: "tracking", label: "Tracking Plan" }
---

## overview

### Overview & Inbound Funnel

:::callout-primary ⭐ Cơ hội tóm tắt
**Thị trường:** [XX]M SV/tháng cho nhóm từ khoá [tên nhóm]
**Gap hiện tại:** SoV MoMo chỉ [X]% — phần lớn traffic đang về competitor
**Chiến lược:** Xây [số] content cluster + pSEO + GEO citations
:::

:::funnel
tofu | Nhận Thức | Giáo dục & Khám phá | Blog so sánh, FAQ Schema, AI Overview citations
mofu | Cân Nhắc | So sánh & Tính toán | Calculator, So sánh tính năng, Review page
bofu | Quyết Định | Landing use-case | Theo nhu cầu, Theo số tiền, Theo đối tượng
convert | Kích Hoạt | Web → App / Action | Deeplink → [screen], Smart Banner, Sticky CTA
:::

## okr

### OKR & North Star Metric

:::callout-primary ⭐ North Star Metric — New Users via Organic
**Định nghĩa:** Số user mới hoàn thành [action] trong 7 ngày sau organic visit.
**Tại sao:** Gắn trực tiếp với revenue activation và MAU.
:::

| Objective | Key Result | Target | Deadline | Owner |
|-----------|-----------|--------|----------|-------|
| O1: Tăng SoV lên 20% | Top 5 seed keywords | GSC position ≤5 | Q3/2026 | Hiến |
| O1 | 50K organic sessions/tháng | GA4 Organic | Q3/2026 | Hiến |
| O2: GEO Citations | MoMo cited top 3 AI responses | 5 target queries | Q4/2026 | Hiến |

## keywords

### Market Sizing & Keyword Research

:::callout-green 🎯 Market Sizing Summary
**Core:** [XX]K SV/tháng — [XX] keywords trực tiếp
**Adjacent:** [XX]K SV/tháng — capture qua content strategy
**TAM:** [XX]K SV/tháng — intercept từ pain point liên quan
:::

:::kw-cluster Cluster 1: [Tên Cluster] | [XX]K SV
[từ khoá chính] | [XX]K | trans
[từ khoá 2] | [XX]K | info
[từ khoá 3] | [XX]K | comm
:::

:::kw-cluster Cluster 2: [Tên Cluster] | [XX]K SV
[từ khoá chính] | [XX]K | trans
[từ khoá 2] | [XX]K | info
:::

## geo

### GEO / AI Strategy

:::callout-amber ⚠️ GEO Gap hiện tại
MoMo chưa xuất hiện trong AI responses cho [X] target queries quan trọng nhất.
:::

:::geo
Q: [Query người dùng hay hỏi AI 1]?
A: [Câu trả lời tối ưu có đề cập MoMo — 2-3 câu, facts rõ ràng, có số liệu]
:::

:::geo
Q: [Query người dùng hay hỏi AI 2]?
A: [Câu trả lời tối ưu — cite MoMo như một giải pháp cụ thể]
:::

## roadmap

### Roadmap & Timeline

| Phase | Tasks | Timeline | Owner |
|-------|-------|----------|-------|
| Phase 1 — Foundation | URL structure, Hub page, Schema | T5/2026 | Trọng |
| Phase 2 — Content | [X] cluster pages, pSEO batch | T6/2026 | Mai |
| Phase 3 — GEO | Entity optimization, citations | T7/2026 | Hiến |

## tracking

### Tracking Plan

| Event | Trigger | Parameters | Tool |
|-------|---------|-----------|------|
| \`page_view\` | Page load | page_path, page_title | GA4 |
| \`cta_click\` | CTA button tap | cta_type, destination | GA4 |
| \`web_to_app\` | Deeplink click | deeplink_url, feature | Appsflyer |
`

const SYNTAX_GUIDE = [
  { label: 'Callout', syntax: ':::callout-primary|green|amber|red|blue Title\ncontent\n:::' },
  { label: 'Stats row', syntax: ':::stats\nvalue | label | color\n:::' },
  { label: 'Funnel', syntax: ':::funnel\nstage | Label | Title | item1, item2\n:::' },
  { label: 'KW Cluster', syntax: ':::kw-cluster Title | Vol\nkeyword | vol | trans/info/comm\n:::' },
  { label: 'GEO Block', syntax: ':::geo\nQ: question?\nA: answer\n:::' },
  { label: 'Persona', syntax: ':::persona Name | primary\nW: want\nI: impediment\nS: solution\nURL: /path · CTA: "text"\n:::' },
  { label: 'Table', syntax: '| Col1 | Col2 |\n|------|------|\n| val  | val  |' },
  { label: 'Section', syntax: '## section-id' },
  { label: 'H2 heading', syntax: '### Heading Text' },
  { label: 'H3 heading', syntax: '#### Sub-heading' },
]

export default function CreateDocPage() {
  const [markdown, setMarkdown] = useState(STARTER_TEMPLATE)
  const [previewHtml, setPreviewHtml] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [savedSlug, setSavedSlug] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handlePreview = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/projects/render/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPreviewHtml(data.html)
      setActiveTab('preview')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [markdown])

  const handleSave = useCallback(async () => {
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/projects/render/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown, save: true }),
      })
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setPreviewHtml(data.html)
      setSavedSlug(data.meta.slug)
      setActiveTab('preview')
    } catch (e: any) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }, [markdown])

  const copySnippet = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(text)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div className="flex flex-col h-screen" style={{ background: 'var(--bg)', fontFamily: "'Roboto', sans-serif" }}>
      {/* Top bar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
        style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-xs font-medium hover:opacity-70 transition-opacity"
            style={{ color: 'var(--ink-3)' }}
          >
            <ArrowLeft size={13} strokeWidth={1.8} /> Admin
          </Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: 'var(--ink)' }}>
            <FileText size={13} strokeWidth={1.8} /> Tạo tài liệu từ Markdown
          </span>
        </div>

        <div className="flex items-center gap-2">
          {savedSlug && (
            <Link
              href={`/projects/${savedSlug}`}
              target="_blank"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-80"
              style={{ background: '#E0F5EA', color: '#00663A' }}
            >
              <ExternalLink size={12} strokeWidth={1.8} /> Xem trang
            </Link>
          )}
          <button
            onClick={handlePreview}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-90"
            style={{ background: 'var(--gray-100)', color: 'var(--ink-2)' }}
          >
            <Play size={12} strokeWidth={1.8} />
            {loading ? 'Đang render...' : 'Preview'}
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors hover:opacity-90"
            style={{ background: 'var(--clay)', color: '#fff' }}
          >
            <Save size={12} strokeWidth={1.8} />
            {saving ? 'Đang lưu...' : 'Save & Export'}
          </button>
        </div>
      </div>

      {error && (
        <div className="px-4 py-2 text-xs font-medium" style={{ background: '#FFF0F0', color: '#B04A4A', borderBottom: '1px solid #F5C0C0' }}>
          ⚠ {error}
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-center gap-0 px-4 flex-shrink-0" style={{ background: '#fff', borderBottom: '1px solid var(--border)' }}>
        {(['editor', 'preview'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 text-xs font-semibold transition-colors capitalize"
            style={{
              color: activeTab === tab ? 'var(--clay)' : 'var(--ink-3)',
              borderBottom: activeTab === tab ? '2px solid var(--clay)' : '2px solid transparent',
            }}
          >
            {tab === 'editor' ? 'Editor' : 'Preview'}
          </button>
        ))}
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* LEFT: Editor + syntax guide */}
        <div
          className={`flex flex-col overflow-hidden ${activeTab === 'editor' ? 'flex' : 'hidden'} lg:flex`}
          style={{ width: '50%', borderRight: '1px solid var(--border)' }}
        >
          {/* Syntax guide */}
          <div
            className="flex gap-2 px-3 py-2 overflow-x-auto flex-shrink-0 scrollbar-hide"
            style={{ background: 'var(--gray-100)', borderBottom: '1px solid var(--border)' }}
          >
            {SYNTAX_GUIDE.map(s => (
              <button
                key={s.label}
                onClick={() => copySnippet(s.syntax)}
                className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold whitespace-nowrap transition-all flex-shrink-0"
                style={{
                  background: copied === s.syntax ? '#E0F5EA' : '#fff',
                  color: copied === s.syntax ? '#00663A' : 'var(--ink-2)',
                  border: '1px solid var(--border)',
                }}
                title={s.syntax}
              >
                {copied === s.syntax ? <Check size={9} strokeWidth={2} /> : <Copy size={9} strokeWidth={1.8} />}
                {s.label}
              </button>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            value={markdown}
            onChange={e => setMarkdown(e.target.value)}
            className="flex-1 resize-none outline-none p-4 text-xs leading-relaxed"
            style={{
              fontFamily: "'Roboto Mono', monospace",
              background: '#FAFAF8',
              color: 'var(--ink)',
              lineHeight: 1.8,
            }}
            spellCheck={false}
          />
        </div>

        {/* RIGHT: Preview iframe */}
        <div
          className={`flex-1 flex flex-col overflow-hidden ${activeTab === 'preview' ? 'flex' : 'hidden'} lg:flex`}
        >
          {previewHtml ? (
            <iframe
              ref={iframeRef}
              srcDoc={previewHtml}
              className="flex-1 border-0 w-full h-full"
              title="Document Preview"
              sandbox="allow-same-origin allow-scripts"
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center gap-3" style={{ background: 'var(--gray-100)' }}>
              <FileText size={40} strokeWidth={1.8} style={{ color: 'var(--gray-300)' }} />
              <p className="text-sm font-semibold" style={{ color: 'var(--ink-3)' }}>
                Nhấn <strong>Preview</strong> để render tài liệu
              </p>
              <p className="text-xs" style={{ color: 'var(--ink-ghost)' }}>
                Viết Markdown bên trái → Preview → Save & Export
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
