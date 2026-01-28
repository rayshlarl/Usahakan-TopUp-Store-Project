import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export const BackButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 cursor-pointer mb-6"
        >
            <ArrowLeftIcon className="w-4 h-4" />
            <span className="font-medium">Kembali</span>
            <span className="text-gray-400"> ke Produk Tersedia</span>
        </button>
    );
};
