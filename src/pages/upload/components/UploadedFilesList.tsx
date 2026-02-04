import { useState } from 'react';
import type { UploadedFile } from '../page';
import FilePreviewModal from './FilePreviewModal';

interface UploadedFilesListProps {
  files: UploadedFile[];
  onDeleteFile: (id: string) => void;
}

export default function UploadedFilesList({ files, onDeleteFile }: UploadedFilesListProps) {
  const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'processing':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'completed':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      case 'failed':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'ri-checkbox-circle-line';
      case 'processing':
        return 'ri-loader-4-line animate-spin';
      case 'completed':
        return 'ri-check-double-line';
      case 'failed':
        return 'ri-close-circle-line';
      default:
        return 'ri-information-line';
    }
  };

  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') return 'ri-file-pdf-line text-red-500';
    if (type.startsWith('image/')) return 'ri-image-line text-teal-500';
    return 'ri-file-line text-gray-500';
  };

  if (files.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-file-list-3-line text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-base font-medium text-gray-800 mb-1">No files uploaded yet</h3>
          <p className="text-sm text-gray-500">Upload your first document to get started</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-gray-800">Uploaded Documents</h2>
            <span className="text-sm text-gray-600">
              <span className="font-medium text-gray-800">{files.length}</span> {files.length === 1 ? 'file' : 'files'}
            </span>
          </div>
        </div>

        {/* Files Grid */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.id}
                className="group border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-md transition-all bg-white"
              >
                {/* File Preview/Icon */}
                <div className="relative mb-4">
                  {file.preview ? (
                    <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={file.preview}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-lg bg-gray-50 flex items-center justify-center">
                      <i className={`${getFileIcon(file.type)} text-5xl`}></i>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusStyles(file.status)}`}>
                      <i className={`${getStatusIcon(file.status)} text-sm`}></i>
                      {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* File Info */}
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-800 mb-1 truncate" title={file.name}>
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    <span>•</span>
                    <span>{formatDate(file.uploadDate)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setPreviewFile(file)}
                    className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-1.5"
                  >
                    <i className="ri-eye-line text-sm"></i>
                    Preview
                  </button>
                  <button
                    onClick={() => onDeleteFile(file.id)}
                    className="px-3 py-2 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center"
                  >
                    <i className="ri-delete-bin-line text-sm"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {previewFile && (
        <FilePreviewModal
          file={previewFile}
          onClose={() => setPreviewFile(null)}
        />
      )}
    </>
  );
}
