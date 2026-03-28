# Growth Traffic Portfolio — README

**Maintainer:** Klaus · SEO & GEO Lead · MoMo  
**Stack:** Next.js 14 · Tailwind CSS · Static Export  
**Last updated:** 2026-03-27

---

## Cấu trúc thư mục

```
growth-profile/
├── app/
│   ├── data/
│   │   └── projects.ts        ← ① Đăng ký metadata dự án/bài viết ở đây
│   └── projects/[id]/
│       └── ...                ← Tự động generate, không cần chỉnh
└── public/
    └── projects/              ← ② Đặt file HTML tài liệu vào đây
```

---

## Thêm tài liệu mới — 2 bước

### Bước 1 — Đặt file HTML vào `public/projects/`

```
public/projects/
├── vay-nhanh-strategy.html         ✅ đã có
├── ten-du-an-moi.html              ← đặt file mới vào đây
└── ...
```

**Quy tắc đặt tên file:**
- Dùng kebab-case, viết thường, không dấu
- Tên file = slug của dự án (dùng lại ở Bước 2)
- Ví dụ: `tra-cuu-cic-strategy.html`, `geo-framework-v2.html`

---

### Bước 2 — Đăng ký metadata trong `app/data/projects.ts`

Mở file `app/data/projects.ts`, thêm 1 object vào mảng `projects[]`:

```ts
{
  id: 'ten-du-an-moi',                        // phải khớp với tên file HTML (không có .html)
  title: 'Tiêu đề hiển thị trên UI',
  subtitle: 'momo.vn/duong-dan',              // URL hoặc context ngắn
  category: 'use-case',                       // 'use-case' | 'knowledge'
  tags: ['SEO', 'Credit'],                    // xem danh sách tag bên dưới
  status: 'live',                             // 'live' | 'review' | 'draft'
  updatedAt: '2026-03-27',                    // YYYY-MM-DD
  description: 'Mô tả ngắn hiển thị trên card (~2 dòng)',
  htmlFile: '/projects/ten-du-an-moi.html',   // đường dẫn tới file ở public/
  metrics: [                                  // tuỳ chọn — hiển thị số liệu nổi bật
    { label: 'Keywords', value: '300+' },
    { label: 'Clusters', value: '5' },
  ],
},
```

> **Lưu ý:** Nếu tài liệu chưa có file HTML (mới chỉ có ý tưởng/outline), bỏ qua trường `htmlFile`. App sẽ hiển thị placeholder card — thêm file sau khi có.

---

## Phân loại `category`

| Value | Sidebar section | Dùng khi |
|---|---|---|
| `use-case` | 📋 Use Case Document | Chiến lược, IA, content plan cho 1 vertical cụ thể |
| `knowledge` | 🧠 Knowledge & Guideline | Framework, playbook, guideline dùng cross-vertical |

---

## Danh sách `tags` hiện có

Copy từ danh sách này để đảm bảo màu tag render đúng:

```
SEO · GEO · PLG · JTBD · Framework · Schema · IA · pSEO
Credit · BNPL · Insurance · Auto Insurance · Multi-product
Content Architecture · Content Clusters · Internal Linking
Link Building · Template System · Directory · Credit Ecosystem
Search Intent · Deep Link · CTA · AI Overview · SGE
```

Tag nằm ngoài danh sách vẫn render được — màu fallback xám. Nếu dùng thường xuyên thì thêm vào `tagColors` trong `ProjectDetailClient.tsx` và `page.tsx`.

---

## Trạng thái `status`

| Value | Badge | Ý nghĩa |
|---|---|---|
| `live` | 🟢 LIVE | Tài liệu hoàn chỉnh, đang áp dụng |
| `review` | 🟡 REVIEW | Đang review / chờ feedback |
| `draft` | ⚪ DRAFT | Work in progress, chưa publish |

---

## Chạy local sau khi thêm tài liệu

```bash
npm run dev
# → http://localhost:3000
```

Không cần restart — Next.js hot reload tự pick up thay đổi trong `projects.ts`.

---

## Build & deploy

```bash
npm run build
# → sinh ra folder out/ (static HTML/CSS/JS)
```

Deploy folder `out/` lên bất kỳ static host nào:
- **Vercel:** `vercel --prod` từ root project
- **Netlify:** drag & drop folder `out/`
- **S3 / CloudFront:** sync folder `out/`

> ⚠️ Sau mỗi lần thêm dự án mới, cần build lại để static pages được generate.

---

## Ví dụ thực tế — thêm "Tra Cứu CIC Strategy"

```bash
# 1. Copy file HTML
cp ~/Downloads/tra-cuu-cic-strategy.html public/projects/
```

```ts
// 2. Thêm vào app/data/projects.ts
{
  id: 'tra-cuu-cic-strategy',
  title: 'Tra Cứu CIC — Credit Score SEO',
  subtitle: 'momo.vn/tra-cuu-cic',
  category: 'use-case',
  tags: ['SEO', 'Credit', 'pSEO'],
  status: 'review',
  updatedAt: '2026-03-27',
  description: 'Chiến lược SEO cho vertical Tra Cứu CIC: phân tầng hạng 1–7, content cluster theo score band, internal linking vào Credit Ecosystem Loop.',
  htmlFile: '/projects/tra-cuu-cic-strategy.html',
  metrics: [
    { label: 'CIC tiers', value: '7' },
    { label: 'Target keywords', value: '150+' },
  ],
},
```

```bash
# 3. Kiểm tra
npm run dev
# → Mở http://localhost:3000/projects/tra-cuu-cic-strategy
```

---

*Mỗi file HTML tài liệu là self-contained — giữ nguyên style, sidebar, và interactive logic bên trong. App chỉ wrap bằng iframe, không can thiệp vào nội dung.*
