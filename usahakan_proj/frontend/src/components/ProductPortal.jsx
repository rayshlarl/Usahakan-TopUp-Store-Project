import { Portal } from "./Portal";

const ProductPortal = ({ order, onClose }) => {
    if (!order) return null;

    return (
        <Portal>
            <div
                className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <div
                    className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800">Detail Produk</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer"
                        >
                            ×
                        </button>
                    </div>

                    {/* Content - Blank for now */}
                    <div className="p-6 space-y-4">
                        <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                Invoice Code
                            </p>
                            <p className="text-gray-800 font-medium">{order.invoice_code}</p>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">
                            <p className="text-sm text-gray-500 text-center">
                                Detail produk akan ditampilkan di sini
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 rounded-xl transition-colors cursor-pointer"
                        >
                            Tutup
                        </button>
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default ProductPortal;
