import { useState } from "react";
import { Portal } from "../Portal";
import UploadSection from "../payment_portal/UploadSection";
import { useFileValidation } from "../../../hooks/useFileValidation";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { FormInput } from "../../formInput";
import { FormCheckbox } from "../../FormCheckbox";

// Main Component
export const AddItemPortal = ({ onClose, onSubmit, productName }) => {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    price: "",
    stock: "",
    isAvailable: true,
    isUnlimitedStock: false,
  });
  const [errors, setErrors] = useState({});

  //Custom Hooks
  const {
    selectedFile,
    fileName,
    error: fileError,
    validateFile,
  } = useFileValidation();

  //File handler
  const addPhotoHandler = (e) => {
    validateFile(e);
    if (errors["icon"]) {
      setErrors((prev) => ({ ...prev, ["icon"]: "" }));
    }
  };

  // Update single field
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Toggle unlimited stock
  const handleUnlimitedToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isUnlimitedStock: !prev.isUnlimitedStock,
      stock: !prev.isUnlimitedStock ? "" : prev.stock,
    }));
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation Logic
    if (!formData.name.trim()) {
      newErrors.name = "Nama item wajib diisi";
    }
    if (!formData.price) {
      newErrors.price = "Harga wajib diisi";
    }
    if (!formData.isUnlimitedStock && !formData.stock) {
      newErrors.stock = "Stok wajib diisi";
    }
    if (!fileName) {
      newErrors.icon = "Foto wajib ditambahkan";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.({
      productName: productName,
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
      isUnlimitedStock: formData.isUnlimitedStock,
      isAvailable: formData.isAvailable,
      file: selectedFile,
      fileName: fileName,
    });
    onClose();
  };

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">Tambah Item</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-full transition"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FormInput
              label="Nama Item"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Nama item dari produkmu"
              error={errors.name}
            />

            {errors.icon ? (
              <div className="w-full justify-center flex text-center pt-5">
                <p className="text-red-500 text-sm">{errors.icon}</p>
              </div>
            ) : (
              ""
            )}
            <UploadSection
              onFileChange={addPhotoHandler}
              selectedFileName={fileName}
              fileError={fileError}
            />

            <FormInput
              label="Harga (Rp)"
              type="number"
              value={formData.price}
              onChange={(e) => updateField("price", e.target.value)}
              placeholder="15000"
              error={errors.price}
            />

            {/* Stock Input with Unlimited Toggle */}
            <div className="flex flex-col gap-2">
              <FormInput
                label="Stok"
                type="number"
                value={formData.stock}
                onChange={(e) => updateField("stock", e.target.value)}
                disabled={formData.isUnlimitedStock}
                placeholder={formData.isUnlimitedStock ? "∞" : "100"}
                error={errors.stock}
              />
              <FormCheckbox
                label="Stok tak terbatas"
                checked={formData.isUnlimitedStock}
                onChange={handleUnlimitedToggle}
              />
            </div>

            {/* Availability Toggle */}
            <FormCheckbox
              label="Produk tersedia"
              checked={formData.isAvailable}
              onChange={() => updateField("isAvailable", !formData.isAvailable)}
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-4 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Simpan Item
            </button>
          </form>
        </div>
      </div>
    </Portal>
  );
};
