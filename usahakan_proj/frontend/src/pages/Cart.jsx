import { Header } from "../components/Header";
import { useCart } from "../store/CartContext";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { PaymentPortal, SuccessPortal } from "../components/portal";
import { useOrderAction } from "../hooks/useOrderAction";
import { groupCartItems } from "../utils/cartHelpers";
import { CartItemList } from "../components/cart/CartItemList";
import { CartSummary } from "../components/cart/CartSummary";

const Cart = () => {
  const { cart, clearCart, removeFromCart, cartSelected, newSelected } = useCart();
  const navigate = useNavigate();

  // Dialog States
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [invoiceCode, setInvoiceCode] = useState("");

  // Custom Hooks
  const { submitOrder } = useOrderAction(clearCart);

  // Computed Values
  const totalPrice = useMemo(() => {
    return cartSelected.reduce((sum, item) => sum + Number(item.price), 0);
  }, [cartSelected]);

  const groupedCart = useMemo(() => groupCartItems(cartSelected), [cartSelected]);

  // Handlers
  const handleDeleteAll = () => {
    const isConfirmToRemove = confirm("Yakin mau dihapus semua?");
    if (isConfirmToRemove) clearCart();
  };

  const handleConfirmOrder = async (portalData) => {
    const savedUser = localStorage.getItem("user");
    const user = savedUser ? JSON.parse(savedUser) : null;

    try {
      const invoice = await submitOrder(
        portalData,
        cartSelected,
        totalPrice,
        user
      );
      setInvoiceCode(invoice);
      setShowModal(false);
      setShowSuccess(true);
    } catch (err) {
      alert("Gagal membuat pesanan, coba lagi kak!");
    }
  };

  // Empty Cart View
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-1 p-6 flex justify-center items-center">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-10 flex flex-col items-center justify-center gap-4">
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
        </main>
      </div>
    );
  }

  // Main Cart View
  return (
    <>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />

        <main className="flex-1 p-6 flex justify-center">
          <div className="w-full max-w-6xl flex gap-6">
            {/* Left: Item List */}
            <CartItemList
              cart={cart}
              selected={cartSelected}
              onRemove={removeFromCart}
              onSelect={newSelected}
              onDeleteAll={handleDeleteAll}
            />

            {/* Right: Summary */}
            <CartSummary
              groupedItems={groupedCart}
              totalPrice={totalPrice}
              onCheckout={() => setShowModal(true)}
            />
          </div>
        </main>
      </div>

      {showModal && (
        <PaymentPortal
          cart={cartSelected}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmOrder}
        />
      )}

      {showSuccess && (
        <SuccessPortal
          invoiceCode={invoiceCode}
          onClose={() => {
            setShowSuccess(false);
            navigate("/");
          }}
        />
      )}
    </>
  );
};

export { Cart };
