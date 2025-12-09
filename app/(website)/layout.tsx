// app/(website)/layout.tsx หรือ app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amsel B2B CRM",
  description: "Back Office Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className="h-full">
      {/* วิธีที่ใช้ได้จริง 100% ใน 16.0.7 + Turbopack */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
        suppressHydrationWarning // บรรทัดนี้สำคัญมาก!
      >
        <Navbar />
        <Sidebar />

        <main className="lg:ml-64 pt-28">
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}