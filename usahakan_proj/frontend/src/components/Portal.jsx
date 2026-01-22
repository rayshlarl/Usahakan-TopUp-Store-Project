import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  return createPortal(children, document.body);
};

const PaymentPortal = ({ cart = [], onClose, onConfirm }) => {
  if (!cart || cart.length === 0) {
    return null;
  }

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  const groupedCart = cart.reduce((acc, item) => {
    const groupKey = `${item.id}-${item.product}`;

    const existingItem = acc.find((i) => i.groupKey === groupKey);

    if (existingItem) {
      // -> produk sama? tambah quanty
      existingItem.quantity += 1;
      existingItem.totalPrice += Number(item.price);
    } else {
      acc.push({
        ...item,
        groupKey: groupKey,
        quantity: 1,
        totalPrice: Number(item.price),
      });
    }

    return acc;
  }, []);

  // Group by product (for displaying user info per game)
  const groupedByProduct = cart.reduce((acc, item) => {
    const productKey = item.product;
    const existingProduct = acc.find((p) => p.product === productKey);

    if (existingProduct) {
      // Cek apakah inputData sudah ada
      const inputDataKey = JSON.stringify(item.inputData);
      const hasInputData = existingProduct.inputs.some(
        (i) => JSON.stringify(i.inputData) === inputDataKey
      );
      if (!hasInputData) {
        existingProduct.inputs.push({
          inputData: item.inputData,
          inputFields: item.inputFields,
        });
      }
    } else {
      acc.push({
        product: productKey,
        category: item.category,
        inputs: [
          {
            inputData: item.inputData,
            inputFields: item.inputFields,
          },
        ],
      });
    }

    return acc;
  }, []);

  console.log(cart);

  return (
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
          <h2 className="text-xl font-bold text-gray-800">
            Konfirmasi Pesanan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Items */}
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
                      <span className="text-blue-500 ml-2">
                        x{item.quantity}
                      </span>
                    )}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Rp {item.totalPrice.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Items ({cart.length})
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  Total
                </p>
                <p className="text-xl font-bold text-blue-600">
                  Rp {totalPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* User Info - Per Product */}
          {groupedByProduct.map((productGroup, productIndex) => (
            <div key={productIndex} className="space-y-3">
              <p className="font-semibold text-gray-800">
                {productGroup.product}
              </p>

              {productGroup.inputs.map((input, inputIndex) => (
                <div key={inputIndex} className="bg-gray-50 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {input.inputFields?.map((field, fieldIndex) => (
                      <div key={fieldIndex}>
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                          {field.field_label}
                        </p>
                        <p className="text-gray-800 font-medium">
                          {input.inputData?.[field.field_name] || "-"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Email */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
              Email
            </p>
            <input
              type="email"
              placeholder="Masukkan email untuk notifikasi"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Payment Method */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
              Payment Method
            </p>
            <div className="grid grid-cols-3 gap-3">
              {["QRIS"].map((method) => (
                <label
                  key={method}
                  className="flex items-center justify-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    className="sr-only"
                    required
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {method}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button
            onClick={onConfirm}
            className=" w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors cursor-pointer"
          >
            Lanjut Bayar
          </button>
        </div>
      </div>
    </div>
  );
};

export { Portal, PaymentPortal };

