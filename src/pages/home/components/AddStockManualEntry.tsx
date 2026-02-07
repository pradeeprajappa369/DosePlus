import { useState, useRef } from "react";
import InputField from "@/CommonComponents/InputField";
import { AddProductApi } from "@/API/InventoryAPI";

interface ManualEntryTabProps {
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  productName: string;
  category: string;
  batchNumber: string;
  boxNumber: string;
  stockQuantity: string;
  purchasePrice: string;
  sellingPrice: string;
  expiryDate: string;
  supplier: string;
  invoiceNumber: string;
}

export const PHARMACY_CATEGORIES = [
  { key: "antibiotic", label: "Antibiotic" },
  { key: "painkiller", label: "Painkiller" },
  { key: "antipyretic", label: "Antipyretic (Fever)" },
  { key: "antacid", label: "Antacid" },
  { key: "antihistamine", label: "Antihistamine (Allergy)" },
  { key: "vitamin", label: "Vitamins" },
  { key: "supplement", label: "Supplements" },
  { key: "cough-cold", label: "Cough & Cold" },
  { key: "respiratory", label: "Respiratory Care" },
  { key: "diabetic-care", label: "Diabetic Care" },
  { key: "cardiac", label: "Cardiac / Heart Care" },
  { key: "gastro", label: "Gastrointestinal" },
  { key: "dermatology", label: "Dermatology / Skin Care" },
  { key: "eye-ear", label: "Eye & Ear Care" },
  { key: "women-care", label: "Women's Health" },
  { key: "men-care", label: "Men's Health" },
  { key: "baby-care", label: "Baby Care" },
  { key: "first-aid", label: "First Aid" },
  { key: "antiseptic", label: "Antiseptic" },
  { key: "surgical", label: "Surgical Items" },
];

export default function ManualEntryTab({
  onClose,
  onSuccess,
}: ManualEntryTabProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const inputRefs = useRef<
    Partial<Record<keyof FormData, HTMLDivElement | null>>
  >({});

  const [formData, setFormData] = useState<FormData>({
    productName: "",
    category: "",
    batchNumber: "",
    boxNumber: "",
    stockQuantity: "",
    purchasePrice: "",
    sellingPrice: "",
    expiryDate: "",
    supplier: "",
    invoiceNumber: "",
  });

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.productName.trim())
      newErrors.productName = "Product name is required";

    if (!formData.category) newErrors.category = "Category is required";

    if (!formData.batchNumber.trim())
      newErrors.batchNumber = "Batch number is required";

    if (!formData.boxNumber) newErrors.boxNumber = "Box number is required";

    if (!formData.stockQuantity)
      newErrors.stockQuantity = "Stock quantity is required";

    if (!formData.purchasePrice)
      newErrors.purchasePrice = "Purchase price is required";

    if (!formData.sellingPrice)
      newErrors.sellingPrice = "Selling price is required";

    if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required";

    if (!formData.supplier.trim()) newErrors.supplier = "Supplier is required";

    setErrors(newErrors);

    const firstErrorField = Object.keys(newErrors)[0] as keyof FormData;

    if (firstErrorField && inputRefs.current[firstErrorField]) {
      inputRefs.current[firstErrorField]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      setLoading(true);

      const payload = {
        productName: formData.productName.trim(),
        category: formData.category,
        batchNumber: formData.batchNumber.trim(),
        boxNumber: Number(formData.boxNumber),
        stockQuantity: Number(formData.stockQuantity),
        purchasePrice: Number(formData.purchasePrice),
        sellingPrice: Number(formData.sellingPrice),
        expiryDate: formData.expiryDate,
        supplier: formData.supplier.trim(),
        invoiceNumber: formData.invoiceNumber.trim(),
      };

      const res = await AddProductApi(payload);

      if (res?.data?.success) {
        onSuccess?.();
        setFormData({
          productName: "",
          category: "",
          batchNumber: "",
          boxNumber: "",
          stockQuantity: "",
          purchasePrice: "",
          sellingPrice: "",
          expiryDate: "",
          supplier: "",
          invoiceNumber: "",
        });
      }
    } catch (error) {
      console.error("Add Product Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Product Name"
          placeholder="Enter medicine name"
          value={formData.productName}
          onChange={(val) => handleChange("productName", val)}
          required
          error={errors.productName}
        />

        <InputField
          label="Category"
          placeholder="Select category"
          value={formData.category}
          options={PHARMACY_CATEGORIES.map((c) => ({
            label: c.label,
            value: c.key,
          }))}
          onChange={(val) => handleChange("category", val)}
          required
          isSearchable
          error={errors.category}
        />

        <InputField
          label="Batch Number"
          placeholder="e.g., BT2024001"
          value={formData.batchNumber}
          onChange={(val) => handleChange("batchNumber", val)}
          required
          error={errors.batchNumber}
        />

        <InputField
          label="Box Number"
          type="number"
          placeholder="Enter box number"
          value={formData.boxNumber}
          onChange={(val) => handleChange("boxNumber", val)}
          required
          error={errors.boxNumber}
        />

        <InputField
          label="Stock Quantity"
          type="number"
          placeholder="Enter quantity"
          value={formData.stockQuantity}
          onChange={(val) => handleChange("stockQuantity", val)}
          required
          error={errors.stockQuantity}
        />

        <InputField
          label="Purchase Price"
          type="number"
          placeholder="0.00"
          value={formData.purchasePrice}
          onChange={(val) => handleChange("purchasePrice", val)}
          required
          error={errors.purchasePrice}
        />

        <InputField
          label="Selling Price"
          type="number"
          placeholder="0.00"
          value={formData.sellingPrice}
          onChange={(val) => handleChange("sellingPrice", val)}
          required
          error={errors.sellingPrice}
        />

        <InputField
          label="Expiry Date"
          type="date"
          value={formData.expiryDate}
          onChange={(val) => handleChange("expiryDate", val)}
          required
          error={errors.expiryDate}
        />

        <InputField
          label="Supplier"
          placeholder="Enter supplier name"
          value={formData.supplier}
          onChange={(val) => handleChange("supplier", val)}
          required
          error={errors.supplier}
        />

        <InputField
          label="Invoice Number"
          placeholder="Optional"
          value={formData.invoiceNumber}
          onChange={(val) => handleChange("invoiceNumber", val)}
        />
      </div>

      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-all disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add to Inventory"}
        </button>
      </div>
    </form>
  );
}
