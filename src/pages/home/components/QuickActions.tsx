import { useState } from 'react';
import AddStockModal from './AddStockModal';
import UpdatePurchaseStockModal from './UpdatePurchaseStockModal';
import CreateOfferModal from '../../offers/components/CreateOfferModal';

const QuickActions = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const actions = [
    {
      id: 'add-stock',
      title: 'Add Stock',
      description: 'Manual Entry',
      icon: 'ri-add-circle-line',
      color: 'teal',
      bgColor: 'bg-teal-50',
      iconColor: 'text-teal-600',
      hoverColor: 'hover:bg-teal-100',
    },
    {
      id: 'update-purchase',
      title: 'Update Purchase Stock',
      description: 'Bulk Import',
      icon: 'ri-refresh-line',
      color: 'blue',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
      hoverColor: 'hover:bg-blue-100',
    },
    // {
    //   id: 'pending-orders',
    //   title: 'View Pending Orders',
    //   description: 'Process Orders',
    //   icon: 'ri-file-list-3-line',
    //   color: 'purple',
    //   bgColor: 'bg-purple-50',
    //   iconColor: 'text-purple-600',
    //   hoverColor: 'hover:bg-purple-100',
    // },
    {
      id: 'new-sales',
      title: 'New Sales',
      description: 'Create & Manage Sales',
      icon: 'ri-shopping-cart-2-line',
      color: 'purple',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
      hoverColor: 'hover:bg-purple-100',
    },
    
    {
      id: 'create-offer',
      title: 'Create Offers',
      description: 'Promotions',
      icon: 'ri-price-tag-3-line',
      color: 'orange',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
      hoverColor: 'hover:bg-orange-100',
    },
  ];

  const handleActionClick = (actionId: string) => {
    if (actionId === 'pending-orders') {
      window.REACT_APP_NAVIGATE('/orders');
    } else {
      setActiveModal(actionId);
    }
  };

  const handleOfferSuccess = () => {
    setActiveModal(null);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => handleActionClick(action.id)}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-left transition-all duration-200 cursor-pointer hover:shadow-md hover:border-gray-200 whitespace-nowrap"
          >
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 ${action.bgColor} rounded-lg flex items-center justify-center transition-colors ${action.hoverColor}`}>
                <i className={`${action.icon} text-xl ${action.iconColor}`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-gray-900 mb-0.5 truncate">{action.title}</h4>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 right-4 z-50 bg-teal-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-in">
          <i className="ri-checkbox-circle-fill text-2xl"></i>
          <div>
            <p className="font-semibold">Offer Created Successfully!</p>
            <p className="text-sm text-teal-50">Your promotional offer is now active.</p>
          </div>
        </div>
      )}

      {/* Modals */}
      <AddStockModal 
        isOpen={activeModal === 'add-stock'} 
        onClose={() => setActiveModal(null)} 
      />
      <UpdatePurchaseStockModal 
        isOpen={activeModal === 'update-purchase'} 
        onClose={() => setActiveModal(null)} 
      />
      <CreateOfferModal
        isOpen={activeModal === 'create-offer'}
        onClose={() => setActiveModal(null)}
        onSuccess={handleOfferSuccess}
      />
    </>
  );
};

export default QuickActions;
