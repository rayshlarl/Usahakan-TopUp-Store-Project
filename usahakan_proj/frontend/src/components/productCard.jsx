import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

// Product Card Component
export const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${product.name}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 rounded-lg object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <span className="text-xs font-semibold text-blue-500 uppercase">
          {product.category}
        </span>
        <h3 className="font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={(e) => {
              onDelete(product.id);
              e.stopPropagation();
            }}
            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <TrashIcon className="w-4 h-4" />
            <span className="text-sm">Hapus</span>
          </button>
          <button
            onClick={(e) => {
              onEdit(product);
              e.stopPropagation();
            }}
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
          >
            <PencilIcon className="w-4 h-4" />
            <span className="text-sm">Ubah</span>
          </button>
        </div>
      </div>
    </div>
  );
};
