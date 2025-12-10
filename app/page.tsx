// app/page.tsx
'use client';

import { Lock, Mail, LogIn, Shield, User, KeyRound } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ถ้า login สำเร็จ → เก็บข้อมูล admin ใน localStorage (หรือ cookie)
      localStorage.setItem("admin", JSON.stringify(data.admin));
      
      // แล้ว redirect ไปยัง dashboard หรือหน้าหลัก
      router.push("/dashboard"); // หรือหน้าที่คุณต้องการ

    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Premium Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 
                        transition-all duration-500 hover:shadow-3xl hover:-translate-y-1">
          
          {/* Gradient Header */}
          <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-8 py-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-20 translate-y-20"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-white/25 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl border border-white/40 
                              ring-4 ring-white/20">
                <Lock className="w-12 h-12 text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tight drop-shadow-lg">
                Amsel Admin
              </h1>
              <p className="mt-3 text-white/95 text-lg font-medium">
                เข้าสู่ระบบเพื่อจัดการหลังบ้าน
              </p>
            </div>
          </div>

          {/* Form Body */}
          <div className="px-8 pt-8 pb-10 space-y-7">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                  ชื่อผู้ใช้หรืออีเมล
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-orange-500 group-focus-within:text-orange-600 transition-colors" />
                  </div>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="กรอกชื่อผู้ใช้หรืออีเมล"
                    className="w-full pl-12 pr-5 py-4 bg-gray-50/70 border border-gray-300 rounded-2xl 
                               text-gray-900 placeholder-gray-500 text-base
                               focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 
                               hover:border-orange-400 hover:bg-gray-50 transition-all duration-300 
                               shadow-sm focus:shadow-lg"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <KeyRound className="w-5 h-5 text-orange-500 group-focus-within:text-orange-600 transition-colors" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="กรอกรหัสผ่านของคุณ"
                    className="w-full pl-12 pr-5 py-4 bg-gray-50/70 border border-gray-300 rounded-2xl 
                               text-gray-900 placeholder-gray-500 text-base
                               focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 
                               hover:border-orange-400 hover:bg-gray-50 transition-all duration-300 
                               shadow-sm focus:shadow-lg"
                  />
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full group relative overflow-hidden py-4 px-6 bg-gradient-to-r from-orange-500 to-amber-600 
                           ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-600 hover:to-amber-700'} text-white font-bold text-lg rounded-2xl 
                           shadow-lg hover:shadow-2xl transform hover:-translate-y-1 
                           transition-all duration-300 flex items-center justify-center gap-3`}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <LogIn className={`w-5 h-5 group-hover:translate-x-1 transition-transform duration-200 ${loading ? 'animate-spin' : ''}`} />
                <span className="relative">{loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}</span>
              </button>

              {/* Error Message */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 mt-4">
                  {error}
                </div>
              )}
            </form>

            {/* Footer Links */}
            <div className="text-center space-y-5 pt-6 border-t border-gray-100">
              <a
                href="#"
                className="inline-block text-orange-600 hover:text-orange-700 font-medium 
                           underline underline-offset-4 hover:underline-offset-2 transition-all duration-300"
              >
                ลืมรหัสผ่าน?
              </a>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <Shield className="w-4 h-4 text-green-500" />
                <span>การเชื่อมต่อของคุณปลอดภัยด้วยการเข้ารหัส SSL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-sm font-medium text-gray-600">
            © {new Date().getFullYear()} Amsel Admin. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Secured • Modern • Professional
          </p>
        </div>
      </div>
    </div>
  );
}