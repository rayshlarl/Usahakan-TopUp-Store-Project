// components/CategoryDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon, PlusIcon } from "@heroicons/react/24/solid";

export const CategoryDropdown = ({
  categories = [],
  selectedCategory,
  onSelect,
  onAddNew,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Label */}
      <label className="text-sm font-medium text-gray-700 mb-1 block">
        Kategori
      </label>

      {/* Dropdown Trigger */}
      <button
        type="button"
        onChange={onchange}
        onClick={() => setIsOpen(!isOpen)}
        className={` w-full px-4 py-2 border rounded-lg bg-white flex justify-between items-center hover:border-gray-400 transition ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        <span className={selectedCategory ? "text-gray-800" : "text-gray-400"}>
          {selectedCategory || "Pilih kategori"}
        </span>
        <ChevronDownIcon
          className={`w-5 h-5 text-gray-500 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Category List */}
          <div className="max-h-48 overflow-y-auto">
            {categories.length > 0 ? (
              categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    onSelect(cat.name);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition `}
                >
                  {cat.name}
                </button>
              ))
            ) : (
              <p className="px-4 py-2 text-sm text-gray-400">
                Belum ada kategori
              </p>
            )}
          </div>

          {/* Add New Category */}
          <button
            type="button"
            onClick={() => {
              onAddNew();
            }}
            className="w-full px-4 py-2 border-t border-gray-100 flex items-center gap-2 text-blue-500 hover:bg-blue-50 transition"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="text-sm font-medium">Tambah Kategori Baru</span>
          </button>
        </div>
      )}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
};
