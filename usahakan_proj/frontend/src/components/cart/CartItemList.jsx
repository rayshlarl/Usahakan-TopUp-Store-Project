import { TrashIcon } from "@heroicons/react/24/solid";

export const CartItemList = ({ cart, selected, onRemove, onSelect, onDeleteAll }) => {
    return (
        <div className="w-[65%] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Keranjang</h2>

            {cart.map((cartItem, index) => (
                <div
                    key={index}
                    className="bg-white rounded-2xl flex items-center justify-between p-4 my-5"
                >
                    <div className="ml-3">
                        <input
                            type="checkbox"
                            className="scale-150 cursor-pointer"
                            checked={selected.some((item) => item.indexIn === index)}
                            onChange={() => onSelect(index, cartItem)}
                        />
                    </div>
                    <div className="flex items-center gap-4 flex-1 ml-6">
                        <img
                            src={cartItem.image || "https://placehold.co/100"}
                            alt={cartItem.name}
                            className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                            <p className="font-semibold">{cartItem.name}</p>
                            <p className="text-gray-500 text-sm">{cartItem.game}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-6 mr-4">
                        <p className="font-bold text-red-500">
                            Rp. {Number(cartItem.price).toLocaleString()}
                        </p>
                        <button
                            onClick={() => onRemove(index)}
                            className="text-gray-400 hover:text-red-500 cursor-pointer transition"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}

            {cart.length > 0 && (
                <div className="w-full flex justify-end mt-6">
                    <button
                        onClick={onDeleteAll}
                        className="bg-red-500 px-8 py-3 rounded-2xl cursor-pointer hover:bg-red-600 transition"
                    >
                        <p className="text-white font-medium">Hapus semua</p>
                    </button>
                </div>
            )}
        </div>
    );
};
