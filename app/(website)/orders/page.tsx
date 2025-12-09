// app/orders/page.tsx
'use client';

import { Search, Download, Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pagination
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const itemsPerPage = 5;
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-8 w-full mx-auto">

      {/* Header */}
      <div className="mb-4">
        <div className="text-xs text-gray-500">Home › Orders</div>
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
      </div>

      {/* Top Actions */}
      <div className="flex justify-end gap-2 mb-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
        <button className="px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700">
          Bulk Actions
        </button>
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-sm">
          <Plus className="w-3.5 h-3.5" /> New Order
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="space-y-3">

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID, Customer name, or Product..."
              className="w-full h-9 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            />
          </div>

          {/* Status + Date + Customer */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <select className="h-9 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 text-xs bg-white">
              <option>Status: All</option>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
            <input type="date" defaultValue="2025-11-01" className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white" />
            <input type="date" defaultValue="2025-12-08" className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white" />
            <select className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white">
              <option>Customer: All</option>
            </select>
          </div>

          {/* Payment + Min + Max */}
          <div className="grid grid-cols-3 gap-2">
            <select className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white">
              <option>Payment: All</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>
            <input type="number" placeholder="Min $" className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-gray-50" />
            <input type="number" placeholder="Max $" className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-gray-50" />
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-sm">
              All (2,456)
            </button>
            <button className="px-3.5 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-700 rounded-lg text-xs border">
              Pending (127)
            </button>
            <button className="px-3.5 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-700 rounded-lg text-xs border">
              Processing (84)
            </button>
            <button className="px-3.5 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-700 rounded-lg text-xs border">
              Shipped (156)
            </button>
            <button className="px-3.5 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-700 rounded-lg text-xs border">
              Delivered (2,019)
            </button>
          </div>

          {/* Clear + Apply */}
          <div className="flex justify-end gap-3">
            <button className="h-9 px-6 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs text-gray-600">
              Clear
            </button>
            <button className="h-9 px-8 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Table + Pagination */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
              <tr>
                <th className="px-3 py-2.5 text-left"><input type="checkbox" className="rounded border-orange-400" /></th>
                <th className="px-3 py-2.5 text-left">Order ID</th>
                <th className="px-3 py-2.5 text-left">Date</th>
                <th className="px-3 py-2.5 text-left">Customer</th>
                <th className="px-3 py-2.5 text-center">Items</th>
                <th className="px-3 py-2.5 text-right">Total</th>
                <th className="px-3 py-2.5 text-center">Payment</th>
                <th className="px-3 py-2.5 text-center">Status</th>
                <th className="px-3 py-2.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50/30 h-12">
                  <td className="px-3 py-2.5"><input type="checkbox" className="rounded border-orange-400" /></td>
                  <td className="px-3 py-2.5 font-medium text-orange-600">#{order.id}</td>
                  <td className="px-3 py-2.5 text-gray-600">
                    {order.date}<br />
                    <span className="text-[10px] text-gray-500">{order.time}</span>
                  </td>
                  <td className="px-3 py-2.5 text-gray-900 font-medium">{order.customer}</td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{order.items}</td>
                  <td className="px-3 py-2.5 text-right font-semibold text-orange-600">
                    ${order.total.toLocaleString()}
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      order.payment === "Paid" 
                        ? "bg-orange-100 text-orange-800" 
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      order.status === "Processing" ? "bg-orange-100 text-orange-800" :
                      order.status === "Shipped" ? "bg-amber-100 text-amber-800" :
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" :
                      order.status === "Pending" ? "bg-gray-100 text-gray-600" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center text-xs">
                    <button className="text-orange-600 hover:underline mr-2">View</button>
                    <button className="text-gray-600 hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} orders
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1}
              className={`px-4 py-1.5 rounded border ${
                currentPage <= 1
                  ? "opacity-50 cursor-not-allowed border-gray-300"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-8 h-8 rounded text-xs font-medium ${
                  currentPage === page
                    ? "bg-orange-500 text-white"
                    : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className={`px-4 py-1.5 rounded border ${
                currentPage >= totalPages
                  ? "opacity-50 cursor-not-allowed border-gray-300"
                  : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock Data - 25 รายการ = 5 หน้าเต็ม
const orders = [
  { id: "ORD-2024-1234", date: "2025-12-08", time: "14:32", customer: "ABC Pharmacy Ltd", items: 12, total: 12450, payment: "Paid", status: "Processing" },
  { id: "ORD-2024-1233", date: "2025-12-08", time: "11:15", customer: "XYZ Healthcare", items: 8, total: 8234.5, payment: "Paid", status: "Shipped" },
  { id: "ORD-2024-1232", date: "2025-12-07", time: "16:48", customer: "MediCare Hospital", items: 5, total: 4567, payment: "Pending", status: "Pending" },
  { id: "ORD-2024-1231", date: "2025-12-07", time: "09:22", customer: "HealthPlus Clinic", items: 18, total: 18900, payment: "Paid", status: "Delivered" },
  { id: "ORD-2024-1230", date: "2025-12-06", time: "13:10", customer: "VitaShop Bangkok", items: 9, total: 9870, payment: "Paid", status: "Delivered" },

  { id: "ORD-2024-1229", date: "2025-12-06", time: "10:05", customer: "PrimeCare Chiangmai", items: 6, total: 6780, payment: "Paid", status: "Shipped" },
  { id: "ORD-2024-1228", date: "2025-12-05", time: "15:44", customer: "Sunshine Pharmacy", items: 15, total: 15670, payment: "Paid", status: "Processing" },
  { id: "ORD-2024-1227", date: "2025-12-05", time: "08:30", customer: "GreenLife Clinic", items: 4, total: 3200, payment: "Pending", status: "Pending" },
  { id: "ORD-2024-1226", date: "2025-12-04", time: "17:12", customer: "ProHealth Center", items: 22, total: 29800, payment: "Paid", status: "Delivered" },
  { id: "ORD-2024-1225", date: "2025-12-04", time: "11:58", customer: "Wellness Hub", items: 7, total: 7450, payment: "Paid", status: "Shipped" },

  { id: "ORD-2024-1224", date: "2025-12-03", time: "14:20", customer: "CityMed Pharmacy", items: 11, total: 11200, payment: "Paid", status: "Delivered" },
  { id: "ORD-2024-1223", date: "2025-12-03", time: "09:45", customer: "NorthStar Hospital", items: 19, total: 23400, payment: "Paid", status: "Processing" },
  { id: "ORD-2024-1222", date: "2025-12-02", time: "16:33", customer: "HappyLife Clinic", items: 5, total: 4890, payment: "Pending", status: "Pending" },
  { id: "ORD-2024-1221", date: "2025-12-02", time: "12:10", customer: "BestCare Distributor", items: 25, total: 35670, payment: "Paid", status: "Shipped" },
  { id: "ORD-2024-1220", date: "2025-12-01", time: "10:25", customer: "PureHealth Shop", items: 8, total: 8900, payment: "Paid", status: "Delivered" },

  { id: "ORD-2024-1219", date: "2025-12-01", time: "15:50", customer: "Elite Pharmacy", items: 14, total: 17800, payment: "Paid", status: "Delivered" },
  { id: "ORD-2024-1218", date: "2025-11-30", time: "11:15", customer: "Central Hospital", items: 10, total: 13450, payment: "Paid", status: "Processing" },
  { id: "ORD-2024-1217", date: "2025-11-30", time: "08:40", customer: "Family Clinic", items: 6, total: 5670, payment: "Pending", status: "Pending" },
  { id: "ORD-2024-1216", date: "2025-11-29", time: "14:22", customer: "ThaiMed Supply", items: 28, total: 42300, payment: "Paid", status: "Shipped" },
  { id: "ORD-2024-1215", date: "2025-11-29", time: "10:08", customer: "SmartCare Pharmacy", items: 9, total: 9870, payment: "Paid", status: "Delivered" },

  { id: "ORD-2024-1214", date: "2025-11-28", time: "16:55", customer: "Golden Clinic", items: 7, total: 7890, payment: "Paid", status: "Delivered" },
  { id: "ORD-2024-1213", date: "2025-11-28", time: "13:30", customer: "Metro Pharmacy", items: 16, total: 19800, payment: "Paid", status: "Processing" },
  { id: "ORD-2024-1212", date: "2025-11-27", time: "09:12", customer: "Unity Hospital", items: 20, total: 26700, payment: "Paid", status: "Shipped" },
  { id: "ORD-2024-1211", date: "2025-11-27", time: "11:45", customer: "CarePlus Shop", items: 4, total: 4560, payment: "Pending", status: "Pending" },
  { id: "ORD-2024-1210", date: "2025-11-26", time: "15:20", customer: "Future Health Co.", items: 30, total: 45670, payment: "Paid", status: "Delivered" },
];