import { Header } from "../components/Header";
import { useCart } from "../store/CartContext";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Portal, PaymentPortal } from "../components/Portal";

const Cart = () => {
  // --> Setup the statement
  const [showModal, setShowModal] = useState(false);
  const { cart, clearCart, removeFromCart, cartSelected, newSelected } =
    useCart();

  const totalPrice = useMemo(() => {
    return cartSelected.reduce((sum, item) => sum + Number(item.price), 0);
  }, [cartSelected, cart]);

  // --> Function simpify (Ringkasan)
  const groupedCart = cartSelected.reduce((accumulation, item) => {
    const groupKey = `${item.id}-${item.product}`;

    const existingItem = accumulation.find((i) => i.groupKey === groupKey);
    if (existingItem) {
      existingItem.qty += 1;
      existingItem.totalPrice += Number(item.price);
    } else {
      accumulation.push({
        ...item,
        groupKey: groupKey,
        qty: 1,
        totalPrice: Number(item.price),
      });
    }
    return accumulation;
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />

        {/* Content */}
        <main className="flex-1 p-6 flex justify-center">
          {cart.length > 0 ? (
            <div className="w-full max-w-6xl flex gap-6">
              {/* Left: Cart Items (65%) */}
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
                        className="scale-150"
                        checked={cartSelected.some(
                          (item) => item.indexIn === index
                        )}
                        onChange={() => newSelected(index, cartItem)}
                      />
                    </div>
                    <div className="flex items-center gap-4 mr-60">
                      <img src="..." className="w-16 h-16 rounded-lg" />
                      <div>
                        <p className="font-semibold">{cartItem.name}</p>
                        <p className="text-gray-500 text-sm">{cartItem.game}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <p className="font-bold text-red-500">
                        Rp. {cartItem.price}
                      </p>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-gray-400 hover:text-red-500 cursor-pointer"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}

                <div className="w-full flex justify-end">
                  <div
                    onClick={() => clearCart()}
                    className="bg-red-500 px-20 py-3 rounded-2xl cursor-pointer"
                  >
                    <p className="text-white">Hapus semua</p>
                  </div>
                </div>
              </div>

              {/* Right: Summary (35%) */}
              <div className="w-[35%] bg-white rounded-xl shadow-md p-6 h-fit sticky top-30 mt-18">
                <h2 className="text-xl font-bold mb-4">Ringkasan</h2>

                <div className="bg-gray-100 p-3 rounded-xl mb-5 py-5">
                  {groupedCart.map((item, index) => (
                    <div key={index} className="flex justify-between mb-2">
                      <span className="text-gray-500">
                        {item.name}{" "}
                        {item.qty > 0 && (
                          <span className="text-blue-500">x{item.qty}</span>
                        )}
                      </span>

                      <span className="text-gray-500">
                        Rp. {Number(item.totalPrice).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between mb-6 bg-gray-100 px-5 py-3 rounded-xl">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-blue-500 text-xl">
                    Rp. {totalPrice.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => setShowModal(true)}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition cursor-pointer"
                >
                  Checkout
                </button>
              </div>
              {showModal && (
                <Portal>
                  <PaymentPortal
                    cart={cartSelected}
                    onClose={() => setShowModal(false)}
                    onConfirm={() => {
                      clearCart();
                      setShowModal(false);
                      alert("Pembayaran berhasil!");
                    }}
                  />
                </Portal>
              )}
            </div>
          ) : (
            <div className="w-full h-fit mt-12 max-w-md bg-white rounded-2xl shadow-md p-10 flex flex-col items-center justify-center gap-4">
              <i className="fa-solid fa-cart-shopping text-6xl text-gray-300"></i>
              <h1 className="font-bold text-xl">Belum ada produk!</h1>
              <p className="text-gray-500 text-center">
                Keranjang belanja kamu masih kosong
              </p>
              <button
                onClick={() => navigate(`/`)}
                className="bg-blue-500 py-3 px-10 rounded-2xl cursor-pointer hover:bg-blue-600 transition"
              >
                <p className="font-bold text-white">Mulai belanja</p>
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};
export { Cart };
