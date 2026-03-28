export type Category = 'use-case' | 'knowledge'

export interface Project {
  id: string
  title: string
  subtitle: string
  category: Category
  tags: string[]
  status: 'live' | 'draft' | 'review'
  updatedAt: string
  description: string
  htmlFile?: string
  metrics?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    id: 'vay-nhanh-strategy',
    title: 'Vay Nhanh — Web Growth Strategy',
    subtitle: 'momo.vn/vay-nhanh',
    category: 'use-case',
    tags: ['SEO', 'Credit', 'Content Architecture'],
    status: 'live',
    updatedAt: '2026-03-20',
    description: 'Chiến lược tăng trưởng organic toàn diện cho vertical Vay Nhanh: keyword clustering, content structure, internal linking map và Credit Ecosystem Loop.',
    htmlFile: '/projects/vay-nhanh-strategy.html',
    metrics: [
      { label: 'Keywords tracked', value: '400+' },
      { label: 'Content clusters', value: '7' },
      { label: 'Priority pages', value: '12' },
    ],
  },
  {
    id: 'vi-tra-sau-bnpl',
    title: 'Ví Trả Sau — BNPL SEO Architecture',
    subtitle: 'momo.vn/vi-tra-sau',
    category: 'use-case',
    tags: ['BNPL', 'Internal Linking', 'Schema'],
    status: 'review',
    updatedAt: '2026-03-15',
    description: 'Kiến trúc thông tin và SEO cho sản phẩm BNPL: Trả Góp cluster, partner ecosystem tại momo.vn/doi-tac/{brand} với bidirectional linking.',
    metrics: [
      { label: 'Partner pages', value: '30+' },
      { label: 'Schema types', value: '4' },
    ],
  },
  {
    id: 'bao-hiem-xe-may',
    title: 'Bảo Hiểm Xe Máy — Organic Recovery',
    subtitle: 'momo.vn/bao-hiem-xe-may',
    category: 'use-case',
    tags: ['Insurance', 'Content Clusters', 'Link Building'],
    status: 'live',
    updatedAt: '2026-02-28',
    description: '~519 keywords, 7 clusters, phân tích sụt giảm organic traffic và growth tactics bao gồm link building automation, cross-sell ecosystem mapping.',
    metrics: [
      { label: 'Keywords', value: '519' },
      { label: 'Clusters', value: '7' },
      { label: 'Partners', value: '5' },
    ],
  },
  {
    id: 'bao-hiem-hub',
    title: 'Insurance Hub — Information Architecture',
    subtitle: 'momo.vn/bao-hiem',
    category: 'use-case',
    tags: ['IA', 'pSEO', 'Multi-product'],
    status: 'live',
    updatedAt: '2026-02-10',
    description: 'Hub cho 5 sản phẩm bảo hiểm (Y tế, Sức khỏe, Xe máy, Xã hội, Ô tô). BHYT restructured với pSEO 60+ provinces.',
    metrics: [
      { label: 'Products', value: '5' },
      { label: 'pSEO pages', value: '60+' },
    ],
  },
  {
    id: 'bao-hiem-o-to',
    title: 'Bảo Hiểm Ô Tô — Transaction Hub',
    subtitle: 'momo.vn/bao-hiem-o-to',
    category: 'use-case',
    tags: ['Auto Insurance', 'Template System', 'pSEO'],
    status: 'live',
    updatedAt: '2026-01-20',
    description: 'Content Hub vs Transaction Hub architecture. Template system tạo 43+ transaction pages từ JSON config. pSEO geo × model combinations.',
    metrics: [
      { label: 'Transaction pages', value: '43+' },
      { label: 'Insurance partners', value: '7' },
    ],
  },
  {
    id: 'doi-tac-directory',
    title: 'Partner Directory — SEO Sitemap',
    subtitle: 'momo.vn/doi-tac',
    category: 'use-case',
    tags: ['Directory', 'Schema', 'Credit Ecosystem'],
    status: 'draft',
    updatedAt: '2026-03-25',
    description: 'Sitemap design, Brand page components, schema markup cho partner directory. Credit Ecosystem Loop internal linking kết nối VTS product.',
  },
  {
    id: 'geo-framework',
    title: 'GEO Framework — Generative Engine Optimization',
    subtitle: 'Knowledge & Guideline',
    category: 'knowledge',
    tags: ['GEO', 'AI Overview', 'SGE'],
    status: 'live',
    updatedAt: '2026-03-10',
    description: 'Framework tối ưu nội dung cho AI-generated answers (SGE, Perplexity, ChatGPT). Áp dụng cho Fintech vertical với YMYL considerations.',
  },
  {
    id: 'jtbd-fintech',
    title: 'JTBD Analysis Skill — Fintech Verticals',
    subtitle: 'Knowledge & Guideline',
    category: 'knowledge',
    tags: ['JTBD', 'Framework', 'Search Intent'],
    status: 'live',
    updatedAt: '2026-03-18',
    description: 'Framework phân tích Jobs-to-be-Done cho các vertical Credit, Wallet/Payments, Insurance của MoMo. Loại bỏ bias auto insurance, áp dụng cross-vertical.',
  },
  {
    id: 'web-to-app-funnel',
    title: 'Web-to-App Conversion Playbook',
    subtitle: 'Knowledge & Guideline',
    category: 'knowledge',
    tags: ['PLG', 'Deep Link', 'CTA'],
    status: 'live',
    updatedAt: '2026-02-15',
    description: 'Playbook tối ưu Web-to-App pipeline: Deep links, Smart Banners, Contextual CTAs. Giảm friction từ organic click đến app install theo PLG mindset.',
  },
]
