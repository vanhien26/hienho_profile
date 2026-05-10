import matter from 'gray-matter'
import { marked, Renderer } from 'marked'

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Metric { value: string; label: string; color?: string }
export interface NavItem { id: string; label: string }
export interface NavSection { section: string; items: NavItem[] }

export interface DocMeta {
  title: string
  slug: string
  url?: string
  division?: string
  score?: number
  verdict_title?: string
  verdict_desc?: string
  metrics?: Metric[]
  nav?: NavSection[]
  author?: string
  version?: string
}

export interface RenderResult {
  html: string
  meta: DocMeta
}

// ── Color map ──────────────────────────────────────────────────────────────────
const COLOR_VAR: Record<string, string> = {
  primary: 'var(--primary)',
  blue:    'var(--blue)',
  green:   'var(--green)',
  amber:   'var(--amber)',
  red:     'var(--red)',
  purple:  'var(--purple)',
}

// ── Special block preprocessor ────────────────────────────────────────────────
function processBlocks(content: string): string {

  // :::callout type [optional title on same line]
  // body (markdown)
  // :::
  content = content.replace(/:::callout-([\w]+)[ \t]*([^\n]*)\n([\s\S]*?):::/g,
    (_, type, titleRaw, body) => {
      const title = titleRaw.trim()
      return `<div class="callout callout-${type}">${title ? `<div class="callout-title">${title}</div>` : ''}${body.trim().replace(/\n/g, '<br>')}</div>\n`
    })

  // :::stats
  // value | label | color
  // :::
  content = content.replace(/:::stats\n([\s\S]*?):::/g, (_, data) => {
    const cards = data.trim().split('\n')
      .filter((l: string) => l.includes('|'))
      .map((line: string) => {
        const [value, label, color = 'primary'] = line.split('|').map((s: string) => s.trim())
        const colorVar = COLOR_VAR[color] || COLOR_VAR.primary
        return `<div class="stat-card"><div class="stat-num" style="color:${colorVar}">${value}</div><div class="stat-lbl">${label}</div></div>`
      }).join('')
    return `<div class="stat-row">${cards}</div>\n`
  })

  // :::funnel
  // stage | Stage Label | Stage Title | item1, item2, item3
  // :::
  content = content.replace(/:::funnel\n([\s\S]*?):::/g, (_, data) => {
    const stages = data.trim().split('\n')
      .filter((l: string) => l.includes('|'))
      .map((line: string) => {
        const parts = line.split('|').map((s: string) => s.trim())
        const [stage, stageLabel, stageTitle, itemsStr = ''] = parts
        const items = itemsStr.split(',').map((i: string) => `<li>${i.trim()}</li>`).join('')
        return `<div class="funnel-stage fs-${stage}">
          <div class="funnel-stage-label">${stageLabel}</div>
          <div class="funnel-stage-title">${stageTitle}</div>
          <ul class="funnel-stage-items">${items}</ul>
        </div>`
      }).join('')
    return `<div class="funnel-flow">${stages}</div>\n`
  })

  // :::kw-cluster Cluster Title | Vol/Tag
  // keyword | volume | intent
  // :::
  content = content.replace(/:::kw-cluster ([^|\n]+)\|[ \t]*([^\n]+)\n([\s\S]*?):::/g,
    (_, title, vol, data) => {
      const intentLabel: Record<string, string> = {
        trans: 'Transaction', comm: 'Commercial', nav: 'Navigational', info: 'Informational',
      }
      const keywords = data.trim().split('\n')
        .filter((l: string) => l.includes('|') && !l.startsWith('|') && !l.match(/^[-|]+$/))
        .filter((l: string) => !l.toLowerCase().includes('keyword'))
        .map((line: string) => {
          const [kw, kwVol, intent = 'info'] = line.split('|').map((s: string) => s.trim())
          const cls = `intent-${intent}`
          return `<div class="kw-item">
            <span class="kw-text">${kw}</span>
            <div class="kw-meta">
              <span class="kw-vol">${kwVol}</span>
              <span class="kw-intent ${cls}">${intentLabel[intent] || intent}</span>
            </div>
          </div>`
        }).join('')
      return `<div class="kw-cluster">
        <div class="kw-cluster-header"><span>${title.trim()}</span><span class="tag tag-p1">${vol.trim()}</span></div>
        <div class="kw-cluster-body">${keywords}</div>
      </div>\n`
    })

  // :::geo
  // Q: question
  // A: answer
  // :::
  content = content.replace(/:::geo\nQ: ([^\n]+)\nA: ([\s\S]*?):::/g,
    (_, q, a) => `<div class="geo-block">
      <div class="geo-block-label">GEO / AI Signal</div>
      <div class="geo-block-q">"${q.trim()}"</div>
      <div class="geo-block-a">${a.trim().replace(/\n/g, '<br>')}</div>
    </div>\n`)

  // :::persona name | bg-variant (primary|blue|green|amber)
  // W: want
  // I: impediment
  // S: solution
  // URL: /slug/page · CTA: "text"
  // :::
  content = content.replace(/:::persona ([^|\n]+)\|[ \t]*([^\n]*)\n([\s\S]*?):::/g,
    (_, name, bgVariant, body) => {
      const bgMap: Record<string, string> = {
        primary: 'var(--primary-xlt)', blue: '#EDF7FF', green: 'var(--green-lt)',
        amber: 'var(--amber-lt)', default: 'var(--primary-xlt)',
      }
      const bg = bgMap[bgVariant.trim()] || bgMap.default
      const lines = body.trim().split('\n')
      let steps = ''
      let result = ''
      lines.forEach((line: string) => {
        const wMatch = line.match(/^W: (.+)/)
        const iMatch = line.match(/^I: (.+)/)
        const sMatch = line.match(/^S: (.+)/)
        const urlMatch = line.match(/^URL: (.+)/)
        if (wMatch) steps += `<div class="scenario-step"><div class="step-num">W</div><div class="step-text">${wMatch[1]}</div></div>`
        if (iMatch) steps += `<div class="scenario-step"><div class="step-num">I</div><div class="step-text">${iMatch[1]}</div></div>`
        if (sMatch) steps += `<div class="scenario-step"><div class="step-num">S</div><div class="step-text">${sMatch[1]}</div></div>`
        if (urlMatch) result = `<div class="scenario-result">→ ${urlMatch[1]}</div>`
      })
      return `<div class="scenario-card">
        <div class="scenario-header" style="background:${bg}">
          <span style="font-size:20px">👤</span>
          <div class="scenario-title">${name.trim()}</div>
        </div>
        <div class="scenario-body">${steps}${result}</div>
      </div>\n`
    })

  return content
}

