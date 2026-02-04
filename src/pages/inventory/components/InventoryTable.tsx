
interface InventoryItem {
  id: string;
  medicineName: string;
  batchNo: string;
  category: string;
  stockQuantity: number;
  expiryDate: string;
  price: number;
  status: 'In Stock' | 'Low Stock' | 'Expired';
}

interface InventoryTableProps {
  products: InventoryItem[];
  onEdit: (product: InventoryItem) => void;
  onDelete: (productId: string) => void;
}

export default function InventoryTable({ products, onEdit, onDelete }: InventoryTableProps) {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Low Stock':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Expired':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'ri-checkbox-circle-line';
      case 'Low Stock':
        return 'ri-error-warning-line';
      case 'Expired':
        return 'ri-close-circle-line';
      default:
        return 'ri-information-line';
    }
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const daysUntilExpiry = Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 30 && daysUntilExpiry > 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Medicine Name
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Batch No
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Stock Quantity
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((item) => (
              <tr 
                key={item.id} 
                className={`hover:bg-gray-50 transition-colors ${
                  item.status === 'Expired' ? 'bg-red-50/30' : 
                  item.status === 'Low Stock' ? 'bg-amber-50/30' : ''
                }`}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                      <i className="ri-capsule-line text-teal-600 text-lg"></i>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-800">{item.medicineName}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 font-mono">{item.batchNo}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700">{item.category}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-semibold ${
                      item.stockQuantity < 50 ? 'text-amber-600' : 'text-gray-800'
                    }`}>
                      {item.stockQuantity}
                    </span>
                    <span className="text-xs text-gray-500">units</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${
                      item.status === 'Expired' ? 'text-red-600 font-medium' :
                      isExpiringSoon(item.expiryDate) ? 'text-amber-600 font-medium' :
                      'text-gray-700'
                    }`}>
                      {item.expiryDate}
                    </span>
                    {isExpiringSoon(item.expiryDate) && item.status !== 'Expired' && (
                      <i className="ri-alarm-warning-line text-amber-500 text-sm"></i>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-gray-800">${item.price.toFixed(2)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusStyles(item.status)}`}>
                    <i className={`${getStatusIcon(item.status)} text-sm`}></i>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => onEdit(item)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                      <i className="ri-edit-line text-gray-600 group-hover:text-teal-600 text-base"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group">
                      <i className="ri-eye-line text-gray-600 group-hover:text-teal-600 text-base"></i>
                    </button>
                    <button 
                      onClick={() => onDelete(item.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 transition-colors cursor-pointer group"
                    >
                      <i className="ri-delete-bin-line text-gray-600 group-hover:text-red-600 text-base"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {products.length === 0 && (
        <div className="py-16 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-inbox-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-base font-medium text-gray-800 mb-1">No medicines found</h3>
          <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-800">{products.length}</span> of <span className="font-medium text-gray-800">{products.length}</span> medicines
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-white bg-teal-500 border border-teal-500 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              2
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              3
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
