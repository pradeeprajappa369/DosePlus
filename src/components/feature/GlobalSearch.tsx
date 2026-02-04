import { useState, useEffect, useRef } from 'react';
import { inventoryData } from '../../mocks/inventoryData';
import { customersData } from '../../mocks/customersData';
import { salesData } from '../../mocks/salesData';
import { staffData } from '../../mocks/staffData';

interface SearchResult {
  id: string;
  type: 'product' | 'customer' | 'invoice' | 'staff';
  icon: string;
  primaryText: string;
  secondaryText: string;
  navigationPath: string;
}

interface GlobalSearchProps {
  userRole?: 'admin' | 'staff' | 'superadmin';
}

const GlobalSearch = ({ userRole = 'admin' }: GlobalSearchProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on ESC key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowResults(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Perform search
  useEffect(() => {
    if (searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search Products
    inventoryData.forEach((product) => {
      if (
        product.name?.toLowerCase().includes(query) ||
        product.batchNumber?.toLowerCase().includes(query) ||
        product.barcode?.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: product.id,
          type: 'product',
          icon: 'ri-capsule-line',
          primaryText: product.name,
          secondaryText: 'Product',
          navigationPath: '/inventory',
        });
      }
    });

    // Search Customers
    customersData.forEach((customer) => {
      if (
        customer.name?.toLowerCase().includes(query) ||
        customer.phone?.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: customer.id,
          type: 'customer',
          icon: 'ri-user-line',
          primaryText: customer.name,
          secondaryText: 'Customer',
          navigationPath: '/customers',
        });
      }
    });

    // Search Sales/Invoices
    salesData.forEach((sale) => {
      if (
        sale.invoiceNumber?.toLowerCase().includes(query) ||
        sale.customerName?.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: sale.id,
          type: 'invoice',
          icon: 'ri-file-list-line',
          primaryText: sale.invoiceNumber,
          secondaryText: 'Invoice',
          navigationPath: '/sales',
        });
      }
    });

    // Search Staff (Admin only)
    staffData.forEach((staff) => {
      if (
        staff.name?.toLowerCase().includes(query) ||
        staff.role?.toLowerCase().includes(query)
      ) {
        searchResults.push({
          id: staff.id,
          type: 'staff',
          icon: 'ri-team-line',
          primaryText: staff.name,
          secondaryText: 'Staff',
          navigationPath: '/staff',
        });
      }
    });

    setResults(searchResults.slice(0, 8)); // Limit to 8 results
    setShowResults(true);
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    if (window.REACT_APP_NAVIGATE) {
      window.REACT_APP_NAVIGATE(result.navigationPath);
    }
    setSearchQuery('');
    setShowResults(false);
  };

  const handleClear = () => {
    setSearchQuery('');
    setShowResults(false);
  };

  return (
    <div ref={searchRef} className="relative flex-1 max-w-2xl">
      {/* Search Input */}
      <div className="relative">
        <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, customers, invoices..."
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all theme-dark:bg-gray-800 theme-dark:border-gray-700 theme-dark:text-gray-200 theme-dark:placeholder-gray-500"
        />
        {searchQuery && (
          <button
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer theme-dark:hover:text-gray-300"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-96 overflow-y-auto theme-dark:bg-gray-800 theme-dark:border-gray-700">
          {results.length > 0 ? (
            <>
              {/* Helper Text */}
              <div className="px-4 py-2 border-b border-gray-100 bg-blue-50 theme-dark:bg-blue-900/20 theme-dark:border-gray-700">
                <p className="text-xs text-blue-600 theme-dark:text-blue-400 flex items-center gap-1.5">
                  <i className="ri-information-line"></i>
                  Search works within current session data
                </p>
              </div>

              {/* Results List */}
              <div className="py-2">
                {results.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors flex items-center gap-3 text-left theme-dark:hover:bg-gray-700/50"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg flex-shrink-0 theme-dark:bg-gray-700">
                      <i className={`${result.icon} text-lg text-gray-600 theme-dark:text-gray-300`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate theme-dark:text-gray-200">
                        {result.primaryText}
                      </p>
                      <p className="text-xs text-gray-500 theme-dark:text-gray-400">
                        {result.secondaryText}
                      </p>
                    </div>
                    <i className="ri-arrow-right-line text-gray-400 theme-dark:text-gray-500"></i>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="px-4 py-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 theme-dark:bg-gray-700">
                <i className="ri-search-line text-2xl text-gray-400 theme-dark:text-gray-500"></i>
              </div>
              <p className="text-sm text-gray-600 theme-dark:text-gray-400">No matching results found</p>
              <p className="text-xs text-gray-500 mt-1 theme-dark:text-gray-500">
                Try different keywords
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
