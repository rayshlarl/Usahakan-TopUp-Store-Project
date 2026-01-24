const PriceSummary = ({ itemCount, totalPrice }) => {
    return (
        <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide">
                        Items ({itemCount})
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-gray-400 uppercase tracking-wide">Total</p>
                    <p className="text-xl font-bold text-blue-600">
                        Rp {totalPrice.toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PriceSummary;
