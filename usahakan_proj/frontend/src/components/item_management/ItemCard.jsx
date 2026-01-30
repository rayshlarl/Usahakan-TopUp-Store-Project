import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { getUploadUrl } from "../../api";

// Format currency to Indonesian Rupiah
const formatPrice = (price) => {
  return new Intl.NumberFormat("id-ID").format(price);
};

export const ItemCard = ({ item, onEdit, onDelete, index }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow overflow-hidden">
      {/* Item Image */}
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center overflow-hidden">
          <img
            src={getUploadUrl("icons", item.icon)}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Item Details */}
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{item.name}</h3>
          <p className="text-blue-600 font-semibold">
            Rp {formatPrice(item.price)}
          </p>
          <p className="text-sm text-gray-500">Stok: {item.stock}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onDelete(item.id)}
          className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
        >
          <TrashIcon className="w-4 h-4" />
          <span className="text-sm">Hapus</span>
        </button>
        <button
          onClick={() => onEdit(item.id, index)}
          className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
        >
          <PencilIcon className="w-4 h-4" />
          <span className="text-sm">Ubah</span>
        </button>
      </div>
    </div>
  );
};
