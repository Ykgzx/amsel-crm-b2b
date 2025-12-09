// app/users/page.tsx
'use client';

import { Search, Download, Plus, User, Shield, Activity } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const itemsPerPage = 10;
  const totalItems = users.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 5, "ellipsis", totalPages];
    if (currentPage >= totalPages - 2) return [1, "ellipsis", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  };

  return (
    <div className="p-8 max-w-full mx-auto">

      {/* Header */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-1">Home › User Management</div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <User className="w-4 h-4" /> Users
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Roles & Permissions
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center gap-2">
            <Activity className="w-4 h-4" /> Activity Log
          </button>
        </div>

        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by name, email, or role..."
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <select className="h-10 px-4 border border-gray-300 rounded-lg text-sm bg-white">
            <option>Role: All</option>
            <option>Administrator</option>
            <option>Sales Manager</option>
            <option>Warehouse Manager</option>
          </select>

          <select className="h-10 px-4 border border-gray-300 rounded-lg text-sm bg-white">
            <option>Status: All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <select className="h-10 px-4 border border-gray-300 rounded-lg text-sm bg-white">
            <option>Department: All</option>
            <option>IT</option>
            <option>Sales</option>
            <option>Operations</option>
          </select>

          <button className="h-10 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
            Apply
          </button>

          <div className="text-sm text-gray-600 ml-auto">
            Total: <span className="font-bold">{totalItems}</span> users
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-medium text-xs">
              <tr>
                <th className="px-4 py-3 text-left"><input type="checkbox" className="rounded border-gray-400" /></th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Department</th>
                <th className="px-4 py-3 text-left">Last Login</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedUsers.map((user) => (
                <tr key={user.id} className="hover:bg-orange-50/30 transition h-16">
                  <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-400" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{user.email}</td>
                  <td className="px-4 py-3 text-gray-700">{user.role}</td>
                  <td className="px-4 py-3 text-gray-700">{user.department}</td>
                  <td className="px-4 py-3 text-gray-600">{user.lastLogin}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm">
                    <button className="text-orange-600 hover:underline mr-3">View</button>
                    <button className="text-orange-600 hover:underline mr-3">Edit</button>
                    <button className="text-red-600 hover:underline">Deactivate</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} users
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`px-4 py-2 rounded border ${currentPage <= 1 ? "opacity-50 cursor-not-allowed border-gray-300" : "border-gray-300 hover:bg-gray-50"}`}
            >
              Previous
            </button>

            {getPageNumbers().map((page, i) =>
              page === "ellipsis" ? (
                <span key={`ellipsis-${i}`} className="px-2">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`w-10 h-10 rounded ${currentPage === page ? "bg-orange-500 text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`px-4 py-2 rounded border ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed border-gray-300" : "border-gray-300 hover:bg-gray-50"}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock Data - 47 users
const users = [
  { id: 1, name: "John Smith", email: "john.smith@amsel.com", role: "Administrator", department: "IT", lastLogin: "2 hours ago", status: "Active" },
  { id: 2, name: "Sarah Johnson", email: "sarah.j@amsel.com", role: "Sales Manager", department: "Sales", lastLogin: "1 day ago", status: "Active" },
  { id: 3, name: "Michael Chen", email: "m.chen@amsel.com", role: "Customer Service", department: "Support", lastLogin: "3 hours ago", status: "Active" },
  { id: 4, name: "Emily Davis", email: "emily.d@amsel.com", role: "Warehouse Manager", department: "Operations", lastLogin: "15 days ago", status: "Inactive" },
  { id: 5, name: "David Brown", email: "david.b@amsel.com", role: "Marketing", department: "Marketing", lastLogin: "5 hours ago", status: "Active" },
  // ... เพิ่มอีก 42 รายการตามต้องการ (หรือใช้ Array.from เพื่อ generate)
  ...Array.from({ length: 42 }, (_, i) => ({
    id: i + 6,
    name: `User ${i + 6}`,
    email: `user${i + 6}@amsel.com`,
    role: ["Sales", "Support", "IT", "Operations"][i % 4],
    department: ["Sales", "Support", "IT", "Operations"][i % 4],
    lastLogin: `${i % 10 === 0 ? "1 week ago" : i % 5 === 0 ? "2 days ago" : "Today"}`,
    status: i % 8 === 0 ? "Inactive" : "Active"
  }))
];