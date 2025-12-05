// app/pricing/page.tsx
import { Download, Plus, ChevronRight, Edit, Copy, Trash2, Eye, Clock, CheckCircle } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Breadcrumb + Title */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Home &gt; Pricing Management</div>
        <h1 className="text-3xl font-bold text-gray-900">Pricing Management</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-8 bg-gray-100 p-1 rounded-xl w-fit">
        {["Price Lists", "Customer Pricing", "Discounts & Promotions", "Volume Pricing"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 rounded-lg text-sm font-medium transition-all ${
              tab === "Price Lists"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Actions */}
      <div className="flex justify-end gap-3 mb-8">
        <button className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700">
          <Download className="w-4 h-4" /> Export
        </button>
        <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium">
          <Plus className="w-5 h-5" /> New Price List
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Active Price Lists */}
        <div className="xl:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Price Lists</h2>

          {priceLists.map((list) => (
            <div
              key={list.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{list.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{list.description}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    list.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {list.status === "Active" ? <CheckCircle className="w-3 h-3 inline mr-1" /> : <Clock className="w-3 h-3 inline mr-1" />}
                  {list.status}
                </span>
              </div>

              <div className="text-sm text-gray-600 space-y-1 mb-4">
                <p>Products: <strong>{list.products}</strong> | Effective: {list.effective} | Last Updated: {list.updated}</p>
                <p>Customers: <strong>{list.customers}</strong> {list.applies && `| Applies to: ${list.applies}`}</p>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <button className="text-blue-600 hover:underline flex items-center gap-1">
                  <Eye className="w-4 h-4" /> View Details
                </button>
                <button className="text-blue-600 hover:underline flex items-center gap-1">
                  <Edit className="w-4 h-4" /> Edit
                </button>
                <button className="text-blue-600 hover:underline flex items-center gap-1">
                  <Copy className="w-4 h-4" /> Clone
                </button>
                <button className="text-gray-600 hover:underline flex items-center gap-1">
                  {list.status === "Active" ? "Deactivate" : "Activate Now"}
                </button>
              </div>
            </div>
          ))}

          <div className="text-center text-gray-500 py-8">
            [Additional price lists...]
          </div>
        </div>

        {/* Right Column - Quick Actions & Info */}
        <div className="space-y-6">
          {/* Quick Price Updates */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">Quick Price Updates</h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Bulk Price Update</label>
                <select className="mt-1 w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm">
                  <option>Category: All</option>
                </select>
              </div>
              <div>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm">
                  <option>Price List: Select</option>
                </select>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Adjustment %"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
                <input
                  type="text"
                  placeholder="Value"
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <button className="w-full px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                Apply Update
              </button>
            </div>
          </div>

          {/* Pricing Rules */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Rules</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Minimum Markup: <strong>25%</strong> on all products</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Volume Discount: <strong>10%</strong> for orders &gt; $5,000</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Hospital Discount: Additional <strong>8%</strong> for hospitals</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-1">•</span>
                <span>Auto-update: Sync with supplier prices weekly</span>
              </li>
            </ul>
            <button className="mt-5 w-full px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-sm">
              Manage Pricing Rules
            </button>
          </div>

          {/* Recent Price Changes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Price Changes</h3>
            <ul className="space-y-3 text-sm">
              {recentChanges.map((change) => (
                <li key={change.id} className="text-gray-600">
                  <span className="text-gray-400">{change.date}</span> - {change.desc}
                </li>
              ))}
            </ul>
            <button className="mt-4 text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
              View Full History <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ข้อมูลตัวอย่าง
const priceLists = [
  {
    id: 1,
    name: "Standard Retail Price List",
    description: "Default pricing for retail pharmacy customers",
    products: 856,
    effective: "2025-01-01",
    updated: "2025-11-15",
    customers: 0,
    status: "Active"
  },
  {
    id: 2,
    name: "Wholesale Price List",
    description: "Discounted pricing for bulk wholesale distributors (15% off retail)",
    products: 856,
    effective: "2025-01-01",
    updated: "2025-11-01",
    customers: 124,
    status: "Active"
  },
  {
    id: 3,
    name: "Hospital/Clinic Price List",
    description: "Special institutional pricing for hospitals and large clinics",
    products: 645,
    effective: "2025-02-01",
    updated: "2025-02-01",
    customers: 47,
    status: "Active"
  },
  {
    id: 4,
    name: "Holiday Promotional Pricing 2025",
    description: "Special promotional pricing for Q4 holiday season",
    products: 234,
    effective: "2025-11-15 to 2025-12-31",
    updated: "2025-11-12",
    applies: "All Customers",
    status: "Scheduled"
  },
];

const recentChanges = [
  { id: 1, date: "2025-12-03 14:30", desc: "Wholesale prices updated (+2%)" },
  { id: 2, date: "2025-12-02 09:15", desc: "Holiday promotion created" },
  { id: 3, date: "2025-12-01 16:45", desc: "Customer-specific pricing: ABC Pharmacy" },
  { id: 4, date: "2025-11-30 11:20", desc: "Volume tiers updated for Vitamin D3" },
  { id: 5, date: "2025-11-29 08:00", desc: "Standard retail prices updated (+3%)" },
];