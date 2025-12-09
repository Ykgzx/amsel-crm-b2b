// app/customers/page.tsx
'use client';

import { Search, Download, Plus } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";

export default function CustomersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Pagination
  const currentPage = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10));
  const itemsPerPage = 5;
  const totalItems = customers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedCustomers = customers.slice(
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
        <div className="text-xs text-gray-500">Home › Customers</div>
        <h1 className="text-2xl font-bold text-gray-900">Customer Management</h1>
      </div>

      {/* Top Actions */}
      <div className="flex justify-end gap-2 mb-4">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-700">
          <Download className="w-3.5 h-3.5" /> Export
        </button>
        <button className="flex items-center gap-1.5 px-4 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-medium shadow-sm">
          <Plus className="w-3.5 h-3.5" /> Add Customer
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
          <div className="relative lg:col-span-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full h-9 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            />
          </div>

          <div className="lg:col-span-2">
            <select className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 text-xs bg-white">
              <option>Status: All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 text-xs bg-white">
              <option>Type: All</option>
              <option>Pharmacy</option>
              <option>Hospital</option>
              <option>Clinic</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <select className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 text-xs bg-white">
              <option>Region: All</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
              <option>Central</option>
            </select>
          </div>

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

      {/* Summary Stats */}
      <div className="flex gap-6 mb-4 text-xs">
        <div>Total: <span className="font-bold">{totalItems}</span> customers</div>
        <div className="text-orange-600 font-medium">Active: 22</div>
        <div className="text-orange-700 font-medium">Inactive: 3</div>
      </div>

      {/* Table + Pagination */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-medium">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Customer Name</th>
                <th className="px-4 py-3 text-left">Contact</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Region</th>
                <th className="px-4 py-3 text-center">Orders</th>
                <th className="px-4 py-3 text-right">LTV</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-orange-50/30 transition h-14">
                  <td className="px-4 py-3 font-medium text-gray-900">{c.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-900">{c.name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {c.email}
                    <br />
                    <span className="text-[10px] text-gray-500">{c.phone}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">{c.type}</td>
                  <td className="px-4 py-3 text-gray-700">{c.region}</td>
                  <td className="px-4 py-3 text-center font-medium">{c.orders}</td>
                  <td className="px-4 py-3 text-right font-bold text-orange-600">
                    ${c.ltv}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                        c.status === "Active"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-xs">
                    <button className="text-orange-600 hover:underline mr-3">View</button>
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
            Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} customers
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

// Mock Data - 25 รายการ = 5 หน้า (หน้าละ 5)
const customers = [
  { id: "C-0001", name: "ABC Pharmacy Ltd", email: "pharmacy@abc.com", phone: "+66 98 123 4567", type: "Pharmacy", region: "North", orders: 547, ltv: "524,578", status: "Active" },
  { id: "C-0002", name: "XYZ Healthcare", email: "contact@xyz.com", phone: "+66 81 234 5678", type: "Distributor", region: "South", orders: 321, ltv: "156,890", status: "Active" },
  { id: "C-0003", name: "MediCare Hospital", email: "info@medicare.com", phone: "+66 92 345 6789", type: "Hospital", region: "East", orders: 289, ltv: "289,450", status: "Active" },
  { id: "C-0004", name: "HealthPlus Clinic", email: "admin@healthplus.com", phone: "+66 85 456 7890", type: "Clinic", region: "West", orders: 156, ltv: "89,120", status: "Active" },
  { id: "C-0005", name: "VitaShop Bangkok", email: "bangkok@vita.com", phone: "+66 93 567 8901", type: "Pharmacy", region: "Central", orders: 412, ltv: "412,300", status: "Active" },

  { id: "C-0006", name: "PrimeCare Chiangmai", email: "cm@primecare.com", phone: "+66 84 678 9012", type: "Hospital", region: "North", orders: 98, ltv: "67,800", status: "Active" },
  { id: "C-0007", name: "Sunshine Pharmacy", email: "sun@pharmacy.co", phone: "+66 95 789 0123", type: "Pharmacy", region: "South", orders: 234, ltv: "198,500", status: "Active" },
  { id: "C-0008", name: "GreenLife Clinic", email: "info@greenlife.com", phone: "+66 86 890 1234", type: "Clinic", region: "East", orders: 67, ltv: "45,200", status: "Inactive" },
  { id: "C-0009", name: "ProHealth Center", email: "pro@health.th", phone: "+66 97 901 2345", type: "Distributor", region: "Central", orders: 512, ltv: "623,900", status: "Active" },
  { id: "C-0010", name: "Wellness Hub", email: "well@hub.com", phone: "+66 88 012 3456", type: "Pharmacy", region: "West", orders: 178, ltv: "134,600", status: "Active" },

  { id: "C-0011", name: "CityMed Pharmacy", email: "city@med.com", phone: "+66 99 123 4567", type: "Pharmacy", region: "Central", orders: 389, ltv: "356,700", status: "Active" },
  { id: "C-0012", name: "NorthStar Hospital", email: "north@star.com", phone: "+66 82 234 5678", type: "Hospital", region: "North", orders: 267, ltv: "298,400", status: "Active" },
  { id: "C-0013", name: "HappyLife Clinic", email: "happy@life.co", phone: "+66 93 345 6789", type: "Clinic", region: "South", orders: 89, ltv: "56,300", status: "Active" },
  { id: "C-0014", name: "BestCare Distributor", email: "best@care.th", phone: "+66 84 456 7890", type: "Distributor", region: "East", orders: 623, ltv: "789,200", status: "Active" },
  { id: "C-0015", name: "PureHealth Shop", email: "pure@health.com", phone: "+66 95 567 8901", type: "Pharmacy", region: "West", orders: 145, ltv: "98,700", status: "Active" },

  { id: "C-0016", name: "Elite Pharmacy", email: "elite@pharma.com", phone: "+66 86 678 9012", type: "Pharmacy", region: "Central", orders: 498, ltv: "567,800", status: "Active" },
  { id: "C-0017", name: "Central Hospital", email: "central@hosp.com", phone: "+66 97 789 0123", type: "Hospital", region: "Central", orders: 356, ltv: "423,100", status: "Active" },
  { id: "C-0018", name: "Family Clinic", email: "family@clinic.th", phone: "+66 88 890 1234", type: "Clinic", region: "North", orders: 78, ltv: "49,800", status: "Inactive" },
  { id: "C-0019", name: "ThaiMed Supply", email: "supply@thaimed.com", phone: "+66 99 901 2345", type: "Distributor", region: "South", orders: 712, ltv: "892,300", status: "Active" },
  { id: "C-0020", name: "SmartCare Pharmacy", email: "smart@care.com", phone: "+66 82 012 3456", type: "Pharmacy", region: "East", orders: 267, ltv: "234,900", status: "Active" },

  { id: "C-0021", name: "Golden Clinic", email: "golden@clinic.com", phone: "+66 93 123 4567", type: "Clinic", region: "West", orders: 134, ltv: "112,400", status: "Active" },
  { id: "C-0022", name: "Metro Pharmacy", email: "metro@pharma.th", phone: "+66 84 234 5678", type: "Pharmacy", region: "Central", orders: 589, ltv: "678,500", status: "Active" },
  { id: "C-0023", name: "Unity Hospital", email: "unity@hosp.com", phone: "+66 95 345 6789", type: "Hospital", region: "North", orders: 423, ltv: "512,700", status: "Active" },
  { id: "C-0024", name: "CarePlus Shop", email: "care@plus.com", phone: "+66 86 456 7890", type: "Pharmacy", region: "South", orders: 98, ltv: "78,900", status: "Inactive" },
  { id: "C-0025", name: "Future Health Co.", email: "future@health.co", phone: "+66 97 567 8901", type: "Distributor", region: "Central", orders: 812, ltv: "987,600", status: "Active" },
];