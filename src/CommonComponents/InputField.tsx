import React, { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  type?: string; 
  required?: boolean; // NEW
  icon?: React.ReactNode;
  error?: string;
  onChange: (value: string) => void;
  options?: Option[]; // for select dropdown
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  value,
  type = "text",
  icon,
  error,
  onChange,
  options,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {error && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
            {icon}
          </div>
        )}

        {options ? (
          // Render Select Dropdown
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full pl-12 pr-4 py-3 border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
              error ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
          >
            <option value="" disabled>
              {placeholder || "Select an option"}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          // Render Input
          <input
            type={isPassword ? (showPassword ? "text" : "password") : type}
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`w-full pl-12 pr-${isPassword ? "12" : "4"} py-3 border rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
              error ? "border-red-300 bg-red-50" : "border-gray-300"
            }`}
          />
        )}

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i
              className={`${
                showPassword ? "ri-eye-off-line" : "ri-eye-line"
              } text-lg`}
            ></i>
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
          <i className="ri-error-warning-line"></i> {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
