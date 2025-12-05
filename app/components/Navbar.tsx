// app/components/Navbar.tsx
"use client";

import { Bell, LogOut, Menu } from "lucide-react";
import { useSidebar } from "../hooks/use-sidebar";

export default function Navbar() {
  const { toggle } = useSidebar();

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 shadow-xl z-50 border-b border-white/20 backdrop-blur-xl">
      <div className="h-full px-6 md:px-10 flex items-center justify-between">
        {/* ซ้าย: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="p-3 rounded-xl hover:bg-white/20 transition-all duration-200 lg:hidden"
          >
            <Menu className="w-7 h-7 text-white" />
          </button>

          <div className="flex items-center gap-4">
            {/* โลโก้วงกลมส้มขาว แบบเดียวกับหน้าเว็บ AMSEL */}
            <div className="w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <span className="text-3xl font-black text-orange-600">A</span>
            </div>

            {/* ชื่อแบรนด์ */}
            <div className="hidden sm:block">
              <h1 className="text-3xl font-black text-white tracking-tight">
                AMSEL
              </h1>
              <p className="text-xs text-white/80 -mt-1 tracking-wider font-medium">
                アムセル
              </p>
            </div>
          </div>
        </div>

        {/* ขวา: Notification + Profile + Logout */}
        <div className="flex items-center gap-5">

          {/* User Profile */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-white">Admin User</p>
              <p className="text-xs text-white/70">admin@amsel.co</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-400 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl border-2 border-white/30">
              A
            </div>
          </div>

          {/* Logout Button - สไตล์เหมือนปุ่มในเว็บ AMSEL */}
          <button className="flex items-center gap-2 px-6 py-3 bg-white/15 hover:bg-white/25 rounded-2xl transition-all duration-300 backdrop-blur-md border border-white/30 shadow-md hover:shadow-xl">
            <LogOut className="w-5 h-5 text-white" />
            <span className="hidden sm:inline text-white font-semibold">ออกจากระบบ</span>
          </button>
        </div>
      </div>
    </nav>
  );
}