// app/inventory/page.tsx
import { Search, Download, Package, AlertTriangle, DollarSign, Warehouse } from "lucide-react";

export default function InventoryPage() {
  return (
    <div className="p-8 w-full mx-auto">
      {/* Breadcrumb + Title */}
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Home {'>'} Inventory Management</div>
        <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
      </div>

      {/* Top Action Buttons */}
      <div className="flex justify-end gap-3 mb-6">
        <button className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700">
          <Download className="w-4 h-4" /> Export
        </button>
        <button className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium text-gray-700">
          <Package className="w-4 h-4" /> Stock Adjustment
        </button>
        <button className="px-6 py-2.5 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2 font-medium">
          <Package className="w-5 h-5" /> Receive Stock
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Products in Stock</p>
              <p className="text-4xl font-bold mt-2">823</p>
              <p className="text-blue-100 text-xs mt-1">Total SKUs</p>
            </div>
            <Package className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-400 to-orange-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm">Low Stock Alerts</p>
              <p className="text-4xl font-bold mt-2">34</p>
              <p className="text-amber-100 text-xs mt-1 flex items-center gap-1">
                <AlertTriangle className="w-4 h-4" /> Requires immediate attention
              </p>
            </div>
            <AlertTriangle className="w-12 h-12 text-amber-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Out of Stock</p>
              <p className="text-4xl font-bold mt-2">12</p>
              <p className="text-red-100 text-xs mt-1">Action required</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Inventory Value</p>
              <p className="text-4xl font-bold mt-2">$3.2M</p>
              <p className="text-green-100 text-xs mt-1">Across all warehouses</p>
            </div>
            <DollarSign className="w-12 h-12 text-green-200" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by product name or SKU..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-5 py-3 border border-gray-300 rounded-lg">
              <option>Warehouse: All</option>
              <option>Main (NYC)</option>
              <option>Warehouse B (LA)</option>
            </select>
            <select className="px-5 py-3 border border-gray-300 rounded-lg">
              <option>Category: All</option>
              <option>Vitamins</option>
              <option>Probiotics</option>
            </select>
            <select className="px-5 py-3 border border-gray-300 rounded-lg">
              <option>Stock Status: All</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">Apply</button>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">All Items</button>
            <button className="px-6 py-3 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 font-medium">Low Stock</button>
            <button className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium">Out of Stock</button>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Product Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Warehouse</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">On Hand</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Allocated</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Available</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Reorder Lvl</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr
                  key={item.sku}
                  className={`hover:bg-gray-50 transition ${
                    item.status === "Low Stock" ? "bg-amber-50" : 
                    item.status === "Out of Stock" ? "bg-red-50" : ""
                  }`}
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-blue-600">{item.sku}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.warehouse}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{item.onHand}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.allocated}</td>
                  <td className="px-6 py-4 text-sm font-medium text-green-600">{item.available}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.reorder}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === "Low Stock" 
                        ? "bg-amber-100 text-amber-800" 
                        : item.status === "Out of Stock"
                        ? "bg-red-100 text-red-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button className="text-blue-600 hover:underline mr-3">Adjust</button>
                    {item.status !== "In Stock" && (
                      <button className="text-red-600 hover:underline font-medium">Order Now</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
          <div>Showing 1-20 of 823 items</div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Previous</button>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-lg bg-orange-500 text-white font-medium">1</button>
              <button className="w-10 h-10 rounded-lg hover:bg-gray-50">2</button>
              <button className="w-10 h-10 rounded-lg hover:bg-gray-50">3</button>
              <span>...</span>
              <button className="w-10 h-10 rounded-lg hover:bg-gray-50">42</button>
            </div>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ข้อมูลตัวอย่าง
const inventory = [
  {
    sku: "VIT-D3-1000",
    name: "Vitamin D3 1000 IU",
    category: "Vitamins",
    warehouse: "Main (NYC)",
    onHand: 89,
    allocated: 35,
    available: 54,
    reorder: 100,
    status: "Low Stock"
  },
  {
    sku: "PROB-50B",
    name: "Probiotic 50B CFU",
    category: "Probiotics",
    warehouse: "Main (NYC)",
    onHand: 567,
    allocated: 120,
    available: 447,
    reorder: 200,
    status: "In Stock"
  },
  {
    sku: "OMEGA-1000",
    name: "Omega-3 1000mg",
    category: "Fish Oils",
    warehouse: "Warehouse B (LA)",
    onHand: 0,
    allocated: 0,
    available: 0,
    reorder: 50,
    status: "Out of Stock"
  },
];