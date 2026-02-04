import { useState } from 'react';

interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  totalOrders: number;
  totalSpend: number;
  lastPurchaseDate: string;
  joinDate: string;
}

interface CustomersTableProps {
  customers: Customer[];
  onViewProfile: (customer: Customer) => void;
}

export default function CustomersTable({ customers, onViewProfile }: CustomersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'totalSpend' | 'totalOrders'>('totalSpend');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const itemsPerPage = 10;

  const sortedCustomers = [...customers].sort((a, b) => {
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'name') {
      return multiplier * a.name.localeCompare(b.name);
    }
    return multiplier * (a[sortBy] - b[sortBy]);
  });

  const totalPages = Math.ceil(sortedCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = sortedCustomers.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (field: 'name' | 'totalSpend' | 'totalOrders') => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-2 hover:text-gray-900 cursor-pointer whitespace-nowrap"
                >
                  Customer Name
                  {sortBy === 'name' && (
                    <i className={`ri-arrow-${sortOrder === 'asc' ? 'up' : 'down'}-s-line text-sm`}></i>
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Mobile Number
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('totalOrders')}
                  className="flex items-center gap-2 hover:text-gray-900 cursor-pointer whitespace-nowrap"
                >
                  Total Orders
                  {sortBy === 'totalOrders' && (
                    <i className={`ri-arrow-${sortOrder === 'asc' ? 'up' : 'down'}-s-line text-sm`}></i>
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('totalSpend')}
                  className="flex items-center gap-2 hover:text-gray-900 cursor-pointer whitespace-nowrap"
                >
                  Total Spend
                  {sortBy === 'totalSpend' && (
                    <i className={`ri-arrow-${sortOrder === 'asc' ? 'up' : 'down'}-s-line text-sm`}></i>
                  )}
                </button>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Last Purchase
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-semibold text-teal-600">
                        {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 whitespace-nowrap">{customer.name}</p>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900 whitespace-nowrap">{customer.mobile}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">{customer.totalOrders}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                    ₹{customer.totalSpend.toLocaleString('en-IN')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 whitespace-nowrap">{formatDate(customer.lastPurchaseDate)}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => onViewProfile(customer)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-eye-line text-base"></i>
                    View Profile
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, customers.length)} of {customers.length} customers
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium cursor-pointer whitespace-nowrap ${
                  currentPage === page
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
