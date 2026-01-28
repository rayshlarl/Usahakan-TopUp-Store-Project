import { useState } from "react";
import { Portal } from "../Portal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import UploadSection from "../payment_portal/UploadSection";

// Form Input Component
const FormInput = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  disabled,
  error,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
        error ? "border-red-500 bg-red-50" : "border-gray-300"
      } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);

// Checkbox compoenent
const FormCheckbox = ({ onChange, label, checked }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);

{
  /* Main Compoenent */
}
export const EditItemPortal = ({
  onClose,
  selectedItem,
  itemIndex,
  productName,
}) => {
  // State setup
  const [formData, setFormData] = useState({
    name: "",
    icon: "",
    price: "",
    stock: "",
    isAvailable: true,
    isUnlimitedStock: false,
  });
  const [errors, setErrors] = useState({});

  //Handler tiap single input
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // Handler Submit
  const handleSubmit = () => {
    console.log("Submitted");
  };

  // Handle Unlimited Toogle
  const handleUnlimitedToggle = () => {
    setFormData((prev) => ({
      ...prev,
      isUnlimitedStock: !prev.isUnlimitedStock,
      stock: !prev.isUnlimitedStock ? "" : prev.stock,
    }));
    console.log("Dicentang");
  };
  return (
    <>
      <Portal>
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => onClose()}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Ubah Item</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>
            <div className="mt-[-25px] pb-8">
              <p>{selectedItem[itemIndex].name + " - " + productName}</p>
            </div>

            {/* Forms Items */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <FormInput
                label={"Nama item"}
                value={formData.name}
                placeholder={"Nama item produkmu"}
                onChange={(e) => updateField("name", e.target.value)}
                error={errors.name}
              />

              {/* Image Container */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-32 h-32 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                  {/* Taruh image di sini nanti */}
                </div>
                <span className="text-xs text-gray-400">Ukuran 1:1</span>
              </div>
              <UploadSection />

              <FormInput
                label={"Hargga item (Rp)"}
                value={formData.price}
                placeholder={"Harga item produk"}
                onChange={(e) => updateField("price", e.target.value)}
                error={errors.price}
              />

              {/* Form Input with Checkbox Toogle */}
              <FormInput
                onChange={(e) => updateField("stock", e.target.value)}
                label={"Stok dari item ada berapa"}
                placeholder={"Tentukan stok itemnya"}
                type="number"
                value={formData.stock}
                disabled={formData.isUnlimitedStock}
                error={errors.stock}
              />
              <FormCheckbox
                label={"Stok tak terbatas?"}
                onChange={handleUnlimitedToggle}
                checked={formData.isUnlimitedStock}
              />

              {/* Is available toogle checkbox */}
              <FormCheckbox
                label={"Barang ready?"}
                checked={formData.isAvailable}
                onChange={(e) =>
                  updateField("isAvailable", !formData.isAvailable)
                }
              />
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
    </>
  );
};