// ── Markdown renderer with template CSS ──────────────────────────────────────
function buildRenderer(): Renderer {
  const renderer = new Renderer()

  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    if (depth === 3) return `<h2 class="sh">${text}</h2>\n`
    if (depth === 4) return `<h3 class="sh3">${text}</h3>\n`
    return `<p><strong>${text}</strong></p>\n`
  }

  renderer.table = ({ header, rows }: { header: any[]; rows: any[][] }) => {
    const thead = `<tr>${header.map((cell: any) => `<th>${cell.text || cell}</th>`).join('')}</tr>`
    const tbody = rows.map((row: any[]) =>
      `<tr>${row.map((cell: any) => `<td>${cell.text || cell}</td>`).join('')}</tr>`
    ).join('\n')
    return `<div class="table-scroll"><table class="data-table"><thead>${thead}</thead><tbody>${tbody}</tbody></table></div>\n`
  }

  renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
    return `<pre style="background:var(--primary-xlt);border-radius:var(--r);padding:12px 14px;font-family:var(--mono);font-size:12px;overflow-x:auto;margin-bottom:16px"><code>${text}</code></pre>\n`
  }

  renderer.blockquote = ({ text }: { text: string }) => {
    return `<div class="callout callout-primary">${text}</div>\n`
  }

  renderer.list = ({ items, ordered }: { items: any[]; ordered: boolean }) => {
    const tag = ordered ? 'ol' : 'ul'
    const itemHtml = items.map((item: any) => `<li style="font-size:12.5px;color:var(--ink-2);padding:3px 0">${item.text || item}</li>`).join('')
    return `<${tag} style="padding-left:20px;margin-bottom:16px;line-height:1.7">${itemHtml}</${tag}>\n`
  }

  renderer.paragraph = ({ text }: { text: string }) => {
    return `<p style="margin-bottom:12px;line-height:1.7;color:var(--ink-2)">${text}</p>\n`
  }

  return renderer
}

