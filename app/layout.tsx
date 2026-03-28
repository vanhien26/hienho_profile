import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Klaus — Growth Traffic Portfolio',
  description: 'SEO & GEO Lead, MoMo — Web Growth Strategy Documents',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
