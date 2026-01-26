const PaymentMethod = ({ methods = ["QRIS"] }) => {
    return (
        <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                Payment Method
            </p>
            <div className="grid grid-cols-3 gap-3">
                {methods.map((method) => (
                    <label
                        key={method}
                        className="flex items-center justify-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
                    >
                        <input
                            type="radio"
                            name="payment"
                            value={method}
                            defaultChecked
                            className="sr-only"
                            required
                        />
                        <span className="text-sm font-medium text-gray-700">{method}</span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export default PaymentMethod;
