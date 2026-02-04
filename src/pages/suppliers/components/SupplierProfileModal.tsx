import { useState } from 'react';
import RecordPaymentModal from './RecordPaymentModal';

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  mobile: string;
  email: string;
  gstNumber: string;
  address: string;
  status: string;
  totalPurchases: number;
  pendingAmount: number;
  totalPaid: number;
  joinDate: string;
  purchaseHistory: Array<{
    billNo: string;
    date: string;
    amount: number;
    status: string;
    items: number;
  }>;
  paymentHistory: Array<{
    id: string;
    date: string;
    amount: number;
    mode: string;
    reference: string;
  }>;
}

interface SupplierProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplier: Supplier | null;
  onRecordPayment: (supplierId: string, amount: number) => void;
}

export default function SupplierProfileModal({ isOpen, onClose, supplier, onRecordPayment }: SupplierProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'purchases' | 'payments'>('overview');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  if (!isOpen || !supplier) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-6 py-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                <i className="ri-building-line text-2xl text-white"></i>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">{supplier.name}</h2>
                <p className="text-sm text-teal-100">{supplier.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex gap-6">
              {[
                { id: 'overview', label: 'Overview', icon: 'ri-dashboard-line' },
                { id: 'purchases', label: 'Purchase History', icon: 'ri-shopping-cart-line' },
                { id: 'payments', label: 'Payments', icon: 'ri-money-rupee-circle-line' }
              ].map((tab) => (
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
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-blue-600 mb-1">Total Purchases</p>
                    <p className="text-xl font-bold text-blue-900">
                      ₹{supplier.totalPurchases.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-xs text-green-600 mb-1">Total Paid</p>
                    <p className="text-xl font-bold text-green-900">
                      ₹{supplier.totalPaid.toLocaleString('en-IN')}
                    </p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                    <p className="text-xs text-orange-600 mb-1">Pending Amount</p>
                    <p className="text-xl font-bold text-orange-900">
                      ₹{supplier.pendingAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Supplier Details */}
                <div className="bg-gray-50 rounded-lg p-5 space-y-3">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Supplier Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Contact Person</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.contactPerson}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Mobile Number</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.mobile}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Email</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">GST Number</p>
                      <p className="text-sm font-medium text-gray-900 font-mono">{supplier.gstNumber}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 mb-1">Address</p>
                      <p className="text-sm font-medium text-gray-900">{supplier.address}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Join Date</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(supplier.joinDate).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Status</p>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        supplier.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {supplier.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Record Payment Button */}
                {supplier.pendingAmount > 0 && (
                  <button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    <i className="ri-money-rupee-circle-line text-lg"></i>
                    Record Payment
                  </button>
                )}
              </div>
            )}

            {activeTab === 'purchases' && (
              <div className="space-y-3">
                {supplier.purchaseHistory.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <i className="ri-shopping-cart-line text-4xl mb-2 block"></i>
                    <p className="text-sm">No purchase history</p>
                  </div>
                ) : (
                  supplier.purchaseHistory.map((purchase) => (
                    <div key={purchase.billNo} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-sm font-semibold text-gray-900">{purchase.billNo}</p>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              purchase.status === 'Paid'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {purchase.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <i className="ri-calendar-line"></i>
                              {new Date(purchase.date).toLocaleDateString('en-IN')}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-box-3-line"></i>
                              {purchase.items} items
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">
                            ₹{purchase.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-3">
                {supplier.paymentHistory.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <i className="ri-money-rupee-circle-line text-4xl mb-2 block"></i>
                    <p className="text-sm">No payment history</p>
                  </div>
                ) : (
                  supplier.paymentHistory.map((payment) => (
                    <div key={payment.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <p className="text-sm font-semibold text-gray-900">{payment.id}</p>
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {payment.mode}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <i className="ri-calendar-line"></i>
                              {new Date(payment.date).toLocaleDateString('en-IN')}
                            </span>
                            <span className="flex items-center gap-1 font-mono">
                              <i className="ri-file-list-line"></i>
                              {payment.reference}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            ₹{payment.amount.toLocaleString('en-IN')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <RecordPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        supplier={supplier}
        onRecordPayment={onRecordPayment}
      />
    </>
  );
}
