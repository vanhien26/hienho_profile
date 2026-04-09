import type { Metadata } from "next";
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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
