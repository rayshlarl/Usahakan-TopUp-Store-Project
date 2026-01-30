import { Portal } from "../Portal";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { FormInput } from "../../formInput";
import { FormCheckbox } from "../../FormCheckbox";
import { CategoryDropdown } from "../../CategoriesForm";
import { useState } from "react";
import { useFileValidation } from "../../../hooks/useFileValidation";
import UploadSection from "../payment_portal/UploadSection";
import { InputFieldDropdown } from "../../formfield";
import { Product } from "../../product";

export const AddProductPortal = ({
  onClose,
  onSubmit,
  categorys,
  inputTypes,
}) => {
  //File State
  const [previewUrl, setPreviewUrl] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  // --> Inisialisasi state dari parent ( array object - chaining)
  const [categories, setCategories] = useState(
    Object.keys(categorys).map((catName) => ({
      id: categorys[catName][0]?.category_id,
      name: catName,
    }))
  );

  // Form state
  const [formData, setFormData] = useState({
    inputStyle: "",
    category: "",
    name: "",
    desc: "",
    isAvailable: true,
  });
  const [errors, setErrors] = useState({}); // --> Error state

  //Handle update fiel
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Custom Hooks
  const {
    selectedFile,
    fileName,
    error: fileError,
    validateFile,
  } = useFileValidation();

  // Handle saat submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // --> Validation Logic
    if (!formData.category.trim()) {
      newErrors.category = "Kategori harus di isi ya";
    }
    if (!formData.inputStyle.trim()) {
      newErrors.inputStyle = "Tipe input harus di isi ya";
    }
    if (!formData.name.trim()) {
      newErrors.name = "Nama tidak boleh kosong";
    }
    if (!formData.desc.trim()) {
      newErrors.desc = "Deskripsi jangan kosong ya kak";
    }
    if (!fileName) {
      newErrors.file = "Harus upload foto ya kak";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log(formData.inputStyle);
      return;
    }

    onSubmit?.({
      category: formData.category,
      inputStyle: formData.inputStyle,
      name: formData.name,
      desc: formData.desc,
      isAvailable: formData.isAvailable,
      file: selectedFile,
      fileName: fileName,
    });
    onClose();
  };

  //File Change Handler -> sekalian set preview url
  const fileHandler = (e) => {
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

  return (
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
            {/* Categories Form  */}
            <CategoryDropdown
              error={errors.category}
              categories={categories}
              selectedCategory={formData.category}
              onSelect={(catName) => updateField("category", catName)}
              onAddNew={() => {
                const newCat = prompt("Nama kategori baru:");
                if (newCat) {
                  setCategories([
                    ...categories,
                    { id: Date.now(), name: newCat },
                  ]);
                  setSelectedCategory(newCat);
                }
              }}
            />

            {/* Select input field */}
            <InputFieldDropdown
              error={errors.inputStyle}
              inputStyles={inputTypes}
              selectedInputStyle={formData.inputStyle}
              onSelect={(inputSelected) =>
                updateField("inputStyle", inputSelected)
              }
            />

            {/* Image Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-32 h-50 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                <img src={previewUrl} alt="" />
              </div>
              <span className="text-xs text-gray-400">Ukuran 9:6</span>
            </div>
            {errors.file ? (
              <div className="w-full justify-center flex text-center ">
                <p className="text-red-500 text-sm">{errors.file}</p>
              </div>
            ) : (
              ""
            )}
            <UploadSection
              onFileChange={fileHandler}
              selectedFileName={fileName}
            />

            {/* Input Form */}
            <FormInput
              label={"Buat nama untuk produkmu"}
              placeholder={"Produk kamu"}
              error={errors.name}
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
            <FormInput
              label={"Buat deskripsi singkat"}
              placeholder={"Deskripsikan produkmu"}
              error={errors.desc}
              value={formData.desc}
              onChange={(e) => updateField("desc", e.target.value)}
            />

            {/* Available Toogle */}
            <FormCheckbox
              label={"Produk tersedia?"}
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
