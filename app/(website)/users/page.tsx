// app/users/page.tsx
'use client';

import { useState, useRef, useEffect } from "react";
import { Search, Download, Plus, User, Shield, Activity, Check, X, Eye, Edit } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State สำหรับ modal
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [company, setCompany] = useState("");
  const [roles, setRoles] = useState<string[]>([]);

  const modalRef = useRef<HTMLDivElement>(null);

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

  const handleApproveClick = (user: any) => {
    setSelectedUser(user);
    setCompany("");
    setRoles([]);
    setShowModal(true);
  };

  const handleRoleChange = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleConfirmApprove = () => {
    console.log("Mapping company submitted:", {
      userId: selectedUser.id,
      fullName: selectedUser.fullName,
      company,
      roles,
    });
    setShowModal(false);
  };

  // ปิด modal เมื่อคลิกนอกกล่อง
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal]);

  return (
    <div className="p-8 max-w-full mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-1">Home › User Management</div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      {/* Tabs & Buttons */}
      <div className="flex items-center justify-end mb-6">
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
              placeholder="Search users by name, email, or status..."
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 text-black"
            />
          </div>

          <select className="h-10 px-4 border border-gray-300 rounded-lg text-sm bg-white text-black">
            <option>Status: All</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Inactive</option>
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
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-center">Registrationcode</th>
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
                  <td className="px-4 py-3 text-gray-700">{user.phone}</td>
                  <td className="px-4 py-3 text-gray-700">{user.fullName}</td>
                  <td className="px-4 py-3 text-gray-600">{user.company}</td>
                  <td className="px-4 py-3 text-center text-gray-700 font-medium">
                    {user.registrationCode}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : user.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-sm space-x-2">
                    <button
                      onClick={() => handleApproveClick(user)}
                      className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs"
                    >
                      <Check className="w-3 h-3" /> Approve
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs">
                      <Eye className="w-3 h-3" /> View
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs">
                      <X className="w-3 h-3" /> Reject
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs">
                      <Edit className="w-3 h-3" /> Edit
                    </button>
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

      {/* Modal - Mapping company */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-md mx-4"
          >
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-8 text-center">Mapping company</h2>

              <div className="space-y-6">
                {/* Full name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Full name</label>
                  <div className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300">
                    {selectedUser?.fullName}
                  </div>
                </div>

                {/* Company - Dropdown */}
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                  >
                    <option value="">เลือกบริษัท</option>
                    <option value="Amsel Corporation">Amsel Corporation</option>
                    <option value="Thai Tech Solutions">Thai Tech Solutions</option>
                    <option value="Global Logistics Co.">Global Logistics Co.</option>
                    <option value="InnoSoft Ltd.">InnoSoft Ltd.</option>
                    <option value="Smart Retail Group">Smart Retail Group</option>
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <div className="space-y-3">
                    {["Viewer", "Approver", "Maker"].map((role) => (
                      <label key={role} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={roles.includes(role)}
                          onChange={() => handleRoleChange(role)}
                          className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                        />
                        <span>{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-10">
                <button
                  onClick={handleConfirmApprove}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock Data - 47 users (เหมือนเดิม)
const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@amsel.com",
    phone: "+66 81 234 5678",
    fullName: "John Michael Smith",
    company: "Amsel Corporation",
    registrationCode: "REG-001",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@amsel.com",
    phone: "+66 92 345 6789",
    fullName: "Sarah Elizabeth Johnson",
    company: "Amsel Corporation",
    registrationCode: "REG-002",
    status: "Pending",
  },
  // ... ข้อมูลอื่น ๆ เหมือนเดิม (ย่อเพื่อความสั้น)
  ...Array.from({ length: 45 }, (_, i) => {
    const id = i + 3;
    const firstNames = ["Anna", "Ben", "Clara", "Daniel", "Eva", "Frank", "Grace", "Henry", "Isabella", "James"];
    const lastNames = ["Lee", "Kim", "Park", "Nguyen", "Wilson", "Taylor", "Moore", "Anderson", "Thomas", "Jackson"];
    const phonePrefixes = ["81", "82", "83", "84", "85", "86", "87", "88", "89", "90"];

    const statusOptions = ["Active", "Pending", "Inactive"];
    const status = statusOptions[i % 3];

    return {
      id,
      name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
      email: `user${id}@amsel.com`,
      phone: `+66 ${phonePrefixes[i % phonePrefixes.length]} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
      fullName: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]} ${lastNames[(i + 1) % lastNames.length]}`,
      company: "Amsel Corporation",
      registrationCode: `REG-${String(id).padStart(3, '0')}`,
      status,
    };
  }),
];