// app/page.tsx
'use client';

import { Lock, Mail, LogIn, KeyRound, Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        // แสดง SweetAlert สำเร็จ (ภาษาไทย)
        await MySwal.fire({
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ!",
          text: "กำลังพาคุณไปยังแดชบอร์ด...",
          timer: 1800,
          timerProgressBar: true,
          showConfirmButton: false,
          allowOutsideClick: false,
          allowEscapeKey: false,
        });

        router.push("/dashboard");
      }
    } catch (err: any) {
      // แสดง SweetAlert ข้อผิดพลาด (ภาษาไทยสวยๆ)
      MySwal.fire({
        icon: "error",
        title: "ไม่สามารถเข้าสู่ระบบได้",
        text: err.message || "กรุณาตรวจสอบอีเมลและรหัสผ่านอีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#f97316", // สีส้มให้เข้ากับธีม
      });
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
              <div className="w-15 h-15 mx-auto mb-6 bg-white/25 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl border border-white/40 
                              ring-4 ring-white/20">
                <Lock className="w-8 h-8 text-white" strokeWidth={2.5} />
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
              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2 pl-1">
                  อีเมล
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-orange-500 group-focus-within:text-orange-600 transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="กรอกอีเมลของคุณ"
                    className="w-full pl-12 pr-5 py-4 bg-gray-50/70 border border-gray-300 rounded-2xl 
                               text-gray-900 placeholder-gray-500 text-base
                               focus:outline-none focus:ring-4 focus:ring-orange-500/30 focus:border-orange-500 
                               hover:border-orange-400 hover:bg-gray-50 transition-all duration-300 
                               shadow-sm focus:shadow-lg"
                  />
                </div>
              </div>

              {/* Password */}
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
                  ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:from-orange-600 hover:to-amber-700'} 
                  text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 
                  transition-all duration-300 flex items-center justify-center gap-3`}
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>

                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                )}

                <span className="relative">
                  {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
                </span>
              </button>

              {/* ลบ error box เดิมออก เพราะใช้ SweetAlert แทน */}
            </form>
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