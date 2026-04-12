import type { Metadata } from "next";
import "./globals.css";
import { SidebarProvider } from "./context/sidebar";
import AppHeader from "./components/AppHeader";

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
        <SidebarProvider>
          <AppHeader />
          {children}
        </SidebarProvider>
      </body>
    </html>
  );
}
