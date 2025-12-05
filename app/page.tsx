// app/page.tsx
import { Download, Plus, ChevronRight, AlertTriangle } from "lucide-react";

export default function Home() {
  return (
    <div className="p-8 w-full mx-auto">

      {/* Header */}
      <div className="mb-5">
        <div className="text-sm text-gray-500 mb-1">Home › Dashboard</div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      </div>

      {/* Top Actions */}
      <div className="flex justify-end gap-3 mb-5">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
          <Download className="w-4 h-4" /> Export Data
        </button>
        <button className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium shadow-sm transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* Key Metrics - 4 การ์ด กะทัดรัด สวยงาม */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <MetricCard title="Total Revenue" value="$1,245,678" change="+12.5%" />
        <MetricCard title="Active Customers" value="1,847" change="+23 this week" />
        <MetricCard title="Pending Orders" value="127" change="15 need action" />
        <MetricCard title="Low Stock" value="34" change="Reorder now" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent Orders - ขนาดเท่ากับหน้า Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <a href="/orders" className="text-sm text-orange-600 hover:text-orange-700 font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-2.5 text-left">Order ID</th>
                  <th className="px-4 py-2.5 text-left">Customer</th>
                  <th className="px-4 py-2.5 text-left">Date</th>
                  <th className="px-4 py-2.5 text-left">Total</th>
                  <th className="px-4 py-2.5 text-left">Status</th>
                  <th className="px-4 py-2.5 text-left"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-orange-50/30 h-12">
                    <td className="px-4 py-3 font-medium text-orange-600">#{order.id}</td>
                    <td className="px-4 py-3 text-gray-700">{order.customer}</td>
                    <td className="px-4 py-3 text-gray-600">{order.date}</td>
                    <td className="px-4 py-3 font-semibold text-orange-600">${order.total}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${order.status === "Processing" ? "bg-orange-100 text-orange-800" : order.status === "Shipped" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-orange-600 hover:underline text-xs font-medium">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions - กะทัดรัด เรียบ */}
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium text-sm shadow-sm transition flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> New Order
            </button>
            <button className="w-full border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 py-2.5 rounded-lg text-sm font-medium transition">
              Add Customer
            </button>
            <button className="w-full border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 py-2.5 rounded-lg text-sm font-medium transition">
              Add Product
            </button>
            <button className="w-full border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 py-2.5 rounded-lg text-sm font-medium transition">
              Update Stock
            </button>
          </div>
        </div>
      </div>

      {/* Alerts - กะทัดรัด เรียบ */}
      <div className="mt-5 bg-orange-50 border border-orange-200 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-orange-900 text-sm">Alerts</h3>
        </div>
        <ul className="space-y-2 text-xs text-orange-800 font-medium">
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            15 orders require approval
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            34 products low in stock
          </li>
          <li className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-orange-600 rounded-full"></span>
            3 payments overdue
          </li>
        </ul>
      </div>
    </div>
  );
}

// Metric Card - ขนาดเล็ก เรียบ สวย
function MetricCard({ title, value, change }: { title: string; value: string; change: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 rounded-xl hover:shadow-md transition">
      <p className="text-xs font-medium text-gray-600 uppercase">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      <p className="text-xs text-orange-600 font-medium mt-2 flex items-center gap-1">
        Up {change}
      </p>
    </div>
  );
}

// ข้อมูลตัวอย่าง Recent Orders
const recentOrders = [
  { id: "ORD-2024-1234", customer: "ABC Pharmacy Ltd", date: "2025-12-03", total: "12,450", status: "Processing" },
  { id: "ORD-2024-1233", customer: "XYZ Healthcare", date: "2025-12-02", total: "8,234", status: "Shipped" },
  { id: "ORD-2024-1232", customer: "MediCare Solutions", date: "2025-12-02", total: "4,567", status: "Pending" },
  { id: "ORD-2024-1231", customer: "HealthPlus Clinic", date: "2025-12-01", total: "18,900", status: "Delivered" },
  { id: "ORD-2024-1230", customer: "Wellness Center", date: "2025-12-01", total: "3,200", status: "Delivered" },
];