import { PlusIcon } from "@heroicons/react/24/solid";

export const PageHeader = ({ productName, onAddItem }) => {
    return (
        <div className="flex justify-between items-start mb-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-800">
                    {productName} - Daftar Item
                </h1>
                <p className="text-gray-500">Kelola item produk {productName} Anda.</p>
            </div>
            <button
                onClick={onAddItem}
                className="flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 cursor-pointer"
            >
                <PlusIcon className="w-5 h-5" />
                <span className="font-medium">Tambah Item</span>
            </button>
        </div>
    );
};
