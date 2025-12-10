// app/hooks/use-auth.ts
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export interface AdminUser {
  id: string;
  username: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.warn("Invalid admin data in localStorage");
      }
    }
    setLoading(false);
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch (err) {
      console.warn("Logout API failed (safe to ignore)");
    }
    localStorage.removeItem("admin");
    setUser(null);
    router.push("/");
  };

  return { user, loading, logout };
}