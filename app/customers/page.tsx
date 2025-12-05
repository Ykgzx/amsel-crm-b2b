// app/customers/page.tsx
import { Search, Download, Plus } from "lucide-react";

export default function CustomersPage() {
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

      {/* Filters - กะทัดรัด ตรงรูป ใช้พื้นที่คุ้ม */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 items-center">
          {/* Search */}
          <div className="relative lg:col-span-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full h-9 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm"
            />
          </div>

          {/* Status */}
          <div className="lg:col-span-2">
            <select className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 text-xs bg-white">
              <option>Status: All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Type */}
          <div className="lg:col-span-2">
            <select className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 text-xs bg-white">
              <option>Type: All</option>
              <option>Pharmacy</option>
              <option>Hospital</option>
              <option>Clinic</option>
            </select>
          </div>

          {/* Region */}
          <div className="lg:col-span-2">
            <select className="w-full h-9 px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-orange-500 text-xs bg-white">
              <option>Region: All</option>
              <option>North</option>
              <option>South</option>
              <option>East</option>
              <option>West</option>
            </select>
          </div>

          {/* Buttons */}
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
        <div>Total: <span className="font-bold">1,847</span> customers</div>
        <div className="text-orange-600 font-medium">Active: 1,654</div>
        <div className="text-orange-700 font-medium">Inactive: 193</div>
      </div>

      {/* Table - เห็นเยอะสุด ไม่ต้องเลื่อน */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase">
              <tr>
                <th className="px-3 py-2.5 text-left"><input type="checkbox" className="rounded border-orange-400" /></th>
                <th className="px-3 py-2.5 text-left">ID</th>
                <th className="px-3 py-2.5 text-left">Customer Name</th>
                <th className="px-3 py-2.5 text-left">Contact</th>
                <th className="px-3 py-2.5 text-left">Type</th>
                <th className="px-3 py-2.5 text-left">Region</th>
                <th className="px-3 py-2.5 text-left">Orders</th>
                <th className="px-3 py-2.5 text-left">LTV</th>
                <th className="px-3 py-2.5 text-left">Status</th>
                <th className="px-3 py-2.5 text-left"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-orange-50/30 transition h-12">
                  <td className="px-3 py-2.5"><input type="checkbox" className="rounded border-orange-400" /></td>
                  <td className="px-3 py-2.5 font-medium text-gray-900">{customer.id}</td>
                  <td className="px-3 py-2.5 font-medium text-gray-900">{customer.name}</td>
                  <td className="px-3 py-2.5 text-gray-600">
                    {customer.email}<br />
                    <span className="text-[10px] text-gray-500">{customer.phone}</span>
                  </td>
                  <td className="px-3 py-2.5 text-gray-700">{customer.type}</td>
                  <td className="px-3 py-2.5 text-gray-700">{customer.region}</td>
                  <td className="px-3 py-2.5 text-center font-medium text-gray-900">{customer.orders}</td>
                  <td className="px-3 py-2.5 text-right font-bold text-orange-600">${customer.ltv}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${customer.status === "Active" ? "bg-orange-100 text-orange-800" : "bg-gray-100 text-gray-600"}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-center">
                    <button className="text-orange-600 hover:underline text-xs mr-2">View</button>
                    <button className="text-gray-600 hover:underline text-xs">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-600 gap-3">
          <div>Showing 1–20 of 1,847 customers</div>
          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded hover:bg-gray-100">Previous</button>
            <div className="flex gap-1">
              <button className="w-8 h-8 rounded bg-orange-500 text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 rounded hover:bg-gray-100 text-xs">2</button>
              <button className="w-8 h-8 rounded hover:bg-gray-100 text-xs">3</button>
              <span className="px-2">...</span>
              <button className="w-8 h-8 rounded hover:bg-gray-100 text-xs">93</button>
            </div>
            <button className="px-3 py-1.5 rounded hover:bg-gray-100">Next</button>
          </div>
          <select className="px-3 py-1.5 border rounded text-xs">
            <option>20 / page</option>
            <option>50 / page</option>
            <option>100 / page</option>
          </select>
        </div>
      </div>
    </div>
  );
}

const customers = [
  { id: "C-0001", name: "ABC Pharmacy Ltd", email: "pharmacy@abc.com", phone: "+1-234-567-8900", type: "Pharmacy", region: "North", orders: 547, ltv: "524,578", status: "Active" },
  { id: "C-0002", name: "XYZ Healthcare Inc", email: "contact@xyz.com", phone: "South | 321-517-1234", type: "Distributor", region: "South", orders: 321, ltv: "156,890", status: "Active" },
  { id: "C-0003", name: "MediCare Solutions", email: "info@medicare.com", phone: "East | 421-515-890", type: "Hospital", region: "East", orders: 156, ltv: "89,450", status: "Active" },
  { id: "C-0004", name: "HealthPlus Clinic", email: "admin@healthplus.com", phone: "West | 206-938-450", type: "Clinic", region: "West", orders: 89, ltv: "34,120", status: "Inactive" },
  // เพิ่มได้อีกเยอะตามต้องการ
];