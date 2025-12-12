// app/users/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Download, Plus, User, Check, X, Eye, Edit, Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

type Role = { id: number; name: string };

type User = {
  id: number;
  lineUserId: string;
  fullName: string;
  company?: string | null;
  phoneNumber: string;
  email: string;
  tier: string;
  registerCode: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  roles?: Role[];
};

type Suggestion = {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  registerCode: string;
};

export default function UsersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [users, setUsers] = useState<User[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Suggestion states
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [company, setCompany] = useState('');
  const [roles, setRoles] = useState<string[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentPage = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const itemsPerPage = 10;

  // Fetch users (triggered by Apply button or page change)
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          q: searchQuery.trim(),
          status: statusFilter === 'All' ? '' : statusFilter,
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
        });

        const res = await fetch(`/api/users/search?${params.toString()}`);
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.details || 'ไม่สามารถดึงข้อมูลได้');
        }

        const result = await res.json();
        setUsers(result.data || []);
        setTotalItems(result.pagination.total || 0);
        setTotalPages(result.pagination.totalPages || 1);
      } catch (err: any) {
        setError(err.message || 'ไม่สามารถดึงข้อมูลผู้ใช้ได้');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, statusFilter, searchParams]);

  // Fetch suggestions as user types (debounced)
  useEffect(() => {
    const fetchSuggestions = async () => {
      const trimmedQuery = searchQuery.trim();
      
      console.log('Search query:', trimmedQuery, 'Length:', trimmedQuery.length);
      
      // Don't fetch if query is too short
      if (trimmedQuery.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setLoadingSuggestions(true);
      console.log('Fetching suggestions for:', trimmedQuery);

      try {
        const params = new URLSearchParams({
          q: trimmedQuery,
          status: '', // ไม่ filter status สำหรับ suggestions
          page: '1',
          limit: '5', // จำกัดแค่ 5 รายการสำหรับ suggestions
        });

        const url = `/api/users/search?${params.toString()}`;
        console.log('Fetching from:', url);

        const res = await fetch(url);
        console.log('Response status:', res.status);
        
        if (res.ok) {
          const result = await res.json();
          console.log('Suggestions result:', result);
          
          // แปลง User object เป็น Suggestion object
          const suggestionData = (result.data || []).map((user: User) => ({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            registerCode: user.registerCode,
          }));
          
          setSuggestions(suggestionData);
          setShowSuggestions(suggestionData.length > 0);
        } else {
          console.error('Failed to fetch suggestions:', res.status);
        }
      } catch (err) {
        console.error('Failed to fetch suggestions:', err);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    // Debounce the API call
    const timeoutId = setTimeout(fetchSuggestions, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (statusFilter !== 'All') params.set('status', statusFilter);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchQuery(suggestion.fullName);
    setShowSuggestions(false);
    // Optionally trigger search immediately
    setTimeout(() => {
      const params = new URLSearchParams();
      params.set('q', suggestion.fullName);
      if (statusFilter !== 'All') params.set('status', statusFilter);
      params.set('page', '1');
      router.push(`?${params.toString()}`);
    }, 100);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  const getPageNumbers = (): (number | 'ellipsis')[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, 5, 'ellipsis', totalPages];
    if (currentPage >= totalPages - 2)
      return [1, 'ellipsis', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, 'ellipsis', currentPage - 1, currentPage, currentPage + 1, 'ellipsis', totalPages];
  };

  const handleApproveClick = (user: User) => {
    setSelectedUser(user);
    setCompany('');
    setRoles([]);
    setShowModal(true);
  };

  const handleRoleChange = (role: string) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleConfirmApprove = () => {
    console.log('Mapping company submitted:', {
      userId: selectedUser?.id,
      fullName: selectedUser?.fullName,
      company,
      roles,
    });
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowModal(false);
      }
    };

    if (showModal) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showModal]);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="animate-spin w-12 h-12 mx-auto text-orange-500" />
        <p className="mt-4 text-gray-600">กำลังโหลดข้อมูลผู้ใช้...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="p-8 max-w-full mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="text-xs text-gray-500 mb-1">Home › User Management</div>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end mb-6">
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium">
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none z-10" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                console.log('Input changed:', e.target.value);
                setSearchQuery(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                console.log('Input focused, suggestions count:', suggestions.length);
                if (suggestions.length > 0 && searchQuery.trim().length >= 2) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Search users by name, email, phone, or code..."
              className="w-full h-10 pl-10 pr-4 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-orange-500 text-black relative z-0"
              autoComplete="off"
            />
            
            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div
                ref={suggestionRef}
                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto"
              >
                {loadingSuggestions ? (
                  <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    กำลังค้นหา...
                  </div>
                ) : suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-500">
                    ไม่พบผลลัพธ์
                  </div>
                ) : (
                  suggestions.map((suggestion) => (
                    <div
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-gray-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm truncate">
                            {suggestion.fullName}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {suggestion.email}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            {suggestion.phoneNumber} • {suggestion.registerCode}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-4 border border-gray-300 rounded-lg text-sm bg-white text-black"
          >
            <option value="All">Status: All</option>
            <option value="PENDING">Pending</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <button
            onClick={handleSearch}
            className="h-10 px-6 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium"
          >
            Apply
          </button>

          <div className="text-sm text-gray-600 ml-auto">
            Total: <span className="font-bold">{totalItems}</span> users
          </div>
        </div>
      </div>

      

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 uppercase font-medium text-xs">
              <tr>
                <th className="px-4 py-3 text-left"><input type="checkbox" className="rounded border-gray-400" /></th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Full Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-center">Registration Code</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-gray-500 font-medium">
                    ไม่พบผลการค้นหา
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="hover:bg-orange-50/30 transition h-16">
                    <td className="px-4 py-3"><input type="checkbox" className="rounded border-gray-400" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-gray-500" />
                        </div>
                        <span className="font-medium text-gray-900">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{user.fullName}</td>
                    <td className="px-4 py-3 text-gray-600">{user.email}</td>
                    <td className="px-4 py-3 text-gray-700">{user.phoneNumber}</td>
                    <td className="px-4 py-3 text-gray-600">{user.company || '-'}</td>
                    <td className="px-4 py-3 text-center font-medium text-gray-700">{user.registerCode}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' :
                          user.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                          user.status === 'INACTIVE' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.status === 'PENDING' ? 'Pending' :
                         user.status === 'ACTIVE' ? 'Active' :
                         user.status === 'INACTIVE' ? 'Inactive' : user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm space-x-2 flex justify-center">
                      <button
                        onClick={() => handleApproveClick(user)}
                        className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md text-xs"
                      >
                        <Check className="w-3 h-3" /> Approve
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs">
                        <Eye className="w-3 h-3" /> View
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs">
                        <X className="w-3 h-3" /> Reject
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white rounded-md text-xs">
                        <Edit className="w-3 h-3" /> Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalItems > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div>
              Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, totalItems)} of{' '}
              {totalItems} users
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className={`px-4 py-2 rounded border ${
                  currentPage <= 1 ? 'opacity-50 cursor-not-allowed border-gray-300' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>

              {getPageNumbers().map((page, i) =>
                page === 'ellipsis' ? (
                  <span key={`ellipsis-${i}`} className="px-2">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded ${
                      currentPage === page ? 'bg-orange-500 text-white' : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className={`px-4 py-2 rounded border ${
                  currentPage >= totalPages ? 'opacity-50 cursor-not-allowed border-gray-300' : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-gray-900 text-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-8 text-center">Mapping company</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300">
                    {selectedUser.fullName}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Registration Code</label>
                  <div className="px-4 py-3 bg-gray-800 rounded-lg text-gray-300">
                    {selectedUser.registerCode}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <select
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-orange-500 text-white"
                  >
                    <option value="">เลือกบริษัท</option>
                    <option value="Amsel Corporation">Amsel Corporation</option>
                    <option value="Thai Tech Solutions">Thai Tech Solutions</option>
                    <option value="Global Logistics Co.">Global Logistics Co.</option>
                    <option value="InnoSoft Ltd.">InnoSoft Ltd.</option>
                    <option value="Smart Retail Group">Smart Retail Group</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <div className="space-y-3">
                    {['Viewer', 'Approver', 'Maker'].map((role) => (
                      <label key={role} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={roles.includes(role)}
                          onChange={() => handleRoleChange(role)}
                          className="w-5 h-5 rounded border-gray-600 bg-gray-800 text-orange-500 focus:ring-orange-500"
                        />
                        <span>{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-10">
                <button
                  onClick={handleConfirmApprove}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium"
                >
                  Approve
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}