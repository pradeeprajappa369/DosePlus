
import { useState } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import PharmacyManagementTable from './components/PharmacyManagementTable';
import PharmacySummaryCards from './components/PharmacySummaryCards';

export default function SuperAdminPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} 
      />
      <Header />
      
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'} mt-20 p-8`}>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Pharmacy Management</h1>
          <p className="text-gray-600 mt-2">Monitor and control all pharmacy accounts</p>
        </div>

        <PharmacySummaryCards />
        <PharmacyManagementTable />
      </main>
    </div>
  );
}
