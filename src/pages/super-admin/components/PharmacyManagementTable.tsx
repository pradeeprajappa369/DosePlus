
import { useState } from 'react';
import { pharmaciesData } from '../../../mocks/pharmaciesData';

interface Pharmacy {
  id: string;
  pharmacyName: string;
  planType: string;
  paymentStatus: 'enabled' | 'disabled';
  onlineStoreStatus: 'enabled' | 'disabled';
  accountStatus: 'active' | 'suspended';
  email: string;
  phone: string;
  registeredDate: string;
}

export default function PharmacyManagementTable() {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>(pharmaciesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleTogglePayment = (id: string) => {
    setPharmacies(prev => prev.map(pharmacy => 
      pharmacy.id === id 
        ? { ...pharmacy, paymentStatus: pharmacy.paymentStatus === 'enabled' ? 'disabled' : 'enabled' }
        : pharmacy
    ));
  };

  const handleToggleOnlineStore = (id: string) => {
    setPharmacies(prev => prev.map(pharmacy => 
      pharmacy.id === id 
        ? { ...pharmacy, onlineStoreStatus: pharmacy.onlineStoreStatus === 'enabled' ? 'disabled' : 'enabled' }
        : pharmacy
    ));
  };

  const handleToggleAccount = (id: string) => {
    setPharmacies(prev => prev.map(pharmacy => 
      pharmacy.id === id 
        ? { ...pharmacy, accountStatus: pharmacy.accountStatus === 'active' ? 'suspended' : 'active' }
        : pharmacy
    ));
  };

  const filteredPharmacies = pharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pharmacy.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'all' || pharmacy.planType === filterPlan;
    const matchesStatus = filterStatus === 'all' || pharmacy.accountStatus === filterStatus;
    
    return matchesSearch && matchesPlan && matchesStatus;
  });

  const getStatusBadge = (status: string, type: 'payment' | 'store' | 'account') => {
    if (type === 'account') {
      return status === 'active' 
        ? <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Active</span>
        : <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Suspended</span>;
    }
    
    return status === 'enabled'
      ? <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Enabled</span>
      : <span className="px-3 py-1 text-xs font-semibold rounded-full bg-orange-100 text-orange-800">Disabled</span>;
  };

  const getPlanBadge = (plan: string) => {
    const colors: { [key: string]: string } = {
      'Free': 'bg-gray-100 text-gray-800',
      'Basic': 'bg-blue-100 text-blue-800',
      'Premium': 'bg-purple-100 text-purple-800',
      'Enterprise': 'bg-indigo-100 text-indigo-800'
    };
    
    return <span className={`px-3 py-1 text-xs font-semibold rounded-full ${colors[plan] || 'bg-gray-100 text-gray-800'}`}>{plan}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search by pharmacy name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="all">All Plans</option>
              <option value="Free">Free</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Pharmacy Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Plan Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Online Store
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Account Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredPharmacies.map((pharmacy) => (
              <tr key={pharmacy.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-gray-900">{pharmacy.pharmacyName}</div>
                    <div className="text-sm text-gray-600">{pharmacy.email}</div>
                    <div className="text-xs text-gray-500 mt-1">{pharmacy.phone}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {getPlanBadge(pharmacy.planType)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(pharmacy.paymentStatus, 'payment')}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(pharmacy.onlineStoreStatus, 'store')}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(pharmacy.accountStatus, 'account')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handleTogglePayment(pharmacy.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        pharmacy.paymentStatus === 'enabled'
                          ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      <i className={`${pharmacy.paymentStatus === 'enabled' ? 'ri-close-circle-line' : 'ri-checkbox-circle-line'}`}></i>
                      {pharmacy.paymentStatus === 'enabled' ? 'Disable Payment' : 'Enable Payment'}
                    </button>
                    
                    <button
                      onClick={() => handleToggleOnlineStore(pharmacy.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        pharmacy.onlineStoreStatus === 'enabled'
                          ? 'bg-orange-50 text-orange-700 hover:bg-orange-100'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      <i className={`${pharmacy.onlineStoreStatus === 'enabled' ? 'ri-close-circle-line' : 'ri-checkbox-circle-line'}`}></i>
                      {pharmacy.onlineStoreStatus === 'enabled' ? 'Disable Store' : 'Enable Store'}
                    </button>
                    
                    <button
                      onClick={() => handleToggleAccount(pharmacy.id)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                        pharmacy.accountStatus === 'active'
                          ? 'bg-red-50 text-red-700 hover:bg-red-100'
                          : 'bg-green-50 text-green-700 hover:bg-green-100'
                      }`}
                    >
                      <i className={`${pharmacy.accountStatus === 'active' ? 'ri-lock-line' : 'ri-lock-unlock-line'}`}></i>
                      {pharmacy.accountStatus === 'active' ? 'Suspend Account' : 'Activate Account'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredPharmacies.length === 0 && (
        <div className="text-center py-12">
          <i className="ri-inbox-line text-5xl text-gray-300 mb-3"></i>
          <p className="text-gray-500 font-medium">No pharmacies found</p>
          <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{filteredPharmacies.length}</span> of <span className="font-semibold">{pharmacies.length}</span> pharmacies
          </p>
        </div>
      </div>
    </div>
  );
}
