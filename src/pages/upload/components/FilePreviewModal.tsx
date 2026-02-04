import type { UploadedFile } from '../page';

interface FilePreviewModalProps {
  file: UploadedFile;
  onClose: () => void;
}

export default function FilePreviewModal({ file, onClose }: FilePreviewModalProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getFileIcon = (type: string) => {
    if (type === 'application/pdf') return 'ri-file-pdf-line text-red-500';
    if (type.startsWith('image/')) return 'ri-image-line text-teal-500';
    return 'ri-file-line text-gray-500';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
              <i className={`${getFileIcon(file.type)} text-xl`}></i>
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-800">{file.name}</h2>
              <p className="text-xs text-gray-500">{formatFileSize(file.size)} • {formatDate(file.uploadDate)}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-gray-600 text-xl"></i>
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {file.preview ? (
            <div className="flex items-center justify-center">
              <img
                src={file.preview}
                alt={file.name}
                className="max-w-full max-h-[600px] rounded-lg shadow-lg"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className={`${getFileIcon(file.type)} text-4xl`}></i>
              </div>
              <h3 className="text-base font-medium text-gray-800 mb-2">PDF Document</h3>
              <p className="text-sm text-gray-600 mb-6">Preview not available for PDF files</p>
              <button className="px-5 py-2.5 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2">
                <i className="ri-download-2-line text-base"></i>
                Download File
              </button>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
              file.status === 'uploaded' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
              file.status === 'processing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
              'bg-gray-50 text-gray-700 border-gray-200'
            }`}>
              <i className={`${
                file.status === 'uploaded' ? 'ri-checkbox-circle-line' :
                file.status === 'processing' ? 'ri-loader-4-line animate-spin' :
                'ri-information-line'
              } text-sm`}></i>
              {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
            >
              Close
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap flex items-center gap-2">
              <i className="ri-download-2-line text-base"></i>
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
