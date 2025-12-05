// app/components/Sidebar.tsx
"use client";

import { useEffect } from "react";
import {
  LayoutDashboard, Users, ShoppingCart, Package,
  Warehouse, DollarSign, UserCheck, BarChart3, Settings, X
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../hooks/use-sidebar";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: ShoppingCart, label: "Orders", href: "/orders" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Warehouse, label: "Inventory", href: "/inventory" },
  { icon: DollarSign, label: "Pricing", href: "/pricing" },
  { icon: UserCheck, label: "Users", href: "/users" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useSidebar();

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      {/* Desktop Sidebar - แสดงเฉพาะ lg ขึ้นไป */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 top-20 w-64 bg-white border-r border-gray-200 z-40 shadow-sm">
        <nav className="p-5 pt-8 h-full overflow-y-auto">
          <ul className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.label === "Users" && (
                      <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile Drawer - แสดงเฉพาะต่ำกว่า lg */}
      <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${isOpen ? "opacity-50" : "opacity-0"}`}
          onClick={close}
        />
        <aside
          className={`absolute left-0 top-20 bottom-0 w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h3 className="text-lg font-bold">เมนู</h3>
            <button onClick={close} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-5">
            <ul className="space-y-1.5">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={close}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group ${
                        isActive ? "bg-blue-50 text-blue-700 shadow-sm" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}