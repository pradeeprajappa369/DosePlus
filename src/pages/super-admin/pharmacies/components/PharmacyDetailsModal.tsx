import { useState } from 'react';

interface PharmacyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  pharmacy: any;
}

export default function PharmacyDetailsModal({ isOpen, onClose, pharmacy }: PharmacyDetailsModalProps) {
  if (!isOpen || !pharmacy) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-teal-600 to-teal-700 text-white px-8 py-6 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-2xl font-bold">{pharmacy.pharmacyName}</h2>
            <p className="text-teal-100 text-sm mt-1">Pharmacy ID: {pharmacy.id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Owner Information */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-user-line text-teal-600"></i>
              Owner Information
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Owner Name</p>
                <p className="font-semibold text-gray-900">{pharmacy.ownerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">{pharmacy.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-semibold text-gray-900">{pharmacy.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">City</p>
                <p className="font-semibold text-gray-900">{pharmacy.city}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-600 mb-1">Address</p>
                <p className="font-semibold text-gray-900">{pharmacy.address}</p>
              </div>
            </div>
          </div>

          {/* Subscription Details */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-vip-crown-line text-teal-600"></i>
              Subscription Details
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                <p className="font-bold text-teal-600 text-lg">{pharmacy.currentPlan}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Subscription Status</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  pharmacy.subscriptionStatus === 'Active' ? 'bg-green-100 text-green-700' :
                  pharmacy.subscriptionStatus === 'Trial' ? 'bg-blue-100 text-blue-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {pharmacy.subscriptionStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Start Date</p>
                <p className="font-semibold text-gray-900">{new Date(pharmacy.subscriptionStartDate).toLocaleDateString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">End Date</p>
                <p className="font-semibold text-gray-900">{new Date(pharmacy.subscriptionEndDate).toLocaleDateString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Payment</p>
                <p className="font-semibold text-gray-900">{new Date(pharmacy.lastPaymentDate).toLocaleDateString('en-IN')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Next Payment</p>
                <p className="font-semibold text-gray-900">{new Date(pharmacy.nextPaymentDate).toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          </div>

          {/* Business Metrics */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-bar-chart-line text-teal-600"></i>
              Business Metrics
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-6 border border-teal-200">
                <div className="w-12 h-12 flex items-center justify-center bg-teal-600 rounded-lg mb-3">
                  <i className="ri-money-rupee-circle-line text-2xl text-white"></i>
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{pharmacy.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                <div className="w-12 h-12 flex items-center justify-center bg-blue-600 rounded-lg mb-3">
                  <i className="ri-team-line text-2xl text-white"></i>
                </div>
                <p className="text-sm text-gray-600 mb-1">Staff Count</p>
                <p className="text-2xl font-bold text-gray-900">{pharmacy.staffCount}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                <div className="w-12 h-12 flex items-center justify-center bg-purple-600 rounded-lg mb-3">
                  <i className="ri-shopping-bag-line text-2xl text-white"></i>
                </div>
                <p className="text-sm text-gray-600 mb-1">Monthly Orders</p>
                <p className="text-2xl font-bold text-gray-900">{pharmacy.monthlyOrders}</p>
              </div>
            </div>
          </div>

          {/* Status Overview */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <i className="ri-shield-check-line text-teal-600"></i>
              Status Overview
            </h3>
            <div className="grid grid-cols-3 gap-4 bg-gray-50 rounded-lg p-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Payment Status</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  pharmacy.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' :
                  pharmacy.paymentStatus === 'Pending' ? 'bg-orange-100 text-orange-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {pharmacy.paymentStatus}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Online Store</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  pharmacy.onlineStore ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {pharmacy.onlineStore ? 'Enabled' : 'Disabled'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Account Status</p>
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  pharmacy.accountStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {pharmacy.accountStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 px-8 py-4 flex justify-end gap-3 rounded-b-xl border-t">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors whitespace-nowrap"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}