// ── Section HTML ──────────────────────────────────────────────────────────────
function renderSection(id: string, content: string): string {
  const processed = processBlocks(content)
  const renderer = buildRenderer()
  marked.use({ renderer })
  const body = marked.parse(processed) as string
  const firstSection = id === 'overview'
  return `<section class="section${firstSection ? ' active' : ''}" id="s-${id}">\n${body}\n</section>\n`
}

// ── Nav sidebar HTML ──────────────────────────────────────────────────────────
function renderNav(nav: NavSection[]): string {
  return nav.map(group => {
    const items = group.items.map(item =>
      `<div class="nav-item" onclick="go('${item.id}')"><span class="nav-dot"></span><span class="nav-lbl">${item.label}</span></div>`
    ).join('\n')
    return `<div class="nav-section">
  <span class="nav-section-label">${group.section}</span>
  ${items}
</div>`
  }).join('\n')
}

// ── Full HTML shell ───────────────────────────────────────────────────────────
function buildShell(meta: DocMeta, sectionsHtml: string): string {
  const metrics = (meta.metrics || []).map(m => {
    const colorVar = COLOR_VAR[m.color || 'primary'] || COLOR_VAR.primary
    return `<div class="stat-card"><div class="stat-num" style="color:${colorVar}">${m.value}</div><div class="stat-lbl">${m.label}</div></div>`
  }).join('')

  const defaultNav: NavSection[] = [
    { section: 'Overview', items: [{ id: 'overview', label: 'Overview & Funnel' }, { id: 'okr', label: 'OKR & North Star' }, { id: 'keywords', label: 'Market Research' }, { id: 'jtbd', label: 'User Scenarios' }] },
    { section: 'Architecture', items: [{ id: 'sitemap', label: 'Sitemap Architecture' }, { id: 'anatomy', label: 'Page Anatomy' }, { id: 'geo', label: 'GEO / AI Strategy' }] },
    { section: 'Execution', items: [{ id: 'roadmap', label: 'Roadmap' }, { id: 'tracking', label: 'Tracking Plan' }, { id: 'checklist', label: 'Publish Checklist' }] },
  ]

  const navHtml = renderNav(meta.nav || defaultNav)

  const verdictHtml = (meta.verdict_title || meta.verdict_desc)
    ? `<div class="verdict-bar">
        ${meta.score ? `<div class="verdict-score">${meta.score}</div>` : ''}
        <div class="verdict-text">
          ${meta.verdict_title ? `<div class="verdict-title">${meta.verdict_title}</div>` : ''}
          ${meta.verdict_desc ? `<div class="verdict-desc">${meta.verdict_desc}</div>` : ''}
        </div>
      </div>` : ''

  const metricsHtml = metrics ? `<div class="stat-row">${metrics}</div>` : ''

  const template = readTemplate()

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${meta.title}</title>
${template.css}
</head>
<body>
<div class="layout">

<header class="mob-header">
  <div class="mob-brand">
    <div class="brand-logo">Klaus</div>
    <div class="brand-label">${meta.title.split('—')[0].trim()}<br>${meta.url || 'Web Growth Strategy'}</div>
  </div>
  <button class="mob-hamburger" id="hamburger" onclick="toggleSidebar()">
    <span></span><span></span><span></span>
  </button>
</header>

<div class="sidebar-overlay" id="overlay" onclick="closeSidebar()"></div>

<aside class="sidebar" id="sidebar">
  <div class="sidebar-brand">
    <div class="brand-logo">K</div>
    <div class="brand-label">${meta.title.split('—')[0].trim()}<br>Growth Strategy</div>
  </div>
  <nav>
    ${navHtml}
  </nav>
  <div class="sidebar-footer">
    ${meta.url ? `<div class="version-tag">${meta.url}</div>` : ''}
    <div class="version-tag">${meta.version || 'v1.0'} · ${meta.author || 'Van Hien'} · 2026</div>
  </div>
</aside>

<main class="content">

${verdictHtml}
${metricsHtml}

${sectionsHtml}

</main>
</div>

${template.js}
</body>
</html>`
}

// ── Read CSS + JS from template file ─────────────────────────────────────────
let _templateCache: { css: string; js: string } | null = null

function readTemplate(): { css: string; js: string } {
  if (_templateCache) return _templateCache
  // These are embedded from the template file to avoid runtime file reads
  // In production, the CSS is inlined from the Klaus DS template
  const css = `<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet"/>
<style>
:root{--primary:#202940;--primary-1:#2E3D5C;--primary-light:#E8EBF2;--primary-xlt:#F0F2F7;--green:#788C5D;--green-lt:#EBF0E5;--blue:#5C7CA3;--blue-lt:#EBF1F7;--amber:#C78E3F;--amber-lt:#FAF1E3;--red:#B04A4A;--red-lt:#F5E8E8;--purple:#6B4FA0;--purple-lt:#EDE8F7;--ink:#141413;--ink-2:#3D3D3A;--ink-3:#87867F;--bg:#FAF9F5;--surface:#FFFFFF;--border:#D1CFC5;--oat:#E3DACC;--r:10px;--shadow-sm:0 1px 4px rgba(0,0,0,.06);--shadow:0 4px 20px rgba(0,0,0,.08);--font:'Be Vietnam Pro',sans-serif;--mono:'JetBrains Mono',monospace;}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}html{scroll-behavior:smooth;}body{font-family:var(--font);background:var(--bg);color:var(--ink);font-size:14px;line-height:1.6;-webkit-font-smoothing:antialiased;}a{text-decoration:none;color:inherit;}
.layout{display:block;min-height:100vh;}
.mob-header{display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:300;height:52px;padding:0 16px;background:var(--surface);border-bottom:2px solid var(--primary-light);box-shadow:0 2px 10px rgba(32,41,64,.08);}
.mob-brand{display:flex;align-items:center;gap:9px;}.brand-logo{background:var(--primary);color:#fff;font-weight:800;font-size:14px;padding:4px 10px;border-radius:7px;letter-spacing:-.5px;}.brand-label{font-size:10.5px;font-weight:700;color:var(--ink-3);line-height:1.3;}
.mob-hamburger{display:flex;flex-direction:column;gap:4.5px;cursor:pointer;padding:7px;border-radius:6px;background:transparent;border:none;transition:background .12s;}.mob-hamburger:hover{background:var(--primary-xlt);}.mob-hamburger span{display:block;width:20px;height:2px;background:var(--ink-2);border-radius:2px;transition:all .22s cubic-bezier(.4,0,.2,1);}.mob-hamburger.open span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px);background:var(--primary);}.mob-hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0);}.mob-hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px);background:var(--primary);}
.sidebar-overlay{display:none;position:fixed;inset:0;background:rgba(20,20,19,.5);z-index:250;}.sidebar-overlay.open{display:block;}
.sidebar{position:fixed;top:0;left:0;width:256px;height:100vh;background:#141413;display:flex;flex-direction:column;z-index:260;transform:translateX(-100%);transition:transform .26s cubic-bezier(.4,0,.2,1);overflow-y:auto;overflow-x:hidden;}.sidebar.open{transform:translateX(0);box-shadow:4px 0 24px rgba(0,0,0,.3);}
.sidebar-brand{display:flex;align-items:center;gap:10px;padding:18px 18px 15px;border-bottom:1px solid rgba(255,255,255,.07);flex-shrink:0;}.sidebar-brand .brand-logo{font-size:13px;padding:3px 9px;}.sidebar-brand .brand-label{color:rgba(255,255,255,.4);font-size:10px;line-height:1.4;}
.nav-section{padding:16px 0 4px;flex-shrink:0;}.nav-section-label{display:block;font-size:9px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;color:var(--primary-light);padding:0 18px 6px;opacity:.8;}
.nav-item{display:flex;align-items:center;gap:10px;padding:9px 18px 9px 16px;cursor:pointer;color:rgba(255,255,255,.5);font-size:12.5px;font-weight:500;border-left:3px solid transparent;transition:all .13s;user-select:none;line-height:1.3;}.nav-item:hover{color:rgba(255,255,255,.85);background:rgba(255,255,255,.05);border-left-color:rgba(255,255,255,.2);}.nav-item.active{color:#fff;background:rgba(32,41,64,.5);border-left-color:var(--primary-light);font-weight:700;}
.nav-dot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.18);flex-shrink:0;transition:background .13s;}.nav-item.active .nav-dot{background:var(--primary-light);}.nav-item:hover .nav-dot{background:rgba(255,255,255,.4);}.nav-lbl{flex:1;}
.sidebar-footer{margin-top:auto;padding:14px 18px;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;}.version-tag{font-family:var(--mono);font-size:9px;color:rgba(255,255,255,.22);line-height:1.8;}
.content{display:block;padding:24px 16px 40px;}
.section{display:none;}.section.active{display:block;}
@media(min-width:900px){.mob-header{display:none;}.sidebar-overlay{display:none!important;}.sidebar{transform:none!important;position:fixed;top:0;left:0;height:100vh;box-shadow:none;}.content{margin-left:256px;padding:36px 44px 48px;}}
.page-header{margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid var(--border);}.page-eyebrow{font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--ink-3);margin-bottom:6px;}.page-title{font-size:22px;font-weight:900;letter-spacing:-.5px;line-height:1.2;color:var(--ink);margin-bottom:8px;}.page-desc{font-size:13.5px;color:var(--ink-2);line-height:1.7;}
.verdict-bar{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);padding:16px;margin-bottom:24px;display:flex;flex-direction:column;gap:14px;}.verdict-score{width:60px;height:60px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:15px;font-weight:900;background:var(--primary-xlt);color:var(--primary);}.verdict-title{font-size:14px;font-weight:800;margin-bottom:4px;}.verdict-desc{font-size:12.5px;color:var(--ink-2);line-height:1.6;}
.stat-row{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:28px;}.stat-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:14px 16px;}.stat-num{font-size:26px;font-weight:900;letter-spacing:-1px;line-height:1;margin-bottom:4px;}.stat-lbl{font-size:11.5px;color:var(--ink-3);font-weight:500;}.stat-sub{font-size:10px;color:var(--ink-3);margin-top:3px;}
h2.sh{font-size:16px;font-weight:800;letter-spacing:-.3px;margin:28px 0 14px;color:var(--ink);display:flex;align-items:center;gap:8px;flex-wrap:wrap;}h3.sh3{font-size:13.5px;font-weight:700;margin-bottom:10px;color:var(--ink);}
.tag{display:inline-block;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;letter-spacing:.2px;}.tag-p1{background:var(--primary-light);color:var(--primary);}.tag-p2{background:var(--amber-lt);color:var(--amber);}.tag-p3{background:#F0EEE6;color:var(--ink-3);}.tag-new{background:var(--green-lt);color:var(--green);border:1.5px dashed var(--green);}.tag-seo{background:var(--blue-lt);color:var(--blue);}.tag-geo{background:var(--purple-lt);color:var(--purple);border:1.5px solid #C0A0FF;}
code.url,code{font-family:var(--mono);font-size:11px;background:#F0EEE6;padding:1px 7px;border-radius:4px;color:var(--ink-2);}
.funnel-flow{display:flex;flex-direction:column;gap:0;border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:24px;}.funnel-stage{padding:14px 16px;border-bottom:1px solid var(--border);}.funnel-stage:last-child{border-bottom:none;}.funnel-stage-label{font-size:9.5px;font-weight:700;letter-spacing:.8px;text-transform:uppercase;margin-bottom:5px;}.funnel-stage-title{font-size:14px;font-weight:800;margin-bottom:8px;}.funnel-stage-items{list-style:none;font-size:11.5px;color:var(--ink-2);line-height:1.7;}.funnel-stage-items li::before{content:"·  ";color:var(--ink-3);}
.fs-tofu{border-top:3px solid var(--green);}.fs-tofu .funnel-stage-label{color:var(--green);}.fs-mofu{border-top:3px solid var(--blue);}.fs-mofu .funnel-stage-label{color:var(--blue);}.fs-bofu{border-top:3px solid var(--primary);}.fs-bofu .funnel-stage-label{color:var(--primary);}.fs-convert{border-top:3px solid var(--amber);background:linear-gradient(135deg,#FFF8F0,#FFF3E0);}.fs-convert .funnel-stage-label{color:var(--amber);}
.callout{border-radius:var(--r);padding:14px 16px;margin-bottom:16px;font-size:12.5px;line-height:1.7;}.callout-primary{background:var(--primary-xlt);border:1px solid var(--primary-light);color:var(--primary-1);}.callout-green{background:var(--green-lt);border:1px solid #A0C890;color:#3D5C28;}.callout-amber{background:var(--amber-lt);border:1px solid #E8C080;color:#7A4A00;}.callout-red{background:var(--red-lt);border:1px solid #E0B0B0;color:#6A2020;}.callout-blue{background:var(--blue-lt);border:1px solid #A0C0E0;color:#2A4A70;}.callout-title{font-weight:800;margin-bottom:4px;font-size:12.5px;}
.table-scroll{overflow-x:auto;margin-bottom:24px;border-radius:var(--r);border:1px solid var(--border);}.data-table{width:100%;border-collapse:collapse;font-size:13px;}.data-table thead tr{background:#F0EEE6;}.data-table th{padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.5px;color:var(--ink-3);border-bottom:1px solid var(--border);}.data-table td{padding:10px 12px;border-bottom:1px solid var(--border);vertical-align:top;line-height:1.5;}.data-table tbody tr:last-child td{border-bottom:none;}.data-table tbody tr:hover{background:#FAFAF8;}
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r);padding:16px 18px;margin-bottom:12px;}.card-title{font-size:13.5px;font-weight:700;margin-bottom:7px;}.grid-2{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:24px;}.grid-3{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:24px;}
.kw-cluster{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:14px;}.kw-cluster-header{background:var(--ink);color:white;padding:9px 14px;font-size:12px;font-weight:700;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;}.kw-cluster-body{padding:10px 14px;}.kw-item{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border);font-size:12.5px;gap:6px;flex-wrap:wrap;}.kw-item:last-child{border-bottom:none;}.kw-text{font-weight:500;color:var(--ink);flex:1;}.kw-meta{display:flex;gap:5px;align-items:center;flex-shrink:0;}.kw-vol{font-family:var(--mono);font-size:10.5px;color:var(--ink-3);}.kw-intent{font-size:9.5px;font-weight:700;padding:1px 5px;border-radius:3px;}.intent-info{background:var(--green-lt);color:var(--green);}.intent-trans{background:var(--primary-light);color:var(--primary);}.intent-nav{background:var(--blue-lt);color:var(--blue);}.intent-comm{background:var(--amber-lt);color:var(--amber);}
.geo-block{background:#F0EDF8;border:1.5px solid #C8BCFC;border-radius:var(--r);padding:14px 16px;margin-bottom:12px;}.geo-block-label{font-size:9.5px;font-weight:800;letter-spacing:1px;text-transform:uppercase;color:var(--purple);margin-bottom:6px;display:flex;align-items:center;gap:5px;}.geo-block-q{font-size:13px;font-weight:700;color:var(--ink);margin-bottom:5px;font-style:italic;line-height:1.4;}.geo-block-a{font-size:12px;color:var(--ink-2);line-height:1.6;}
.scenario-grid{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:24px;}.scenario-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden;}.scenario-header{padding:12px 16px;background:var(--bg);border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;}.scenario-title{font-size:13px;font-weight:700;}.scenario-body{padding:14px 16px;}.scenario-step{display:flex;gap:10px;margin-bottom:10px;align-items:flex-start;font-size:12.5px;}.step-num{width:22px;height:22px;border-radius:50%;background:var(--primary);color:white;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0;}.step-text{color:var(--ink-2);line-height:1.5;padding-top:2px;}.scenario-result{background:var(--green-lt);border:1px solid #A0C890;border-radius:6px;padding:7px 12px;font-size:11.5px;font-weight:700;color:#3D5C28;margin-top:6px;}
.kpi-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:24px;}.kpi-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--r);padding:16px;text-align:center;}.kpi-value{font-size:24px;font-weight:900;letter-spacing:-1px;margin-bottom:3px;}.kpi-label{font-size:11.5px;color:var(--ink-3);font-weight:500;}.kpi-note{font-size:10px;color:var(--ink-3);margin-top:3px;}
.roadmap-grid{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:24px;}.roadmap-col{border:1.5px solid var(--border);border-radius:var(--r);overflow:hidden;}.roadmap-col-header{padding:10px 14px;display:flex;align-items:center;gap:10px;}.roadmap-col-body{padding:10px 14px;background:var(--surface);}.roadmap-item{font-size:11.5px;color:var(--ink-2);padding:5px 0;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:6px;line-height:1.4;}.roadmap-item:last-child{border-bottom:none;}.roadmap-item::before{content:"✓";color:var(--green);font-size:10.5px;flex-shrink:0;margin-top:1px;}
.divider{height:1px;background:var(--border);margin:24px 0;}
@media(min-width:640px){.stat-row{grid-template-columns:repeat(4,1fr);}.funnel-flow{flex-direction:row;}.funnel-stage{border-right:1px solid var(--border);border-bottom:none;}.funnel-stage:last-child{border-right:none;}.grid-2{grid-template-columns:1fr 1fr;}.grid-3{grid-template-columns:1fr 1fr;}.scenario-grid{grid-template-columns:1fr 1fr;}.roadmap-grid{grid-template-columns:1fr 1fr 1fr;}.kpi-grid{grid-template-columns:repeat(4,1fr);}.verdict-bar{flex-direction:row;align-items:center;padding:20px 24px;}.verdict-score{width:72px;height:72px;font-size:17px;}}
@media(min-width:1024px){.content{padding:36px 48px;}.page-title{font-size:24px;}h2.sh{font-size:17px;}.grid-3{grid-template-columns:1fr 1fr 1fr;}}
</style>`

  const js = `<script>
function go(id){document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));const sec=document.getElementById('s-'+id);if(sec)sec.classList.add('active');document.querySelectorAll('.nav-item').forEach(n=>{if(n.getAttribute('onclick')&&n.getAttribute('onclick').includes("'"+id+"'"))n.classList.add('active');});closeSidebar();window.scrollTo(0,0);}
function toggleSidebar(){const sb=document.getElementById('sidebar');const ov=document.getElementById('overlay');const hb=document.getElementById('hamburger');sb.classList.toggle('open');ov.classList.toggle('open');hb.classList.toggle('open');}
function closeSidebar(){document.getElementById('sidebar').classList.remove('open');document.getElementById('overlay').classList.remove('open');document.getElementById('hamburger').classList.remove('open');}
</script>`

  _templateCache = { css, js }
  return _templateCache
}

// ── Main export ───────────────────────────────────────────────────────────────
export function renderMarkdown(source: string): RenderResult {
  const { data, content } = matter(source)
  const meta = data as DocMeta

  // Split content by ## section-id markers
  const sectionRe = /^## ([a-z0-9_-]+)\s*$/gm
  const sectionIds: string[] = []
  const sectionContents: string[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = sectionRe.exec(content)) !== null) {
    if (sectionIds.length > 0) {
      sectionContents.push(content.slice(lastIndex, match.index))
    }
    sectionIds.push(match[1])
    lastIndex = match.index + match[0].length
  }
  if (sectionIds.length > 0) {
    sectionContents.push(content.slice(lastIndex))
  }

  // If no sections found, treat everything as 'overview'
  if (sectionIds.length === 0) {
    sectionIds.push('overview')
    sectionContents.push(content)
  }

  const sectionsHtml = sectionIds
    .map((id, i) => renderSection(id, sectionContents[i] || ''))
    .join('\n')

  const html = buildShell(meta, sectionsHtml)
  return { html, meta }
}
