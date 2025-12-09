// app/page.tsx
import { Download, Plus, ChevronRight, AlertTriangle, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8 w-full mx-auto">

      {/* Header */}
      <div className="mb-5">
        <div className="text-sm text-gray-500 mb-1">Home › Dashboard</div>
        <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      </div>

      {/* Top Actions */}
      <div className="flex justify-end gap-3 mb-6">
        <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700">
          <Download className="w-4 h-4" /> Export Data
        </button>
        <button className="flex items-center gap-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium shadow-sm transition">
          <TrendingUp className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* กราฟยอดขาย 7 วันล่าสุด (ใต้ Header) */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Sales Overview (Last 7 Days)</h3>
          <div className="text-sm text-gray-600">Dec 2 - Dec 8, 2025</div>
        </div>
        <div className="h-64 flex items-end justify-between gap-3">
          {[85, 92, 78, 110, 95, 125, 138].map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-orange-100 rounded-t-lg relative" style={{ height: `${value}%` }}>
                <div
                  className="absolute inset-x-0 bottom-0 bg-orange-500 rounded-t-lg transition-all"
                  style={{ height: `${value}%` }}
                />
              </div>
              <span className="text-xs text-gray-600">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4 text-sm">
          <div className="text-gray-600">Total: <span className="font-bold text-orange-600">$72,380</span></div>
          <div className="text-emerald-600 font-medium">+18.2% from last week</div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Total Revenue" value="$1,245,678" change="+12.5%" isPositive />
        <MetricCard title="Active Customers" value="1,847" change="+23 this week" isPositive />
        <MetricCard title="Pending Orders" value="127" change="15 need action" />
        <MetricCard title="Low Stock" value="34" change="Reorder now" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Orders */}
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
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                        order.status === "Processing" ? "bg-orange-100 text-orange-800" :
                        order.status === "Shipped" ? "bg-amber-100 text-amber-800" :
                        order.status === "Delivered" ? "bg-emerald-100 text-emerald-800" :
                        "bg-gray-100 text-gray-600"
                      }`}>
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

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4 text-sm">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3.5 rounded-lg font-medium text-sm shadow-sm transition flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> New Order
            </button>
            <button className="w-full border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 py-3 rounded-lg text-sm font-medium transition">
              Add Customer
            </button>
            <button className="w-full border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 py-3 rounded-lg text-sm font-medium transition">
              Add Product
            </button>
            <button className="w-full border border-orange-300 text-orange-700 bg-orange-50 hover:bg-orange-100 py-3 rounded-lg text-sm font-medium transition">
              Update Stock
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-5">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-6 h-6 text-orange-600" />
          <h3 className="font-semibold text-orange-900">Alerts</h3>
        </div>
        <ul className="space-y-2 text-sm text-orange-800 font-medium">
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
            15 orders require approval
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
            34 products low in stock
          </li>
          <li className="flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-600 rounded-full"></span>
            3 payments overdue
          </li>
        </ul>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ title, value, change, isPositive = false }: { title: string; value: string; change: string; isPositive?: boolean }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition">
      <p className="text-xs font-medium text-gray-600 uppercase tracking-wider">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
      <p className={`text-xs font-medium mt-2 ${isPositive ? "text-emerald-600" : "text-orange-600"}`}>
        {isPositive ? "Up " : ""}{change}
      </p>
    </div>
  );
}

// Mock Data
const recentOrders = [
  { id: "ORD-2024-1234", customer: "ABC Pharmacy Ltd", date: "2025-12-08", total: "12,450", status: "Processing" },
  { id: "ORD-2024-1233", customer: "XYZ Healthcare", date: "2025-12-08", total: "8,234", status: "Shipped" },
  { id: "ORD-2024-1232", customer: "MediCare Solutions", date: "2025-12-07", total: "4,567", status: "Pending" },
  { id: "ORD-2024-1231", customer: "HealthPlus Clinic", date: "2025-12-07", total: "18,900", status: "Delivered" },
  { id: "ORD-2024-1230", customer: "Wellness Center", date: "2025-12-06", total: "3,200", status: "Delivered" },
];