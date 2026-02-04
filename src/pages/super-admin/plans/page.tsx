import { useState } from 'react';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import SuperAdminHeader from '../components/SuperAdminHeader';
import CreateEditPlanModal from './components/CreateEditPlanModal';
import ViewSubscribersModal from './components/ViewSubscribersModal';

interface Plan {
  id: string;
  name: string;
  price: string;
  billingCycle: 'monthly' | 'yearly';
  maxStaff: string;
  features: {
    inventory: boolean;
    sales: boolean;
    purchases: boolean;
    suppliers: boolean;
    reports: boolean;
    onlineStore: boolean;
  };
  status: 'active' | 'inactive';
  subscriberCount: number;
}

export default function SubscriptionPlansManagement() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewSubscribersOpen, setIsViewSubscribersOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: '1',
      name: 'Starter',
      price: '999',
      billingCycle: 'monthly',
      maxStaff: '1',
      features: {
        inventory: true,
        sales: true,
        purchases: false,
        suppliers: false,
        reports: false,
        onlineStore: false,
      },
      status: 'active',
      subscriberCount: 58,
    },
    {
      id: '2',
      name: 'Professional',
      price: '1999',
      billingCycle: 'monthly',
      maxStaff: '5',
      features: {
        inventory: true,
        sales: true,
        purchases: true,
        suppliers: true,
        reports: true,
        onlineStore: false,
      },
      status: 'active',
      subscriberCount: 124,
    },
    {
      id: '3',
      name: 'Enterprise',
      price: '3999',
      billingCycle: 'monthly',
      maxStaff: 'Unlimited',
      features: {
        inventory: true,
        sales: true,
        purchases: true,
        suppliers: true,
        reports: true,
        onlineStore: true,
      },
      status: 'active',
      subscriberCount: 65,
    },
  ]);

  const mockSubscribers = [
    {
      pharmacyName: 'MedPlus Pharmacy',
      email: 'admin@medplus.com',
      subscriptionDate: '15 Jan 2024',
      nextBilling: '15 Feb 2024',
      status: 'active' as const,
    },
    {
      pharmacyName: 'Apollo Pharmacy',
      email: 'admin@apollo.com',
      subscriptionDate: '20 Jan 2024',
      nextBilling: '20 Feb 2024',
      status: 'active' as const,
    },
    {
      pharmacyName: 'HealthCare Pharmacy',
      email: 'admin@healthcare.com',
      subscriptionDate: '10 Jan 2024',
      nextBilling: '10 Feb 2024',
      status: 'cancelled' as const,
    },
  ];

  const handleCreatePlan = () => {
    setSelectedPlan(null);
    setIsCreateModalOpen(true);
  };

  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsCreateModalOpen(true);
  };

  const handleSavePlan = (planData: Plan) => {
    if (selectedPlan) {
      setPlans(plans.map((p) => (p.id === selectedPlan.id ? { ...planData, id: p.id } : p)));
    } else {
      setPlans([...plans, { ...planData, id: Date.now().toString(), subscriberCount: 0 }]);
    }
  };

  const handleToggleStatus = (planId: string) => {
    setPlans(
      plans.map((p) =>
        p.id === planId ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
      )
    );
  };

  const handleViewSubscribers = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsViewSubscribersOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SuperAdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <SuperAdminHeader isSidebarCollapsed={isSidebarCollapsed} />

      <main
        className={`transition-all duration-300 pt-20 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Subscription Plans</h2>
              <p className="text-sm text-gray-500 mt-1">Manage pricing and features for all plans</p>
            </div>
            <button
              onClick={handleCreatePlan}
              className="px-6 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line mr-2"></i>
              Create New Plan
            </button>
          </div>

          {/* Plans Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Plan Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Price / Month
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Billing Cycle
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Max Staff
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Features
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Subscribers
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {plans.map((plan) => (
                    <tr key={plan.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                            <i className="ri-vip-crown-line text-lg text-white"></i>
                          </div>
                          <span className="text-sm font-bold text-gray-900">{plan.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-gray-900">₹{plan.price}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600 capitalize">{plan.billingCycle}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{plan.maxStaff}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {plan.features.inventory && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium whitespace-nowrap">
                              Inventory
                            </span>
                          )}
                          {plan.features.sales && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-md font-medium whitespace-nowrap">
                              Sales
                            </span>
                          )}
                          {plan.features.reports && (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-md font-medium whitespace-nowrap">
                              Reports
                            </span>
                          )}
                          {plan.features.onlineStore && (
                            <span className="px-2 py-1 bg-teal-100 text-teal-700 text-xs rounded-md font-medium whitespace-nowrap">
                              Online Store
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewSubscribers(plan)}
                          className="text-sm font-semibold text-teal-600 hover:text-teal-700 cursor-pointer whitespace-nowrap"
                        >
                          {plan.subscriberCount} pharmacies
                        </button>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                            plan.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {plan.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditPlan(plan)}
                            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors cursor-pointer"
                            title="Edit Plan"
                          >
                            <i className="ri-edit-line text-gray-600"></i>
                          </button>
                          <button
                            onClick={() => handleToggleStatus(plan.id)}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                              plan.status === 'active'
                                ? 'bg-red-100 hover:bg-red-200'
                                : 'bg-green-100 hover:bg-green-200'
                            }`}
                            title={plan.status === 'active' ? 'Disable Plan' : 'Enable Plan'}
                          >
                            <i
                              className={`${
                                plan.status === 'active'
                                  ? 'ri-close-circle-line text-red-600'
                                  : 'ri-check-circle-line text-green-600'
                              }`}
                            ></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <i className="ri-vip-crown-line text-2xl text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Plans</p>
                  <p className="text-2xl font-bold text-gray-900">{plans.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <i className="ri-check-line text-2xl text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Plans</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {plans.filter((p) => p.status === 'active').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <i className="ri-hospital-line text-2xl text-white"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Subscribers</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {plans.reduce((sum, p) => sum + p.subscriberCount, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <CreateEditPlanModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        plan={selectedPlan}
        onSave={handleSavePlan}
      />

      <ViewSubscribersModal
        isOpen={isViewSubscribersOpen}
        onClose={() => setIsViewSubscribersOpen(false)}
        planName={selectedPlan?.name || ''}
        subscribers={mockSubscribers}
      />
    </div>
  );
}
