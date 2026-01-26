import { Portal } from "../Portal";

const ProductPortal = ({ order, onClose }) => {
  if (!order) return null;

  const orderItems = order.order_items || [];

  // Calculate totals
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = orderItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white">
            <h2 className="text-xl font-bold text-gray-800">Detail Produk</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Invoice Code */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Invoice Code
              </p>
              <p className="text-gray-800 font-medium">{order.invoice_code}</p>
            </div>

            {/* Price Summary */}
            <div className="bg-gray-50 rounded-xl p-4 flex justify-between items-center">
              <p className="text-xs text-gray-400 uppercase">
                Items ({totalItems})
              </p>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase">Total</p>
                <p className="text-xl font-bold text-blue-600">
                  Rp {totalPrice.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Product Items */}
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                Product Items
              </p>

              <div className="space-y-4">
                {orderItems.map((item, index) => (
                  <ItemCard key={index} item={item} />
                ))}
              </div>
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

// --> Komponen terpisah untuk setiap item
const ItemCard = ({ item }) => {
  const inputData = item.input_data || {};
  const hasInputData = Object.keys(inputData).length > 0;

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      {/* Item Header */}
      <div className="flex justify-between items-center">
        <div>
          <span className="font-medium text-gray-800">
            {item.product_items?.name || "Item"}
          </span>
          <span className="text-blue-500 mx-2">-</span>
          <span className="text-blue-500">
            {item.products?.name || "Product"}
          </span>
          {item.quantity > 1 && (
            <span className="text-blue-600 ml-2 font-medium">
              x{item.quantity}
            </span>
          )}
        </div>
        <span className="text-gray-600 font-medium">
          Rp {(Number(item.price) * item.quantity).toLocaleString()}
        </span>
      </div>

      {/* Input Data */}
      {hasInputData && (
        <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-200">
          {Object.entries(inputData).map(([key, value]) => (
            <div key={key}>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                {key.replace(/_/g, " ")}
              </p>
              <p className="text-gray-800 font-medium">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPortal;
