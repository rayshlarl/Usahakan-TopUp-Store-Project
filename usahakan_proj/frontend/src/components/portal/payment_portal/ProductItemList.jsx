const ProductItemList = ({ groupedCart }) => {
    return (
        <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                Product Items
            </p>
            <div className="space-y-2">
                {groupedCart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-700">
                            {item.name}
                            <span className="text-gray-400 ml-2">- {item.product}</span>
                            {item.quantity > 1 && (
                                <span className="text-blue-500 ml-2">x{item.quantity}</span>
                            )}
                        </span>
                        <span className="text-gray-500 text-sm">
                            Rp {item.totalPrice.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductItemList;
