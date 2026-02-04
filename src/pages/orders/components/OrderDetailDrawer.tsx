import { useEffect } from 'react';

interface Order {
  id: string;
  customerName: string;
  itemsCount: number;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  orderStatus: string;
  date: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  subtotal: number;
  tax: number;
  discount: number;
  timeline: Array<{
    status: string;
    date: string;
    completed: boolean;
  }>;
}

interface OrderDetailDrawerProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailDrawer({ order, isOpen, onClose }: OrderDetailDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!order) return null;

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-100 text-green-700';
      case 'COD':
        return 'bg-amber-100 text-amber-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-700';
      case 'Confirmed':
        return 'bg-indigo-100 text-indigo-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleGenerateInvoice = () => {
    alert(`Invoice generated for ${order.id}`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-2xl bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order Details</h2>
              <p className="text-sm text-gray-600 mt-0.5">{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <i className="ri-close-line text-gray-600 text-xl"></i>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Order Info */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Order Date</p>
                  <p className="text-sm font-medium text-gray-900">{order.date}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Order Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Payment Method</p>
                  <p className="text-sm font-medium text-gray-900">{order.paymentMethod}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Payment Status</p>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <i className="ri-user-line mr-2 text-teal-600"></i>
                Customer Information
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-900 mb-2">{order.customerName}</p>
                <p className="text-sm text-gray-600 mb-1 flex items-center">
                  <i className="ri-mail-line mr-2 text-gray-400"></i>
                  {order.customerEmail}
                </p>
                <p className="text-sm text-gray-600 flex items-center">
                  <i className="ri-phone-line mr-2 text-gray-400"></i>
                  {order.customerPhone}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <i className="ri-map-pin-line mr-2 text-teal-600"></i>
                Shipping Address
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-700">{order.shippingAddress}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <i className="ri-shopping-bag-line mr-2 text-teal-600"></i>
                Order Items ({order.itemsCount})
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700">Item</th>
                      <th className="px-4 py-3 text-center text-xs font-semibold text-gray-700">Qty</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Price</th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">${item.price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">${item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Billing Summary */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <i className="ri-file-text-line mr-2 text-teal-600"></i>
                Billing Summary
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="text-gray-900 font-medium">${order.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount</span>
                    <span className="text-green-600 font-medium">-${order.discount.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900">Total Amount</span>
                      <span className="text-lg font-bold text-teal-600">${order.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleGenerateInvoice}
                  className="w-full mt-4 px-4 py-2.5 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-file-download-line mr-2"></i>
                  Generate Invoice
                </button>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <i className="ri-time-line mr-2 text-teal-600"></i>
                Order Timeline
              </h3>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="space-y-4">
                  {order.timeline.map((event, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`w-8 h-8 flex items-center justify-center rounded-full flex-shrink-0 ${
                        event.completed ? 'bg-teal-100' : 'bg-gray-100'
                      }`}>
                        {event.completed ? (
                          <i className="ri-check-line text-teal-600 text-sm"></i>
                        ) : (
                          <i className="ri-time-line text-gray-400 text-sm"></i>
                        )}
                      </div>
                      <div className="ml-3 flex-1">
                        <p className={`text-sm font-medium ${
                          event.completed ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {event.status}
                        </p>
                        {event.date && (
                          <p className="text-xs text-gray-500 mt-0.5">{event.date}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
