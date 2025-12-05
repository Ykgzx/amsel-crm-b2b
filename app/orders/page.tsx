
// app/orders/page.tsx
import { Search, Download, Plus } from "lucide-react";

export default function OrdersPage() {
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

      {/* Filters - ตรงรูปเป๊ะ + กะทัดรัดสุด ๆ */}
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
            <input type="date" defaultValue="2025-12-04" className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white" />
            <select className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white">
              <option>Customer: All</option>
            </select>
          </div>

          {/* Payment + Min + Max */}
          <div className="grid grid-cols-3 gap-2">
            <select className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white">
              <option>Payment: All</option>
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

      {/* Table - เห็นเยอะสุด ไม่ต้องเลื่อน */}
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
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-orange-50/30 h-12">
                  <td className="px-3 py-2.5"><input type="checkbox" className="rounded border-orange-400" /></td>
                  <td className="px-3 py-2.5 font-medium text-orange-600">#{order.id}</td>
                  <td className="px-3 py-2.5 text-gray-600">
                    {order.date}<br /><span className="text-[10px] text-gray-500">{order.time}</span>
                  </td>
                  <td className="px-3 py-2.5 text-gray-900">{order.customer}</td>
                  <td className="px-3 py-2.5 text-center text-gray-700">{order.items}</td>
                  <td className="px-3 py-2.5 text-right font-semibold text-orange-600">${order.total.toLocaleString()}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${order.payment === "Paid" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-600"}`}>
                      {order.payment}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      order.status === "Processing" ? "bg-orange-100 text-orange-800" :
                      order.status === "Shipped" ? "bg-amber-100 text-amber-800" :
                      order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" :
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
      </div>
    </div>
  );
}

const orders = [
  { id: "ORD-2024-1234", date: "2025-12-03", time: "10:45", customer: "ABC Pharmacy Ltd", items: 12, total: 12450, payment: "Paid", status: "Processing" },
  { id: "ORD-2024-1233", date: "2025-12-02", time: "08:23", customer: "XYZ Healthcare", items: 8, total: 8234.5, payment: "Paid", status: "Shipped" },
  { id: "ORD-2024-1232", date: "2025-12-02", time: "15:15", customer: "MediCare Solutions", items: 5, total: 4567, payment: "Pending", status: "Pending" },
  { id: "ORD-2024-1231", date: "2025-12-01", time: "14:10", customer: "HealthPlus Clinic", items: 15, total: 18900, payment: "Paid", status: "Delivered" },
  { id: "ORD-2024-1230", date: "2025-12-01", time: "11:30", customer: "Wellness Center", items: 3, total: 3200, payment: "Paid", status: "Delivered" },
  // เพิ่มข้อมูลได้อีกเยอะ ๆ ตามต้องการ
];