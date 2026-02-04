import { useState } from 'react';

interface Transaction {
  id: string;
  pharmacyName: string;
  plan: string;
  amount: number;
  paymentMethod: string;
  status: string;
  date: string;
  transactionId: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onViewDetails: (transaction: Transaction) => void;
}

export default function TransactionsTable({ transactions, onViewDetails }: TransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [planFilter, setPlanFilter] = useState('All');

  const getStatusBadge = (status: string) => {
    const styles = {
      Paid: 'bg-green-100 text-green-700 border-green-200',
      Pending: 'bg-amber-100 text-amber-700 border-amber-200',
      Failed: 'bg-red-100 text-red-700 border-red-200'
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getPlanBadge = (plan: string) => {
    const styles = {
      Starter: 'bg-teal-100 text-teal-700 border-teal-200',
      Professional: 'bg-orange-100 text-orange-700 border-orange-200',
      Enterprise: 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return styles[plan as keyof typeof styles] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.pharmacyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
    const matchesPlan = planFilter === 'All' || transaction.plan === planFilter;
    return matchesSearch && matchesStatus && matchesPlan;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
            <p className="text-sm text-gray-500 mt-1">Latest payment activities</p>
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors cursor-pointer whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Export Report
          </button>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                placeholder="Search by pharmacy or transaction ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>

          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="All">All Plans</option>
            <option value="Starter">Starter</option>
            <option value="Professional">Professional</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Pharmacy Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Plan
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Payment Method
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{transaction.pharmacyName}</p>
                    <p className="text-xs text-gray-500 mt-1">{transaction.transactionId}</p>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPlanBadge(transaction.plan)}`}>
                    {transaction.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-gray-900">₹{transaction.amount.toLocaleString()}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <i className={`${
                      transaction.paymentMethod === 'Credit Card' ? 'ri-bank-card-line' :
                      transaction.paymentMethod === 'UPI' ? 'ri-smartphone-line' :
                      'ri-bank-line'
                    } text-gray-400`}></i>
                    <span className="text-sm text-gray-700">{transaction.paymentMethod}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(transaction.status)}`}>
                    <span className={`w-1.5 h-1.5 rounded-full mr-2 ${
                      transaction.status === 'Paid' ? 'bg-green-500' :
                      transaction.status === 'Pending' ? 'bg-amber-500' :
                      'bg-red-500'
                    }`}></span>
                    {transaction.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-700">{new Date(transaction.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onViewDetails(transaction)}
                    className="text-orange-600 hover:text-orange-700 text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredTransactions.length === 0 && (
        <div className="p-12 text-center">
          <i className="ri-file-list-line text-5xl text-gray-300 mb-3"></i>
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}
    </div>
  );
}
