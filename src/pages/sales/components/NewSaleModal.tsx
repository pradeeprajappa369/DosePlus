import { useState } from 'react';
import { availableMedicines } from '../../../mocks/salesData';

interface NewSaleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaleComplete: (saleData: any) => void;
}

export default function NewSaleModal({ isOpen, onClose, onSaleComplete }: NewSaleModalProps) {
  const [searchMedicine, setSearchMedicine] = useState('');
  const [selectedMedicines, setSelectedMedicines] = useState<any[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedInvoice, setGeneratedInvoice] = useState<any>(null);
  const [showCustomerCard, setShowCustomerCard] = useState(true);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

  const filteredMedicines = availableMedicines.filter(med =>
    med.name.toLowerCase().includes(searchMedicine.toLowerCase())
  );

  const addMedicine = (medicine: any) => {
    const existing = selectedMedicines.find(m => m.id === medicine.id);
    if (existing) {
      setSelectedMedicines(selectedMedicines.map(m =>
        m.id === medicine.id ? { ...m, quantity: m.quantity + 1 } : m
      ));
    } else {
      setSelectedMedicines([...selectedMedicines, { ...medicine, quantity: 1, discount: 0 }]);
    }
    setSearchMedicine('');
  };

  const updateQuantity = (id: number, delta: number) => {
    setSelectedMedicines(selectedMedicines.map(m => {
      if (m.id === id) {
        const newQuantity = Math.max(1, Math.min(m.stock, m.quantity + delta));
        return { ...m, quantity: newQuantity };
      }
      return m;
    }));
  };

  const updateDiscount = (id: number, discountValue: number) => {
    setSelectedMedicines(selectedMedicines.map(m =>
      m.id === id ? { ...m, discount: Math.max(0, discountValue) } : m
    ));
  };

  const removeMedicine = (id: number) => {
    setSelectedMedicines(selectedMedicines.filter(m => m.id !== id));
  };

  const subtotal = selectedMedicines.reduce((sum, m) => sum + (m.price * m.quantity), 0);
  const totalDiscount = selectedMedicines.reduce((sum, m) => sum + m.discount, 0) + discount;
  const gst = (subtotal - totalDiscount) * 0.12;
  const roundOff = Math.round(subtotal + gst - totalDiscount) - (subtotal + gst - totalDiscount);
  const grandTotal = Math.round(subtotal + gst - totalDiscount);
  const totalItems = selectedMedicines.reduce((sum, m) => sum + m.quantity, 0);

  const handleSaveBill = (printAfter: boolean = false) => {
    const invoiceNo = `INV-2024-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const saleData = {
      id: invoiceNo,
      invoiceNo,
      date,
      time,
      customerName: customerName || 'Walk-in Customer',
      customerMobile: customerMobile || 'N/A',
      doctorName: doctorName || 'N/A',
      paymentMode,
      items: selectedMedicines.map(m => ({
        id: m.id,
        name: m.name,
        batch: m.batch || 'N/A',
        expiry: m.expiry || 'N/A',
        quantity: m.quantity,
        price: m.price,
        discount: m.discount,
        total: (m.price * m.quantity) - m.discount
      })),
      subtotal,
      gst,
      discount: totalDiscount,
      roundOff,
      grandTotal,
      status: 'Completed',
      profit: selectedMedicines.reduce((sum, m) => sum + ((m.mrp - m.price) * m.quantity * 0.3), 0)
    };

    setGeneratedInvoice(saleData);
    setShowSuccess(true);
    onSaleComplete(saleData);

    if (printAfter) {
      setTimeout(() => window.print(), 500);
    }
  };

  const resetModal = () => {
    setSearchMedicine('');
    setSelectedMedicines([]);
    setCustomerName('');
    setCustomerMobile('');
    setDoctorName('');
    setDiscount(0);
    setPaymentMode('Cash');
    setShowSuccess(false);
    setGeneratedInvoice(null);
    setShowCustomerCard(true);
    onClose();
  };

  if (!isOpen) return null;

  // Success Screen
  if (showSuccess && generatedInvoice) {
    return (
      <div className="fixed inset-0 bg-white z-50 overflow-auto">
        <div className="min-h-screen flex items-center justify-center p-12">
          <div className="w-full max-w-3xl">
            {/* Success Icon */}
            <div className="text-center mb-12">
              <div className="w-28 h-28 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-check-line text-6xl text-green-600"></i>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Bill Saved Successfully!</h1>
              <p className="text-lg text-gray-600">Sale completed and recorded</p>
            </div>

            {/* Invoice Summary Card */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl p-10 mb-10 shadow-lg">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="text-sm text-gray-500 mb-2">Invoice Number</div>
                  <div className="text-3xl font-bold text-gray-900">{generatedInvoice.invoiceNo}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-2">Total Amount</div>
                  <div className="text-4xl font-bold text-orange-600">₹{generatedInvoice.grandTotal.toFixed(2)}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Customer Name</div>
                  <div className="text-lg font-semibold text-gray-900">{generatedInvoice.customerName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Payment Method</div>
                  <div className="text-lg font-semibold text-gray-900">{generatedInvoice.paymentMode}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Date & Time</div>
                  <div className="text-lg font-semibold text-gray-900">{generatedInvoice.date} • {generatedInvoice.time}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Items</div>
                  <div className="text-lg font-semibold text-gray-900">{generatedInvoice.items.length} medicine(s)</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => window.print()}
                className="px-8 py-5 bg-orange-600 text-white rounded-xl text-lg font-semibold hover:bg-orange-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <i className="ri-printer-line mr-3 text-xl"></i>
                Print Invoice
              </button>
              <button
                onClick={() => alert('PDF download functionality would be implemented here')}
                className="px-8 py-5 border-2 border-gray-300 text-gray-700 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                <i className="ri-download-line mr-3 text-xl"></i>
                Download PDF
              </button>
              <button
                onClick={resetModal}
                className="px-8 py-5 bg-teal-600 text-white rounded-xl text-lg font-semibold hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                <i className="ri-add-line mr-3 text-xl"></i>
                New Sale
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Billing Interface
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Sale</h1>
            <p className="text-sm text-gray-600 mt-0.5">Create a new customer bill</p>
          </div>
          <button
            onClick={resetModal}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SECTION - Billing Area (70%) */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Customer Details Card */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <button
              onClick={() => setShowCustomerCard(!showCustomerCard)}
              className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <i className="ri-user-line text-xl text-teal-600"></i>
                <h3 className="text-base font-bold text-gray-900">Customer Details</h3>
              </div>
              <i className={`ri-arrow-${showCustomerCard ? 'up' : 'down'}-s-line text-xl text-gray-400`}></i>
            </button>
            
            {showCustomerCard && (
              <div className="p-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Customer Name"
                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                  <input
                    type="tel"
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                    placeholder="Mobile Number"
                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                  <input
                    type="text"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Doctor Name (Optional)"
                    className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>
                <button
                  onClick={() => setShowAddCustomerModal(true)}
                  className="px-4 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  Add New Customer
                </button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="relative">
              <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
              <input
                type="text"
                value={searchMedicine}
                onChange={(e) => setSearchMedicine(e.target.value)}
                placeholder="Search medicine by name / barcode"
                className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-300 rounded-lg text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                autoFocus
              />
              <i className="ri-barcode-line absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl"></i>
            </div>

            {/* Search Results Dropdown */}
            {searchMedicine && filteredMedicines.length > 0 && (
              <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                {filteredMedicines.map(medicine => (
                  <button
                    key={medicine.id}
                    onClick={() => addMedicine(medicine)}
                    className="w-full px-4 py-3 text-left hover:bg-teal-50 border-b border-gray-100 last:border-b-0 transition-all flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="text-sm font-bold text-gray-900">{medicine.name}</div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          medicine.stock < 10 
                            ? 'bg-red-100 text-red-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          Stock: {medicine.stock}
                        </span>
                        <span className="text-sm font-bold text-teal-600">₹{medicine.price}</span>
                      </div>
                    </div>
                    <i className="ri-add-circle-line text-2xl text-teal-600"></i>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Medicine Table */}
          {selectedMedicines.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Medicine Name</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Batch</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Expiry</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Qty</th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Price</th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Discount</th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-gray-700 uppercase">Total</th>
                      <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedMedicines.map(medicine => {
                      const itemTotal = (medicine.price * medicine.quantity) - medicine.discount;
                      const isLowStock = medicine.stock < 10;
                      const isNearExpiry = medicine.expiry && new Date(medicine.expiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                      
                      return (
                        <tr 
                          key={medicine.id} 
                          className={`hover:bg-gray-50 transition-all ${isLowStock ? 'bg-red-50' : ''}`}
                        >
                          <td className="px-4 py-3">
                            <div className="text-sm font-semibold text-gray-900">{medicine.name}</div>
                            {isLowStock && (
                              <div className="text-xs text-red-600 font-medium mt-0.5">
                                ⚠ Low stock: {medicine.stock} left
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{medicine.batch || 'N/A'}</td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-gray-600">{medicine.expiry || 'N/A'}</div>
                            {isNearExpiry && (
                              <span className="inline-block px-2 py-0.5 bg-orange-100 text-orange-700 text-xs font-medium rounded mt-0.5">
                                Near Expiry
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => updateQuantity(medicine.id, -1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-all"
                              >
                                <i className="ri-subtract-line text-sm"></i>
                              </button>
                              <span className="w-10 text-center text-sm font-bold text-gray-900">{medicine.quantity}</span>
                              <button
                                onClick={() => updateQuantity(medicine.id, 1)}
                                className="w-7 h-7 flex items-center justify-center text-gray-700 hover:bg-gray-200 rounded transition-all"
                              >
                                <i className="ri-add-line text-sm"></i>
                              </button>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-semibold text-gray-900">
                            ₹{medicine.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <input
                              type="number"
                              value={medicine.discount}
                              onChange={(e) => updateDiscount(medicine.id, Number(e.target.value))}
                              className="w-20 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                              placeholder="0"
                            />
                          </td>
                          <td className="px-4 py-3 text-right text-sm font-bold text-gray-900">
                            ₹{itemTotal.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => removeMedicine(medicine.id)}
                              className="w-8 h-8 flex items-center justify-center mx-auto text-red-600 hover:bg-red-50 rounded transition-all"
                            >
                              <i className="ri-close-line text-lg"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-16 text-center">
              <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-lg font-bold text-gray-900 mb-2">No medicines added yet</h3>
              <p className="text-sm text-gray-600">Search and add medicines to start billing</p>
            </div>
          )}
        </div>

        {/* RIGHT SECTION - Bill Summary (30%) */}
        <div className="w-[380px] bg-white border-l border-gray-200 flex flex-col">
          <div className="flex-1 overflow-y-auto p-6">
            {/* Bill Summary Card */}
            <div className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 mb-6 border border-teal-100">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-file-list-3-line text-xl text-teal-600"></i>
                <h3 className="text-lg font-bold text-gray-900">Bill Summary</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Items</span>
                  <span className="font-semibold text-gray-900">{totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold text-gray-900">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={discount}
                      onChange={(e) => setDiscount(Math.max(0, Number(e.target.value)))}
                      className="w-24 px-2 py-1 border border-gray-300 rounded text-sm text-right focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">GST (12%)</span>
                  <span className="font-semibold text-gray-900">₹{gst.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Round Off</span>
                  <span className="font-semibold text-gray-900">₹{roundOff.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t-2 border-teal-200 flex items-center justify-between">
                  <span className="text-base font-bold text-gray-900">Grand Total</span>
                  <span className="text-2xl font-bold text-teal-600">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Mode */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <i className="ri-wallet-line text-xl text-teal-600"></i>
                <h3 className="text-base font-bold text-gray-900">Payment Mode</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['Cash', 'UPI', 'Card', 'Credit'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`p-3 border-2 rounded-lg text-center transition-all ${
                      paymentMode === mode
                        ? 'border-teal-600 bg-teal-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <i className={`${
                      mode === 'Cash' ? 'ri-money-rupee-circle-line' :
                      mode === 'UPI' ? 'ri-smartphone-line' :
                      mode === 'Card' ? 'ri-bank-card-line' :
                      'ri-time-line'
                    } text-2xl mb-1 ${paymentMode === mode ? 'text-teal-600' : 'text-gray-400'}`}></i>
                    <div className={`font-semibold text-xs ${paymentMode === mode ? 'text-teal-600' : 'text-gray-700'}`}>
                      {mode}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Action Buttons */}
          <div className="border-t border-gray-200 p-6 space-y-3 flex-shrink-0">
            <button
              onClick={() => handleSaveBill(true)}
              disabled={selectedMedicines.length === 0}
              className="w-full py-3.5 bg-teal-600 text-white rounded-lg text-base font-bold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <i className="ri-printer-line mr-2 text-lg"></i>
              Save & Print
            </button>
            <button
              onClick={() => handleSaveBill(false)}
              disabled={selectedMedicines.length === 0}
              className="w-full py-3 border-2 border-teal-600 text-teal-600 rounded-lg text-base font-semibold hover:bg-teal-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all whitespace-nowrap"
            >
              <i className="ri-save-line mr-2"></i>
              Save Only
            </button>
            <button
              onClick={resetModal}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg text-base font-medium hover:bg-gray-50 transition-all whitespace-nowrap"
            >
              <i className="ri-close-line mr-2"></i>
              Cancel Sale
            </button>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      {showAddCustomerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Customer</h3>
              <button
                onClick={() => setShowAddCustomerModal(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Customer Name *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <input
                type="tel"
                placeholder="Mobile Number *"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <input
                type="email"
                placeholder="Email (Optional)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <textarea
                placeholder="Address (Optional)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              ></textarea>
              <button
                onClick={() => {
                  setShowAddCustomerModal(false);
                  alert('Customer added successfully!');
                }}
                className="w-full py-3 bg-teal-600 text-white rounded-lg text-base font-semibold hover:bg-teal-700 transition-all whitespace-nowrap"
              >
                Add Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}