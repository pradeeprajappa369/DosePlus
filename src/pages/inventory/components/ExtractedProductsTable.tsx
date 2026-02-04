import { useState, useEffect } from 'react';

interface ExtractedProduct {
  id: string;
  productName: string;
  category: string;
  stockQuantity: number;
  sellingPrice: number;
  expiryDate: string;
  supplier: string;
  batchNumber: string;
  status: 'matched' | 'review';
  isValid: boolean;
}

interface ExtractedProductsTableProps {
  onClose: () => void;
  onBack: () => void;
  initialProducts: any[];
}

export default function ExtractedProductsTable({
  onClose,
  onBack,
  initialProducts,
}: ExtractedProductsTableProps) {
  const [markAllInStock, setMarkAllInStock] = useState(true);
  const [products, setProducts] = useState<ExtractedProduct[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Initialize products from props
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  // Validate product and update status
  const validateProduct = (product: ExtractedProduct): ExtractedProduct => {
    const isValid = 
      product.productName.trim().length > 0 &&
      product.stockQuantity > 0 &&
      product.sellingPrice > 0 &&
      product.expiryDate.length > 0 &&
      product.category.length > 0;

    return {
      ...product,
      isValid,
      status: isValid ? 'matched' : 'review'
    };
  };

  // Update a product field and revalidate
  const handleProductChange = (
    id: string,
    field: keyof ExtractedProduct,
    value: string | number,
  ) => {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === id) {
          const updated = { ...product, [field]: value };
          return validateProduct(updated);
        }
        return product;
      }),
    );
  };

  // Calculate live statistics
  const totalProducts = products.length;
  const matchedProducts = products.filter(p => p.status === 'matched').length;
  const reviewProducts = products.filter(p => p.status === 'review').length;
  const totalQuantity = products.reduce((sum, p) => sum + p.stockQuantity, 0);
  const allValid = products.every(p => p.isValid);

  // Confirm handler with validation
  const handleConfirm = () => {
    if (!isConfirmed) {
      alert('Please check the confirmation checkbox before proceeding.');
      return;
    }

    if (!allValid) {
      alert('Please fix all items marked as "Needs Review" before confirming.');
      return;
    }

    const invalid = products.find(
      (p) => !p.productName.trim() || p.stockQuantity <= 0 || p.sellingPrice < 0,
    );
    
    if (invalid) {
      alert(
        `Please correct product "${invalid.productName || '(missing name)'}" before confirming.`,
      );
      return;
    }

    try {
      console.log('Confirmed products:', products);
      alert(`Successfully added ${products.length} products to inventory!`);
      onClose();
    } catch (err) {
      console.error('Error confirming products:', err);
      alert('An unexpected error occurred while adding products.');
    }
  };

  const handleMarkAllChange = (checked: boolean) => {
    setMarkAllInStock(checked);
    if (checked) {
      setProducts((prev) =>
        prev.map((p) => ({
          ...p,
          stockQuantity: p.stockQuantity > 0 ? p.stockQuantity : 1,
        })),
      );
    }
  };

  // Remove product
  const handleRemoveProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line text-gray-600"></i>
          </button>
          <h3 className="text-xl font-bold text-gray-800">
            Confirm Extracted Products
          </h3>
        </div>
        <p className="text-sm text-gray-600 ml-11">
          Review and edit the extracted product information before adding to
          inventory
        </p>
      </div>

      {/* Success Banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i className="ri-check-line text-white text-xl"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-800">
              Extraction Complete
            </h4>
            <p className="text-sm text-gray-600">
              Successfully extracted {totalProducts} products from the invoice
            </p>
          </div>
        </div>
      </div>

      {/* Live Summary Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <i className="ri-medicine-bottle-line text-white"></i>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Total Detected</p>
              <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <i className="ri-check-double-line text-white"></i>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{matchedProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <i className="ri-alert-line text-white"></i>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Needs Review</p>
              <p className="text-2xl font-bold text-orange-600">{reviewProducts}</p>
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <i className="ri-stack-line text-white"></i>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-0.5">Total Quantity</p>
              <p className="text-2xl font-bold text-purple-600">{totalQuantity}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mark All Checkbox */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={markAllInStock}
            onChange={(e) => handleMarkAllChange(e.target.checked)}
            className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-2 focus:ring-teal-500/20 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700">
            Mark all products as In Stock
          </span>
        </label>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price (₹)
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Expiry Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Supplier
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    product.status === 'review' ? 'bg-orange-50/30' : ''
                  }`}
                >
                  <td className="px-4 py-4">
                    <input
                      type="text"
                      value={product.productName}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          'productName',
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <select
                      value={product.category}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          'category',
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer bg-white"
                    >
                      <option value="Prescription">Prescription</option>
                      <option value="Over-the-Counter">
                        Over-the-Counter
                      </option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      value={product.stockQuantity}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          'stockQuantity',
                          parseInt(e.target.value, 10) || 0,
                        )
                      }
                      className="w-24 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      min="1"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="number"
                      value={product.sellingPrice}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          'sellingPrice',
                          parseFloat(e.target.value) || 0,
                        )
                      }
                      className="w-28 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      step="0.01"
                      min="0"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <input
                      type="date"
                      value={product.expiryDate}
                      onChange={(e) =>
                        handleProductChange(
                          product.id,
                          'expiryDate',
                          e.target.value,
                        )
                      }
                      className="w-40 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-gray-700">
                      {product.supplier}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {product.status === 'matched' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full whitespace-nowrap">
                        <i className="ri-check-line"></i>
                        Matched
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full whitespace-nowrap">
                        <i className="ri-alert-line"></i>
                        Needs Review
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleRemoveProduct(product.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 text-red-500 transition-colors cursor-pointer mx-auto"
                      title="Remove product"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Checkbox */}
      <div className={`rounded-xl border p-5 mb-6 ${
        allValid ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'
      }`}>
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="confirmReview"
            checked={isConfirmed}
            onChange={(e) => setIsConfirmed(e.target.checked)}
            className="w-5 h-5 text-teal-500 border-gray-300 rounded focus:ring-teal-500 cursor-pointer mt-0.5"
          />
          <label htmlFor="confirmReview" className="flex-1 cursor-pointer">
            <p className="text-sm font-semibold text-gray-800 mb-1">
              {allValid 
                ? '✓ All products validated and ready to add'
                : '⚠ Please review and fix items marked as "Needs Review"'
              }
            </p>
            <p className="text-xs text-gray-600">
              {allValid
                ? 'Check this box to confirm and add all products to inventory'
                : 'Edit required fields until all items show "Matched" status'
              }
            </p>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          <i className="ri-arrow-left-line mr-2"></i>
          Back to Upload
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!isConfirmed || !allValid}
          className="px-6 py-3 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="ri-check-double-line mr-2"></i>
          Confirm &amp; Add to Inventory ({matchedProducts}/{totalProducts})
        </button>
      </div>
    </div>
  );
}
