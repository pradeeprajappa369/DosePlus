import { useState } from 'react';

interface PurchaseHistory {
  invoiceId: string;
  date: string;
  amount: number;
  items: number;
  status: string;
}

interface Customer {
  id: string;
  name: string;
  mobile: string;
  email: string;
  totalOrders: number;
  totalSpend: number;
  lastPurchaseDate: string;
  joinDate: string;
  lifetimeValue: number;
  purchaseHistory: PurchaseHistory[];
  notes: string;
}

interface CustomerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  customer: Customer | null;
}

export default function CustomerProfileModal({ isOpen, onClose, customer }: CustomerProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'notes'>('overview');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen || !customer) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'ri-user-line' },
    { id: 'history', label: 'Purchase History', icon: 'ri-shopping-bag-line' },
    { id: 'notes', label: 'Notes', icon: 'ri-file-text-line' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-lg font-bold text-teal-600">
                {customer.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{customer.name}</h2>
              <p className="text-sm text-gray-500">Customer ID: {customer.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer flex-shrink-0"
          >
            <i className="ri-close-line text-2xl text-gray-500"></i>
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6 flex-shrink-0">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-1 py-3 border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <i className={`${tab.icon} text-lg`}></i>
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Mobile Number</p>
                    <p className="text-sm font-medium text-gray-900">{customer.mobile}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Email Address</p>
                    <p className="text-sm font-medium text-gray-900">{customer.email}</p>
                  </div>
                </div>
              </div>

              {/* Customer Stats */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Customer Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-shopping-bag-line text-blue-600"></i>
                      <p className="text-xs text-blue-600 font-medium">Total Orders</p>
                    </div>
                    <p className="text-2xl font-bold text-blue-900">{customer.totalOrders}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-money-rupee-circle-line text-green-600"></i>
                      <p className="text-xs text-green-600 font-medium">Total Spend</p>
                    </div>
                    <p className="text-2xl font-bold text-green-900">₹{customer.totalSpend.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-line-chart-line text-purple-600"></i>
                      <p className="text-xs text-purple-600 font-medium">Lifetime Value</p>
                    </div>
                    <p className="text-2xl font-bold text-purple-900">₹{customer.lifetimeValue.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="ri-calendar-line text-orange-600"></i>
                      <p className="text-xs text-orange-600 font-medium">Member Since</p>
                    </div>
                    <p className="text-sm font-bold text-orange-900">{formatDate(customer.joinDate)}</p>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Last Purchase</p>
                      <p className="text-xs text-gray-600 mt-1">{formatDate(customer.lastPurchaseDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">Average Order Value</p>
                      <p className="text-xs text-gray-600 mt-1">
                        ₹{Math.round(customer.totalSpend / customer.totalOrders).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes Preview */}
              {customer.notes && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Notes</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{customer.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Purchase History Tab */}
          {activeTab === 'history' && (
            <div>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
                        Invoice ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
                        Items
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {customer.purchaseHistory.map((purchase) => (
                      <tr key={purchase.invoiceId} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <span className="text-sm font-medium text-teal-600">{purchase.invoiceId}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-900 whitespace-nowrap">{formatDate(purchase.date)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-gray-900">{purchase.items}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                            ₹{purchase.amount.toLocaleString('en-IN')}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 whitespace-nowrap">
                            {purchase.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="inline-flex items-center gap-1 px-3 py-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors text-xs font-medium cursor-pointer whitespace-nowrap">
                            <i className="ri-file-text-line"></i>
                            View Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pharmacist Notes
                </label>
                <textarea
                  value={customerNotes || customer.notes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Add notes about this customer (e.g., medical conditions, preferences, special instructions)..."
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
                />
              </div>
              <button className="px-4 py-2.5 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap">
                Save Notes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
