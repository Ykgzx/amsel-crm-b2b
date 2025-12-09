// app/settings/page.tsx หรือ app/(admin)/settings/page.tsx
'use client';

import { Save, Upload, Bell, Globe, Lock, Mail, Building } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-8 w-full mx-auto">

      {/* Header */}
      <div className="mb-4">
        <div className="text-xs text-gray-500">Home › Settings</div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">

          {/* General Settings */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Globe className="w-5 h-5 text-orange-600" />
              General Settings
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                <input
                  type="text"
                  defaultValue="Amsel Health Store"
                  className="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select className="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>THB - Thai Baht (฿)</option>
                  <option>USD - US Dollar ($)</option>
                  <option>EUR - Euro (€)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <select className="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>ไทย</option>
                  <option>English</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select className="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm bg-white">
                  <option>UTC+07:00 Bangkok</option>
                  <option>UTC+00:00 London</option>
                </select>
              </div>
            </div>
          </div>

          {/* Store Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Building className="w-5 h-5 text-orange-600" />
              Store Information
            </h3>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input type="email" defaultValue="support@amsel.com" className="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input type="tel" defaultValue="+66 2 123 4567" className="w-full h-10 px-4 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea
                rows={3}
                defaultValue="123/45 ถ.รัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm resize-none"
              />
            </div>

            <div className="mt-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Logo</label>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                  <Upload className="w-10 h-10 text-gray-400" />
                </div>
                <div>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                    Change Logo
                  </button>
                  <p className="text-xs text-gray-500 mt-2">Recommended: 300x300px, PNG or JPG</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar */}
        <div className="space-y-6">

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-600" />
              Notifications
            </h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">New Order Alert</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Low Stock Alert</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600 rounded" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Daily Summary Email</span>
                <input type="checkbox" className="w-5 h-5 text-orange-600 rounded" />
              </label>
            </div>
          </div>

          {/* Account */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <Lock className="w-5 h-5 text-orange-600" />
              Account
            </h3>

            <div className="space-y-4">
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Change Password
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                Two-Factor Authentication
              </button>
              <button className="w-full text-left px-4 py-3 border border-red-300 rounded-lg hover:bg-red-50 text-sm text-red-600">
                Delete Account
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
            <button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium flex items-center justify-center gap-2">
              <Save className="w-5 h-5" />
              Save Changes
            </button>
            <p className="text-xs text-gray-500 text-center mt-3">
              Last saved: Today at 14:28
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}