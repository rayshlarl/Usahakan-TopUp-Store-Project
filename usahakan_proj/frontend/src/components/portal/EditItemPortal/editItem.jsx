import { useState } from "react";
import { Portal } from "../Portal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import UploadSection from "../payment_portal/UploadSection";
import { getUploadUrl } from "../../../api";
import { useFileValidation } from "../../../hooks/useFileValidation";
import { updateItem } from "../../../api";
import { FormInput } from "../../formInput";
import { FormCheckbox } from "../../FormCheckbox";

{
  /* Main Compoenent */
}
export const EditItemPortal = ({ onClose, selectedItem, index, onSubmit }) => {
  const currentItem = selectedItem[index];

  // State setup
  const [formData, setFormData] = useState({
    name: currentItem?.name || "",
    icon: currentItem?.icon || "",
    price: currentItem?.price?.toString() || "",
    stock: currentItem?.stock?.toString() || "",
    isAvailable: currentItem?.is_available ?? true,
    isUnlimitedStock: currentItem?.is_unlimited_stock ?? false,
  });
  const [errors, setErrors] = useState({});
  const [previewUrl, setPreviewUrl] = useState(null);

  //Custom Hooks
  const {
    selectedFile,
    fileName,
    error: fileError,
    validateFile,
  } = useFileValidation(); // --> nanti di pake

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

  //File Change Handler -> sekalian set preview url
  const fileHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    validateFile(e);
    console.log(file);
    console.log("keganti wok");
  };

  // Handler Submit dan error validasi
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validation logic
    if (!formData.name.trim()) {
      newErrors.name = "Nama item gaboleh kosong wok";
    }
    if (!formData.price.trim()) {
      newErrors.price = "Harga juga tidak boleh kosong";
    }
    if (!formData.stock.trim() && !formData.isUnlimitedStock) {
      newErrors.stock = "Stok harus diisi";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit?.(
      {
        itemId: currentItem.id,
        name: formData.name,
        price: formData.price,
        stock: formData.stock,
        isUnlimitedStock: formData.isUnlimitedStock,
        isAvailable: formData.isAvailable,
        file: selectedFile,
        icon: formData.icon,
      },
      index
    );
    onClose();
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
              <p>{currentItem.name + " - " + currentItem.products.name}</p>
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
                  <img
                    src={
                      previewUrl
                        ? previewUrl
                        : getUploadUrl("icons", `${currentItem.icon}`)
                    }
                    alt=""
                  />
                </div>
                <span className="text-xs text-gray-400">Ukuran 1:1</span>
              </div>
              <UploadSection onFileChange={fileHandler} />

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
