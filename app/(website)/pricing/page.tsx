// app/pricing/page.tsx
import { Download, Plus, ChevronRight, Edit, Copy, Trash2, Eye, Clock, CheckCircle } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="p-8 w-full mx-auto">

      {/* Breadcrumb + Title */}
      <div className="mb-4">
        <div className="text-xs text-gray-500">Home › Pricing Management</div>
        <h1 className="text-2xl font-bold text-gray-900">Pricing Management</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["Price Lists", "Customer Pricing", "Discounts & Promotions", "Volume Pricing"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
              tab === "Price Lists"
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-sm"
                : "bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-700 border"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Actions */}
      <div className="flex justify-end gap-2 mb-6">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-sm">
          <Plus className="w-3.5 h-3.5" /> New Price List
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Left Column - Active Price Lists */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Active Price Lists</h2>

          {priceLists.map((list) => (
            <div
              key={list.id}
              className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{list.name}</h3>
                  <p className="text-xs text-gray-600 mt-0.5">{list.description}</p>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1 ${
                    list.status === "Active"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {list.status === "Active" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                  {list.status}
                </span>
              </div>

              <div className="text-xs text-gray-600 space-y-1 mb-4">
                <p>Products: <strong>{list.products}</strong> | Effective: {list.effective} | Last Updated: {list.updated}</p>
                <p>Customers: <strong>{list.customers}</strong> {list.applies && `| Applies to: ${list.applies}`}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <button className="text-orange-600 hover:underline flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" /> View Details
                </button>
                <button className="text-orange-600 hover:underline flex items-center gap-1">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                <button className="text-orange-600 hover:underline flex items-center gap-1">
                  <Copy className="w-3.5 h-3.5" /> Clone
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

        {/* Right Column */}
        <div className="space-y-4">

          {/* Quick Price Updates */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Quick Price Updates</h3>
            <div className="space-y-3">
              <select className="w-full h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-orange-500">
                <option>Category: All</option>
              </select>
              <select className="w-full h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-orange-500">
                <option>Price List: Select</option>
              </select>
              <div className="grid grid-cols-2 gap-2">
                <input type="text" placeholder="Adjustment %" className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-gray-50" />
                <input type="text" placeholder="Value" className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-gray-50" />
              </div>
              <button className="w-full h-9 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium">
                Apply Update
              </button>
            </div>
          </div>

          {/* Pricing Rules */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Pricing Rules</h3>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> Minimum Markup: <strong>25%</strong> on all products</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> Volume Discount: <strong>10%</strong> for orders &gt; $5,000</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> Hospital Discount: Additional <strong>8%</strong> for hospitals</li>
              <li className="flex items-start gap-2"><span className="text-gray-400 mt-0.5">•</span> Auto-update: Sync with supplier prices weekly</li>
            </ul>
            <button className="mt-4 w-full h-9 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 text-xs font-medium">
              Manage Pricing Rules
            </button>
          </div>

          {/* Recent Price Changes */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Price Changes</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              {recentChanges.map((change) => (
                <li key={change.id}>
                  <span className="text-gray-400">{change.date}</span> - {change.desc}
                </li>
              ))}
            </ul>
            <button className="mt-4 text-orange-600 hover:underline text-xs font-medium flex items-center gap-1">
              View Full History <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ข้อมูลเดิมทุกอย่าง (ไม่แตะเลย)
const priceLists = [
  { id: 1, name: "Standard Retail Price List", description: "Default pricing for retail pharmacy customers", products: 856, effective: "2025-01-01", updated: "2025-11-15", customers: 0, status: "Active" },
  { id: 2, name: "Wholesale Price List", description: "Discounted pricing for bulk wholesale distributors (15% off retail)", products: 856, effective: "2025-01-01", updated: "2025-11-01", customers: 124, status: "Active" },
  { id: 3, name: "Hospital/Clinic Price List", description: "Special institutional pricing for hospitals and large clinics", products: 645, effective: "2025-02-01", updated: "2025-02-01", customers: 47, status: "Active" },
  { id: 4, name: "Holiday Promotional Pricing 2025", description: "Special promotional pricing for Q4 holiday season", products: 234, effective: "2025-11-15 to 2025-12-31", updated: "2025-11-12", applies: "All Customers", status: "Scheduled" },
];

const recentChanges = [
  { id: 1, date: "2025-12-03 14:30", desc: "Wholesale prices updated (+2%)" },
  { id: 2, date: "2025-12-02 09:15", desc: "Holiday promotion created" },
  { id: 3, date: "2025-12-01 16:45", desc: "Customer-specific pricing: ABC Pharmacy" },
  { id: 4, date: "2025-11-30 11:20", desc: "Volume tiers updated for Vitamin D3" },
  { id: 5, date: "2025-11-29 08:00", desc: "Standard retail prices updated (+3%)" },
];