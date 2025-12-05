'use client';

import { Search, Upload, Download, Plus, Grid3X3, List } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const safePage = Math.max(1, Math.min(currentPage, totalPages));
  const displayedProducts = products.slice(startIndex, endIndex);

  const goToPage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="p-2"> {/* ลดจาก p-4 → p-2 */}
      {/* Breadcrumb + Title */}
      <div className="mb-2">
        <div className="text-[10px] text-gray-500">Home › Products</div>
        <h1 className="text-xl font-bold text-gray-900">Product Catalog</h1>
      </div>

      {/* Top Actions */}
      <div className="flex justify-end gap-1 mb-2">
        <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-[10px] font-medium text-gray-700 hover:bg-gray-50">
          <Upload className="w-3 h-3" /> Import
        </button>
        <button className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded text-[10px] font-medium text-gray-700 hover:bg-gray-50">
          <Download className="w-3 h-3" /> Export
        </button>
        <button className="flex items-center gap-1 px-2.5 py-1 bg-orange-500 hover:bg-orange-600 text-white rounded text-[10px] font-medium">
          <Plus className="w-3 h-3" /> Add
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {/* Left Sidebar - Categories & Filters */}
        <div className="lg:col-span-1 space-y-2">
          <div className="bg-white rounded border border-gray-200 p-2">
            <h3 className="font-semibold text-gray-900 text-md mb-1">Categories</h3>
            <ul className="space-y-0.5">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <button
                    className={`w-full text-left px-2 py-1 rounded text-xs font-medium ${
                      cat.active
                        ? "bg-orange-500 text-white"
                        : "hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {cat.name} <span className="float-right">({cat.count})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded border border-gray-200 p-2">
            <h3 className="font-semibold text-gray-900 text-[10px] mb-1">Filters</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 text-orange-500 rounded" />
                <span className="text-[10px] text-gray-700">In Stock Only</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 text-orange-500 rounded" />
                <span className="text-[10px] text-gray-700">Low Stock</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" className="w-3 h-3 text-orange-500 rounded" />
                <span className="text-[10px] text-gray-700">Active Only</span>
              </label>

              <div className="pt-1">
                <p className="text-[10px] font-medium text-gray-900 mb-1">Price Range</p>
                <div className="grid grid-cols-2 gap-1">
                  <input
                    type="number"
                    placeholder="Min"
                    className="h-6 px-2 text-[10px] bg-gray-50 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="h-6 px-2 text-[10px] bg-gray-50 border border-gray-300 rounded"
                  />
                </div>
              </div>

              <button className="w-full h-6 mt-1 px-2 bg-orange-500 hover:bg-orange-600 text-white rounded text-[10px] font-medium">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search + Sort + View */}
          <div className="bg-white rounded border border-gray-200 p-2 mb-2 flex flex-col sm:flex-row gap-2 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full h-7 pl-7 pr-2 bg-gray-50 border border-gray-300 rounded text-[10px] focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
            <div className="flex items-center gap-1">
              <select className="h-7 px-2 border border-gray-300 rounded bg-white text-[10px]">
                <option>Name A-Z</option>
                <option>Price: Low-High</option>
              </select>
              <div className="flex gap-0.5">
                <button className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white rounded">
                  <Grid3X3 className="w-3 h-3" />
                </button>
                <button className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50">
                  <List className="w-3 h-3 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid - 5 columns, very compact */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
            {displayedProducts.map((product) => (
              <div
                key={product.sku}
                className="bg-white rounded border border-gray-200 overflow-hidden hover:bg-orange-50/30 group text-[10px]"
              >
                <div className="aspect-[4/4] bg-gray-100 border border-dashed border-gray-200 rounded m-1 flex items-center justify-center">
                  <span className="text-gray-400 text-[8px]">[Image]</span>
                </div>
                <div className="p-1.5">
                  <h3 className="font-medium text-gray-900 mb-0.5 line-clamp-1">{product.name}</h3>
                  <p className="text-[9px] text-gray-500 mb-0.5">SKU: {product.sku}</p>
                  <p className="text-[9px] text-gray-600 mb-1">{product.category}</p>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[9px] text-gray-600">Stk: {product.stock}</span>
                    <span className="px-1 py-0.5 bg-emerald-100 text-emerald-800 text-[8px] font-medium rounded">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold text-orange-600">${product.price}</span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 text-[9px]">
                      <button className="text-orange-600 hover:underline">Edit</button>
                      <span className="text-gray-300">|</span>
                      <button className="text-orange-600 hover:underline">View</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - ซ่อนหรือย่อขนาด */}
          <div className="mt-2 flex flex-wrap justify-between items-center gap-2 text-[10px] text-gray-600">
            <div>1–10 of {products.length}</div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage <= 1}
                className={`h-6 px-2 border border-gray-300 rounded text-[10px] ${
                  safePage <= 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
              >
                Prev
              </button>
              <button
                className={`w-6 h-6 rounded text-[10px] flex items-center justify-center ${
                  safePage === 1 ? "bg-orange-500 text-white" : "border border-gray-300 hover:bg-gray-50"
                }`}
              >
                1
              </button>
              {totalPages > 1 && (
                <button
                  className={`w-6 h-6 rounded text-[10px] flex items-center justify-center ${
                    safePage === 2 ? "bg-orange-500 text-white" : "border border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  2
                </button>
              )}
              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage >= totalPages}
                className={`h-6 px-2 border border-gray-300 rounded text-[10px] ${
                  safePage >= totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const categories = [
  { name: "All", count: 856, active: true },
  { name: "Vitamins", count: 234, active: false },
  { name: "Supplements", count: 189, active: false },
  { name: "Probiotics", count: 67, active: false },
  { name: "Protein", count: 124, active: false },
];

const products = Array.from({ length: 856 }, (_, i) => ({
  sku: `P${String(i + 1).padStart(4, "0")}`,
  name: `Product ${i + 1}`,
  category: ["Vitamins", "Probiotics", "Omega", "Protein", "Herbal"][i % 5],
  stock: 100 + (i * 37) % 900,
  price: (10 + (i % 90)).toFixed(2),
}));