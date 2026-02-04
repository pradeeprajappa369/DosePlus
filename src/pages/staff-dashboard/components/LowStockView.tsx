const LowStockView = () => {
  const lowStockItems = [
    { id: 1, name: 'Paracetamol 500mg', batch: 'PCM2024A', stock: 45, minStock: 100, expiry: '2025-08-15' },
    { id: 2, name: 'Amoxicillin 250mg', batch: 'AMX2024B', stock: 28, minStock: 80, expiry: '2025-06-20' },
    { id: 3, name: 'Cetirizine 10mg', batch: 'CTZ2024C', stock: 35, minStock: 120, expiry: '2025-09-10' },
    { id: 4, name: 'Omeprazole 20mg', batch: 'OMP2024D', stock: 18, minStock: 60, expiry: '2025-07-05' },
    { id: 5, name: 'Metformin 500mg', batch: 'MTF2024E', stock: 52, minStock: 150, expiry: '2025-10-12' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
            <p className="text-sm text-gray-500 mt-1">View only - Contact admin to restock</p>
          </div>
          <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
            <i className="ri-error-warning-line text-xl text-orange-600"></i>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {lowStockItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-900">{item.name}</h4>
                <p className="text-xs text-gray-500 mt-1">Batch: {item.batch}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-orange-600">{item.stock}</span>
                  <span className="text-xs text-gray-400">/</span>
                  <span className="text-sm text-gray-500">{item.minStock}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">units</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-orange-50 rounded-lg border border-orange-100">
          <div className="flex items-start gap-3">
            <i className="ri-information-line text-orange-600 text-lg mt-0.5"></i>
            <div>
              <p className="text-sm font-medium text-orange-900">View Only Access</p>
              <p className="text-xs text-orange-700 mt-1">You can view low stock items but cannot edit inventory. Please contact your admin to restock.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowStockView;
