import { useState, useRef } from 'react';
import type { UploadedFile } from '../page';

interface UploadAreaProps {
  category: 'prescription' | 'bill';
  onFilesUploaded: (files: UploadedFile[]) => void;
}

export default function UploadArea({ category, onFilesUploaded }: UploadAreaProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const acceptedFormats = '.pdf,.jpg,.jpeg,.png';
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.type.startsWith('image/');
      const isValidSize = file.size <= maxFileSize;
      return isValidType && isValidSize;
    });

    const uploadedFiles: UploadedFile[] = validFiles.map(file => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      status: 'processing',
      category: category,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined
    }));

    onFilesUploaded(uploadedFiles);

    // Simulate processing completion
    setTimeout(() => {
      uploadedFiles.forEach(file => {
        file.status = 'uploaded';
      });
    }, 2000);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-12 transition-all ${
          isDragging
            ? 'border-teal-500 bg-teal-50/50'
            : 'border-gray-200 bg-gray-50/50 hover:border-teal-300 hover:bg-teal-50/30'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFormats}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <i className={`${isDragging ? 'ri-download-cloud-line' : 'ri-upload-cloud-2-line'} text-teal-600 text-3xl`}></i>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {isDragging ? 'Drop files here' : `Upload ${category === 'prescription' ? 'Prescription' : 'Purchase Bill'}`}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-6">
            Drag and drop your files here, or click to browse
          </p>

          {/* Browse Button */}
          <button
            onClick={handleBrowseClick}
            className="px-6 py-3 text-sm font-medium text-white bg-teal-500 rounded-lg hover:bg-teal-600 transition-colors cursor-pointer whitespace-nowrap shadow-sm inline-flex items-center gap-2"
          >
            <i className="ri-folder-open-line text-base"></i>
            Browse Files
          </button>

          {/* Supported Formats */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <i className="ri-file-pdf-line text-red-500 text-lg"></i>
                <span className="text-gray-600">PDF</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-image-line text-emerald-500 text-lg"></i>
                <span className="text-gray-600">JPG</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="ri-image-line text-teal-500 text-lg"></i>
                <span className="text-gray-600">PNG</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">Maximum file size: 10MB</p>
          </div>
        </div>
      </div>
    </div>
  );
}
