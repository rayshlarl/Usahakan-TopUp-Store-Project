export const CartSummary = ({ groupedItems, totalPrice, onCheckout }) => {
    return (
        <div className="w-[35%] bg-white rounded-xl shadow-md p-6 h-fit sticky top-30 mt-18">
            <h2 className="text-xl font-bold mb-4">Ringkasan</h2>

            <div className="bg-gray-100 p-4 rounded-xl mb-5 space-y-2">
                {groupedItems.map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600 truncate max-w-[60%]">
                            {item.name}{" "}
                            {item.quantity > 1 && (
                                <span className="text-blue-500 font-semibold">x{item.quantity}</span>
                            )}
                        </span>
                        <span className="text-gray-700 font-medium">
                            Rp. {Number(item.totalPrice).toLocaleString()}
                        </span>
                    </div>
                ))}
                {groupedItems.length === 0 && (
                    <p className="text-gray-400 text-center text-sm">Belum ada item dipilih</p>
                )}
            </div>

            <div className="flex justify-between mb-6 bg-gray-50 px-5 py-4 rounded-xl border border-gray-100">
                <span className="font-bold text-gray-700">Total</span>
                <span className="font-bold text-blue-600 text-xl">
                    Rp. {totalPrice.toLocaleString()}
                </span>
            </div>

            <button
                onClick={onCheckout}
                disabled={groupedItems.length === 0}
                className={`w-full py-3 rounded-xl font-semibold transition cursor-pointer ${groupedItems.length === 0
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/30"
                    }`}
            >
                Checkout
            </button>
        </div>
    );
};
