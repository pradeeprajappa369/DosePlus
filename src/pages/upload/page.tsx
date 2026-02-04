import { useState } from 'react';
import Sidebar from '../home/components/Sidebar';
import Header from '../home/components/Header';
import UploadArea from './components/UploadArea';
import UploadedFilesList from './components/UploadedFilesList';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: string;
  status: 'uploaded' | 'processing' | 'completed' | 'failed';
  preview?: string;
  category: 'prescription' | 'bill';
}

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [activeTab, setActiveTab] = useState<'prescription' | 'bill'>('prescription');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleFilesUploaded = (files: UploadedFile[]) => {
    setUploadedFiles(prev => [...files, ...prev]);
  };

  const handleDeleteFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  const filteredFiles = uploadedFiles.filter(file => file.category === activeTab);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isCollapsed={isSidebarCollapsed} setIsCollapsed={setIsSidebarCollapsed} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <main className={`flex-1 overflow-y-auto mt-20 transition-all duration-300 ${isSidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="p-8">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Upload Bills</h1>
              <p className="text-sm text-gray-600">Upload and manage your pharmacy bills and invoices</p>
            </div>

            {/* Tab Switcher */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-6 inline-flex">
              <button
                onClick={() => setActiveTab('prescription')}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'prescription'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <i className="ri-file-text-line mr-2"></i>
                Prescriptions
              </button>
              <button
                onClick={() => setActiveTab('bill')}
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === 'bill'
                    ? 'bg-teal-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <i className="ri-bill-line mr-2"></i>
                Purchase Bills
              </button>
            </div>

            {/* Upload Area */}
            <UploadArea 
              category={activeTab}
              onFilesUploaded={handleFilesUploaded}
            />

            {/* AI/OCR Note */}
            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-100 p-5 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className="ri-sparkling-line text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 mb-1">AI-Powered Document Processing (Coming Soon)</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Our intelligent OCR system will automatically extract medicine names, dosages, quantities, and patient information from uploaded documents. This feature will streamline your workflow and reduce manual data entry.
                  </p>
                </div>
              </div>
            </div>

            {/* Uploaded Files List */}
            <UploadedFilesList 
              files={filteredFiles}
              onDeleteFile={handleDeleteFile}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
