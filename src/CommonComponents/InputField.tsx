import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
} from "react";

interface Option {
  label: string;
  value: string;
}

interface InputFieldProps {
  label: string;
  placeholder?: string;
  value: string;
  type?: string;
  required?: boolean;
  error?: string;
  onChange: (value: string) => void;
  options?: Option[];
  isSearchable?: boolean;
}

const InputField = forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      label,
      placeholder,
      value,
      type = "text",
      required = false,
      error,
      onChange,
      options,
      isSearchable = false,
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    const isPassword = type === "password";

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setIsFocused(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
      if (isOpen && isSearchable) {
        setTimeout(() => searchRef.current?.focus(), 100);
      }
    }, [isOpen, isSearchable]);

    const filteredOptions = options?.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const inputStyle = `
      w-full px-4 py-2.5 text-sm rounded-lg
      transition-all duration-200 outline-none
      bg-[var(--bg-card)]
      text-[var(--text-primary)]
      ${
        error
          ? "border border-red-500 ring-2 ring-red-200"
          : isFocused || isOpen
          ? "border border-accent ring-2"
          : "border border-[var(--border-color)]"
      }
    `;

    return (
      <div
        className="relative"
        ref={(node) => {
          dropdownRef.current = node;
          if (typeof ref === "function") ref(node);
        }}
      >
        <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {/* SELECT */}
        {options ? (
          <div
            className="relative"
            tabIndex={0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          >
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className={`${inputStyle} cursor-pointer flex items-center justify-between`}
            >
              <span
                className={
                  value
                    ? "text-[var(--text-primary)]"
                    : "text-[var(--text-tertiary)]"
                }
              >
                {options.find((o) => o.value === value)?.label ||
                  placeholder ||
                  "Select"}
              </span>

              <i
                className={`ri-arrow-down-s-line transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isOpen && (
              <div
                className="
                  absolute z-50 mt-2 w-full
                  bg-[var(--bg-secondary)]
                  border border-[var(--border-color)]
                  rounded-lg shadow-lg overflow-hidden
                "
              >
                {isSearchable && (
                  <div className="p-3 border-b border-[var(--border-color)]">
                    <input
                      ref={searchRef}
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) =>
                        setSearchTerm(e.target.value)
                      }
                      className="
                        w-full px-3 py-2 text-sm rounded-md
                        bg-[var(--bg-card)]
                        border border-[var(--border-color)]
                        text-[var(--text-primary)]
                        focus:border-accent focus:ring-2
                        outline-none
                      "
                    />
                  </div>
                )}

                <div className="max-h-56 overflow-y-auto scrollbar-thin">
                  {filteredOptions &&
                  filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                      <div
                        key={opt.value}
                        onClick={() => {
                          onChange(opt.value);
                          setIsOpen(false);
                          setSearchTerm("");
                        }}
                        className={`
                          px-4 py-2 text-sm cursor-pointer transition-all
                          ${
                            value === opt.value
                              ? "bg-accent/10 text-accent font-medium"
                              : "text-[var(--text-secondary)] hover:bg-accent/10"
                          }
                        `}
                      >
                        {opt.label}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-[var(--text-tertiary)]">
                      No Results Found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* NORMAL INPUT */
          <div className="relative">
            <input
              type={
                isPassword
                  ? showPassword
                    ? "text"
                    : "password"
                  : type
              }
              value={value}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={inputStyle}
            />

            {isPassword && (
              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] hover:text-[var(--text-primary)]"
              >
                <i
                  className={
                    showPassword
                      ? "ri-eye-off-line"
                      : "ri-eye-line"
                  }
                />
              </button>
            )}
          </div>
        )}

        {error && (
          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
            <i className="ri-error-warning-line" /> {error}
          </p>
        )}
      </div>
    );
  }
);

export default InputField;
