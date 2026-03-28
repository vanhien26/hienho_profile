import type { Metadata } from "next";
import "./globals.css";
import PasscodeGuard from "./components/PasscodeGuard";

export const metadata: Metadata = {
  title: "Growth Profile",
  description: "Growth Profile tracking tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PasscodeGuard>
          {children}
        </PasscodeGuard>
      </body>
    </html>
  );
}
