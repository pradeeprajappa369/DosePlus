import React, { useState, useEffect } from 'react';
import { updatePharmacySubscription, getCurrentPharmacySubscription } from '../../../../mocks/subscriptionRules';

interface PaymentControlModalProps {
  isOpen: boolean;
  onClose: () => void;
  pharmacy: {
    id: string;
    name: string;
    paymentStatus: string;
  } | null;
}

const PaymentControlModal: React.FC<PaymentControlModalProps> = ({ isOpen, onClose, pharmacy }) => {
  const [selectedStatus, setSelectedStatus] = useState<'paid' | 'pending' | 'disabled'>('paid');
  const [reason, setReason] = useState('');

  useEffect(() => {
    if (pharmacy) {
      setSelectedStatus(pharmacy.paymentStatus.toLowerCase() as 'paid' | 'pending' | 'disabled');
      setReason('');
    }
  }, [pharmacy]);

  if (!isOpen || !pharmacy) return null;

  const handleSave = () => {
    // Update the pharmacy's subscription in localStorage (mock)
    const currentSubscription = getCurrentPharmacySubscription();
    if (currentSubscription.pharmacyId === pharmacy.id) {
      updatePharmacySubscription({
        ...currentSubscription,
        paymentStatus: selectedStatus,
      });
    }

    // Show success message
    alert(`Payment status updated to ${selectedStatus} for ${pharmacy.name}`);
    onClose();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'disabled':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Payment Control</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Pharmacy</span>
              <span className="font-semibold text-gray-900">{pharmacy.name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Current Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(pharmacy.paymentStatus)}`}>
                {pharmacy.paymentStatus}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Payment Status
            </label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="paid"
                  checked={selectedStatus === 'paid'}
                  onChange={(e) => setSelectedStatus(e.target.value as 'paid')}
                  className="mt-1 w-4 h-4 text-teal-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <i className="ri-checkbox-circle-fill text-green-600"></i>
                    <span className="font-semibold text-gray-900">Paid</span>
                  </div>
                  <p className="text-sm text-gray-600">Full access to all features as per plan</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="pending"
                  checked={selectedStatus === 'pending'}
                  onChange={(e) => setSelectedStatus(e.target.value as 'pending')}
                  className="mt-1 w-4 h-4 text-teal-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <i className="ri-time-fill text-amber-600"></i>
                    <span className="font-semibold text-gray-900">Pending</span>
                  </div>
                  <p className="text-sm text-gray-600">Show warning banner, full access maintained</p>
                </div>
              </label>

              <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentStatus"
                  value="disabled"
                  checked={selectedStatus === 'disabled'}
                  onChange={(e) => setSelectedStatus(e.target.value as 'disabled')}
                  className="mt-1 w-4 h-4 text-teal-600 cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <i className="ri-close-circle-fill text-red-600"></i>
                    <span className="font-semibold text-gray-900">Disabled</span>
                  </div>
                  <p className="text-sm text-gray-600">Lock Sales, Purchase, and Orders modules</p>
                </div>
              </label>
            </div>
          </div>

          {selectedStatus === 'disabled' && (
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Reason for Disabling <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter reason for disabling payments..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                rows={3}
              />
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <i className="ri-alert-line text-amber-600 text-xl flex-shrink-0"></i>
              <div>
                <p className="text-sm font-semibold text-amber-900 mb-1">Important Notice</p>
                <p className="text-sm text-amber-800">
                  Changes will take effect immediately. The pharmacy will see updated restrictions in their dashboard.
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={selectedStatus === 'disabled' && !reason.trim()}
              className="flex-1 px-4 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentControlModal;
