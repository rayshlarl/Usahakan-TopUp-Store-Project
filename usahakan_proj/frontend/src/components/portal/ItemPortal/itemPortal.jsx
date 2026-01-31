import { useState } from "react";
import { Portal } from "../Portal";
import UploadSection from "../payment_portal/UploadSection";
import { useFileValidation } from "../../../hooks/useFileValidation";
import { XMarkIcon, PhotoIcon } from "@heroicons/react/24/solid";
import { FormInput } from "../../formInput";
import { FormCheckbox } from "../../FormCheckbox";
import { getUploadUrl } from "../../../api";

// Main Component
export const ItemPortal = ({
  onClose,
  onSubmit,
  productName,
  selectedItem,
  index,
}) => {
  const selectedData = selectedItem?.[index];
  console.log(selectedData);
  // Form State
  const [formData, setFormData] = useState({
    name: selectedData?.name || "",
    icon: selectedData?.icon || "",
    price: selectedData?.price || "",
    stock: selectedData?.stock || "",
    isAvailable: selectedData?.is_available || true,
    isUnlimitedStock: selectedData?.is_unlimited_stock || false,
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);

  //Custom Hooks
  const {
    selectedFile,
    fileName,
    error: fileError,
    validateFile,
  } = useFileValidation();

  //File handler
  const addPhotoHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    validateFile(e);
    if (errors["file"]) {
      setErrors((prev) => ({ ...prev, ["icon"]: "" }));
    }

    const url = URL.createObjectURL(file);
    validateFile(e);
    setPreviewUrl(url);
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
      itemId: selectedData?.id, //
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
      isUnlimitedStock: formData.isUnlimitedStock,
      isAvailable: formData.isAvailable,
      file: selectedFile,
      icon: fileName, //
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

            {/* Image Container */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                {previewUrl || selectedData?.icon ? (
                  <img
                    src={
                      previewUrl
                        ? previewUrl
                        : getUploadUrl("icons", selectedData.icon)
                    }
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PhotoIcon className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <span className="text-xs text-gray-400">Ukuran 1:1</span>
            </div>

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
