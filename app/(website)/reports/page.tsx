// app/reports/page.tsx
'use client';

import { Search, Download, Calendar, TrendingUp, DollarSign, Package, Users } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ReportsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const itemsPerPage = 10;
  const totalItems = reports.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedReports = reports.slice(
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
    <div className="p-8 w-full mx-auto">

      {/* Header */}
      <div className="mb-4">
        <div className="text-xs text-gray-500">Home › Reports</div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      </div>

      {/* Top Actions */}
      <div className="flex justify-end gap-2 mb-6">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700">
          <Calendar className="w-3.5 h-3.5" /> Schedule Report
        </button>
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-sm">
          <Download className="w-3.5 h-3.5" /> Export All
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$248,920</p>
              <p className="text-xs text-emerald-600 mt-1">+12.5% from last month</p>
            </div>
            <DollarSign className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,284</p>
              <p className="text-xs text-emerald-600 mt-1">+8.3% from last month</p>
            </div>
            <Package className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Active Customers</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">892</p>
              <p className="text-xs text-orange-600 mt-1">+2.1% from last month</p>
            </div>
            <Users className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Avg. Order Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$193.85</p>
              <p className="text-xs text-emerald-600 mt-1">+5.7% from last month</p>
            </div>
            <TrendingUp className="w-10 h-10 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center">
          <div className="relative lg:col-span-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full h-9 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            />
          </div>

          <select className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white lg:col-span-2">
            <option>Report Type: All</option>
            <option>Sales Report</option>
            <option>Inventory Report</option>
            <option>Customer Report</option>
          </select>

          <input
            type="date"
            defaultValue="2025-11-01"
            className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white lg:col-span-2"
          />
          <input
            type="date"
            defaultValue="2025-12-08"
            className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white lg:col-span-2"
          />

          <div className="flex gap-2 lg:col-span-2 lg:justify-end">
            <button className="h-9 px-5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs text-gray-600">
              Clear
            </button>
            <button className="h-9 px-7 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-medium">
              <tr>
                <th className="px-4 py-3 text-left">Report Name</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Generated On</th>
                <th className="px-4 py-3 text-left">Period</th>
                <th className="px-4 py-3 text-right">Revenue</th>
                <th className="px-4 py-3 text-center">Orders</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedReports.map((report) => (
                <tr key={report.id} className="hover:bg-orange-50/30 transition h-14">
                  <td className="px-4 py-3 font-medium text-gray-900">{report.name}</td>
                  <td className="px-4 py-3 text-gray-600">{report.type}</td>
                  <td className="px-4 py-3 text-gray-600">{report.generated}</td>
                  <td className="px-4 py-3 text-gray-600">{report.period}</td>
                  <td className="px-4 py-3 text-right font-semibold text-orange-600">
                    ${report.revenue.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">{report.orders}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${report.status === "Completed" ? "bg-emerald-100 text-emerald-800" : "bg-orange-100 text-orange-800"}`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    <button className="text-orange-600 hover:underline mr-3">View</button>
                    <button className="text-orange-600 hover:underline">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} reports
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`px-4 py-1.5 rounded border ${currentPage <= 1 ? "opacity-50 cursor-not-allowed border-gray-300" : "border-gray-300 hover:bg-gray-50"}`}
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
                  className={`w-8 h-8 rounded text-xs font-medium ${currentPage === page ? "bg-orange-500 text-white" : "border border-gray-300 hover:bg-gray-50"}`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`px-4 py-1.5 rounded border ${currentPage >= totalPages ? "opacity-50 cursor-not-allowed border-gray-300" : "border-gray-300 hover:bg-gray-50"}`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock Data
const reports = [
  { id: 1, name: "Monthly Sales Report - November 2025", type: "Sales", generated: "2025-12-01", period: "Nov 1 - Nov 30, 2025", revenue: 248920, orders: 1284, status: "Completed" },
  { id: 2, name: "Top Products Report", type: "Products", generated: "2025-12-05", period: "Oct - Nov 2025", revenue: 186450, orders: 892, status: "Completed" },
  { id: 3, name: "Inventory Valuation Report", type: "Inventory", generated: "2025-12-08", period: "Dec 8, 2025", revenue: 3210000, orders: 0, status: "Processing" },
  { id: 4, name: "Customer Growth Report", type: "Customers", generated: "2025-11-30", period: "Q4 2025", revenue: 0, orders: 156, status: "Completed" },
  { id: 5, name: "Weekly Performance Summary", type: "Sales", generated: "2025-12-08", period: "Dec 2 - Dec 8, 2025", revenue: 45820, orders: 234, status: "Completed" },
  ...Array.from({ length: 35 }, (_, i) => ({
    id: i + 6,
    name: `Report ${i + 6} - ${["Sales", "Inventory", "Customers", "Marketing"][i % 4]} Summary`,
    type: ["Sales", "Inventory", "Products", "Customers"][i % 4],
    generated: `2025-${String(11 + Math.floor(i / 10)).padStart(2, "0")}-${String(1 + (i % 30)).padStart(2, "0")}`,
    period: `${["Q4 2025", "Nov 2025", "Oct-Nov 2025", "Weekly"][i % 4]}`,
    revenue: Math.floor(Math.random() * 300000) + 20000,
    orders: Math.floor(Math.random() * 1000) + 100,
    status: i % 7 === 0 ? "Processing" : "Completed"
  }))
];