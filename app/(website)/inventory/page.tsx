// app/inventory/page.tsx
'use client';

import { Search, Download, Package, AlertTriangle, DollarSign } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function InventoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pagination
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const itemsPerPage = 5;
  const totalItems = inventory.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedInventory = inventory.slice(
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
        <div className="text-xs text-gray-500">Home › Inventory Management</div>
        <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
      </div>

      {/* Top Action Buttons */}
      <div className="flex justify-end gap-2 mb-6">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700">
          <Package className="w-3.5 h-3.5" /> Stock Adjustment
        </button>
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-sm">
          <Package className="w-3.5 h-3.5" /> Receive Stock
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Products in Stock</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">823</p>
              <p className="text-xs text-gray-500 mt-1">Total SKUs</p>
            </div>
            <Package className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Low Stock Alerts</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">34</p>
              <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Requires immediate attention
              </p>
            </div>
            <AlertTriangle className="w-10 h-10 text-orange-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
              <p className="text-xs text-red-600 mt-1">Action required</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Total Inventory Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$3.2M</p>
              <p className="text-xs text-gray-500 mt-1">Across all warehouses</p>
            </div>
            <DollarSign className="w-10 h-10 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product name or SKU..."
              className="w-full h-9 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <select className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-orange-500">
              <option>Warehouse: All</option>
              <option>Main (NYC)</option>
              <option>Warehouse B (LA)</option>
            </select>
            <select className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-orange-500">
              <option>Category: All</option>
              <option>Vitamins</option>
              <option>Probiotics</option>
              <option>Fish Oils</option>
            </select>
            <select className="h-9 px-3 border border-gray-300 rounded-lg text-xs bg-white focus:ring-1 focus:ring-orange-500">
              <option>Stock Status: All</option>
              <option>In Stock</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-sm">
              All Items ({totalItems})
            </button>
            <button className="px-3.5 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-700 rounded-lg text-xs border">
              Low Stock (34)
            </button>
            <button className="px-3.5 py-1.5 bg-gray-100 hover:bg-orange-50 hover:text-orange-700 text-gray-700 rounded-lg text-xs border">
              Out of Stock (12)
            </button>
          </div>

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

      {/* Inventory Table + Pagination */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
              <tr>
                <th className="px-3 py-2.5 text-left">SKU</th>
                <th className="px-3 py-2.5 text-left">Product Name</th>
                <th className="px-3 py-2.5 text-left">Category</th>
                <th className="px-3 py-2.5 text-left">Warehouse</th>
                <th className="px-3 py-2.5 text-center">On Hand</th>
                <th className="px-3 py-2.5 text-center">Allocated</th>
                <th className="px-3 py-2.5 text-center">Available</th>
                <th className="px-3 py-2.5 text-center">Reorder Lvl</th>
                <th className="px-3 py-2.5 text-center">Status</th>
                <th className="px-3 py-2.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {paginatedInventory.map((item) => (
                <tr
                  key={item.sku}
                  className={`hover:bg-orange-50/30 h-12 ${
                    item.status === "Low Stock" ? "bg-orange-50/50" : 
                    item.status === "Out of Stock" ? "bg-red-50/50" : ""
                  }`}
                >
                  <td className="px-3 py-2.5 font-medium text-orange-600">{item.sku}</td>
                  <td className="px-3 py-2.5 text-gray-900 font-medium">{item.name}</td>
                  <td className="px-3 py-2.5 text-gray-600">{item.category}</td>
                  <td className="px-3 py-2.5 text-gray-600">{item.warehouse}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-900">{item.onHand}</td>
                  <td className="px-3 py-2.5 text-center text-gray-600">{item.allocated}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-emerald-600">{item.available}</td>
                  <td className="px-3 py-2.5 text-center text-gray-600">{item.reorder}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      item.status === "Low Stock" 
                        ? "bg-orange-100 text-orange-800" 
                        : item.status === "Out of Stock"
                        ? "bg-red-100 text-red-800"
                        : "bg-emerald-100 text-emerald-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center text-xs">
                    <button className="text-orange-600 hover:underline mr-3">Adjust</button>
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
        <div className="px-5 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-600">
          <div>
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
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

// Mock Data 25 รายการ = 5 หน้าเต็ม (หน้าละ 5)
const inventory = [
  { sku: "VIT-D3-1000", name: "Vitamin D3 1000 IU", category: "Vitamins", warehouse: "Main (NYC)", onHand: 89, allocated: 35, available: 54, reorder: 100, status: "Low Stock" },
  { sku: "PROB-50B", name: "Probiotic 50B CFU", category: "Probiotics", warehouse: "Main (NYC)", onHand: 567, allocated: 120, available: 447, reorder: 200, status: "In Stock" },
  { sku: "OMEGA-1000", name: "Omega-3 1000mg", category: "Fish Oils", warehouse: "Warehouse B (LA)", onHand: 0, allocated: 0, available: 0, reorder: 50, status: "Out of Stock" },
  { sku: "MAG-400", name: "Magnesium Glycinate 400mg", category: "Minerals", warehouse: "Main (NYC)", onHand: 234, allocated: 80, available: 154, reorder: 150, status: "In Stock" },
  { sku: "VIT-C-1000", name: "Vitamin C 1000mg", category: "Vitamins", warehouse: "Warehouse B (LA)", onHand: 45, allocated: 20, available: 25, reorder: 100, status: "Low Stock" },

  { sku: "ZINC-50", name: "Zinc Picolinate 50mg", category: "Minerals", warehouse: "Main (NYC)", onHand: 678, allocated: 150, available: 528, reorder: 200, status: "In Stock" },
  { sku: "COLLAGEN-500", name: "Marine Collagen 500g", category: "Beauty", warehouse: "Warehouse B (LA)", onHand: 12, allocated: 8, available: 4, reorder: 50, status: "Low Stock" },
  { sku: "ASHWA-300", name: "Ashwagandha KSM-66 300mg", category: "Herbal", warehouse: "Main (NYC)", onHand: 0, allocated: 0, available: 0, reorder: 80, status: "Out of Stock" },
  { sku: "TURM-95", name: "Turmeric Curcumin 95%", category: "Herbal", warehouse: "Main (NYC)", onHand: 412, allocated: 90, available: 322, reorder: 150, status: "In Stock" },
  { sku: "B-COMPLEX", name: "B-Complex High Potency", category: "Vitamins", warehouse: "Warehouse B (LA)", onHand: 156, allocated: 60, available: 96, reorder: 100, status: "In Stock" },

  { sku: "MELAT-5", name: "Melatonin 5mg", category: "Sleep Aid", warehouse: "Main (NYC)", onHand: 78, allocated: 45, available: 33, reorder: 100, status: "Low Stock" },
  { sku: "IRON-65", name: "Iron Bisglycinate 65mg", category: "Minerals", warehouse: "Warehouse B (LA)", onHand: 0, allocated: 0, available: 0, reorder: 60, status: "Out of Stock" },
  { sku: "COQ10-200", name: "CoQ10 200mg", category: "Heart Health", warehouse: "Main (NYC)", onHand: 289, allocated: 70, available: 219, reorder: 120, status: "In Stock" },
  { sku: "BIOTIN-10K", name: "Biotin 10,000mcg", category: "Beauty", warehouse: "Warehouse B (LA)", onHand: 523, allocated: 110, available: 413, reorder: 200, status: "In Stock" },
  { sku: "L-GLUTAMINE", name: "L-Glutamine Powder 500g", category: "Sports", warehouse: "Main (NYC)", onHand: 34, allocated: 25, available: 9, reorder: 80, status: "Low Stock" },

  { sku: "KRILL-1000", name: "Krill Oil 1000mg", category: "Fish Oils", warehouse: "Warehouse B (LA)", onHand: 98, allocated: 40, available: 58, reorder: 100, status: "Low Stock" },
  { sku: "RHODIOLA", name: "Rhodiola Rosea 500mg", category: "Herbal", warehouse: "Main (NYC)", onHand: 445, allocated: 95, available: 350, reorder: 150, status: "In Stock" },
  { sku: "PROT-WHEY", name: "Whey Protein Isolate 2lb", category: "Sports", warehouse: "Warehouse B (LA)", onHand: 0, allocated: 0, available: 0, reorder: 50, status: "Out of Stock" },
  { sku: "CALCIUM-600", name: "Calcium Citrate + D3", category: "Minerals", warehouse: "Main (NYC)", onHand: 267, allocated: 80, available: 187, reorder: 150, status: "In Stock" },
  { sku: "VIT-K2", name: "Vitamin K2 MK-7 100mcg", category: "Vitamins", warehouse: "Warehouse B (LA)", onHand: 56, allocated: 30, available: 26, reorder: 80, status: "Low Stock" },

  { sku: "NAC-600", name: "NAC 600mg", category: "Antioxidants", warehouse: "Main (NYC)", onHand: 389, allocated: 100, available: 289, reorder: 150, status: "In Stock" },
  { sku: "BERBERINE", name: "Berberine HCl 500mg", category: "Blood Sugar", warehouse: "Warehouse B (LA)", onHand: 23, allocated: 15, available: 8, reorder: 60, status: "Low Stock" },
  { sku: "RESVERATROL", name: "Trans-Resveratrol 500mg", category: "Antioxidants", warehouse: "Main (NYC)", onHand: 178, allocated: 50, available: 128, reorder: 100, status: "In Stock" },
  { sku: "LIONMANE", name: "Lion's Mane 1000mg", category: "Brain Health", warehouse: "Warehouse B (LA)", onHand: 0, allocated: 0, available: 0, reorder: 70, status: "Out of Stock" },
  { sku: "HYALURONIC", name: "Hyaluronic Acid 100mg", category: "Beauty", warehouse: "Main (NYC)", onHand: 612, allocated: 140, available: 472, reorder: 200, status: "In Stock" },
];