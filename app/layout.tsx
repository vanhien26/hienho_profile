import type { Metadata } from "next";
import Link from "next/link";
import { Shield } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Growth Profile",
  description: "Growth Profile tracking tool",
  icons: {
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-[#FCF9F7] text-[#1F1A17]">
        <header className="sticky top-0 z-50 border-b border-[#E8E0E6] bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
            <div className="text-sm font-semibold text-[#3C2D35]">MoMo <span style={{fontWeight: 'bold', color: '#AE2070'}}>Out-App Traffic</span></div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-full border border-[#E4DDD6] bg-[#FBF7F8] px-4 py-2 text-sm font-semibold text-[#5B3A53] shadow-sm transition hover:bg-[#F3E6F5]"
            >
              <Shield size={16} /> Admin
            </Link>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
