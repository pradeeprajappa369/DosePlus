import { useState } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import SalesSummaryCards from './components/SalesSummaryCards';
import SalesFilters from './components/SalesFilters';
import SalesTable from './components/SalesTable';
import NewSaleModal from './components/NewSaleModal';
import InvoicePreviewModal from './components/InvoicePreviewModal';
import ReturnSaleModal from './components/ReturnSaleModal';
import { salesData } from '../../mocks/salesData';

export default function SalesPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [sales, setSales] = useState(salesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [isNewSaleModalOpen, setIsNewSaleModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<any>(null);
  const [returnSaleId, setReturnSaleId] = useState('');

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDateFrom = !dateFrom || sale.date >= dateFrom;
    const matchesDateTo = !dateTo || sale.date <= dateTo;
    const matchesPaymentMode = !paymentMode || sale.paymentMode === paymentMode;

    return matchesSearch && matchesDateFrom && matchesDateTo && matchesPaymentMode;
  });

  const handleSaleComplete = (saleData: any) => {
    setSales([saleData, ...sales]);
    setSelectedSale(saleData);
    setIsInvoiceModalOpen(true);
  };

  const handleViewInvoice = (sale: any) => {
    setSelectedSale(sale);
    setIsInvoiceModalOpen(true);
  };

  const handleReturnSale = (saleId: string) => {
    setReturnSaleId(saleId);
    setIsReturnModalOpen(true);
  };

  const confirmReturnSale = () => {
    setSales(sales.map(sale => 
      sale.id === returnSaleId ? { ...sale, status: 'Returned' } : sale
    ));
  };

  const handleDownloadReport = () => {
    alert('Sales report download functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        setIsCollapsed={setIsSidebarCollapsed}
      />
      <Header 
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
      />

      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-8`}>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sales</h1>
              <p className="text-gray-600 mt-1">Track daily pharmacy sales and invoices</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleDownloadReport}
                className="px-6 py-2 border border-teal-600 text-teal-600 rounded-lg text-sm font-medium hover:bg-teal-50 transition-colors whitespace-nowrap"
              >
                <i className="ri-download-line mr-2"></i>
                Download Report
              </button>
              <button
                onClick={() => setIsNewSaleModalOpen(true)}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-medium hover:bg-teal-700 transition-colors whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                New Sale
              </button>
            </div>
          </div>
        </div>

        <SalesSummaryCards sales={sales} />

        <SalesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          dateFrom={dateFrom}
          setDateFrom={setDateFrom}
          dateTo={dateTo}
          setDateTo={setDateTo}
          paymentMode={paymentMode}
          setPaymentMode={setPaymentMode}
        />

        <SalesTable
          sales={filteredSales}
          onViewInvoice={handleViewInvoice}
          onReturnSale={handleReturnSale}
        />
      </main>

      <NewSaleModal
        isOpen={isNewSaleModalOpen}
        onClose={() => setIsNewSaleModalOpen(false)}
        onSaleComplete={handleSaleComplete}
      />

      <InvoicePreviewModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        sale={selectedSale}
      />

      <ReturnSaleModal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        onConfirm={confirmReturnSale}
        saleId={returnSaleId}
      />
    </div>
  );
}