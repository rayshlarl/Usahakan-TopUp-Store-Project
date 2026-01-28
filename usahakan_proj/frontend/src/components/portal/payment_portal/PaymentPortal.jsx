import { useState } from "react";
import { Portal } from "../Portal";
import { groupCartItems, groupCartByProduct } from "../../../utils/cartHelpers";
import { useFileValidation } from "../../../hooks/useFileValidation";
import QrisSection from "./QrisSection";
import PriceSummary from "./PriceSummary";
import ProductItemList from "./ProductItemList";
import UserInfoSection from "./UserInfoSection";
import EmailInput from "./EmailInput";
import PaymentMethod from "./PaymentMethod";
import UploadSection from "./UploadSection";

const PaymentPortal = ({ cart = [], onClose, onConfirm }) => {
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const isLoggedIn = !!user;

  // Local State
  const [email, setEmail] = useState(isLoggedIn ? user.email : "");
  const [emailError, setEmailError] = useState("");

  // Custom Hooks
  const {
    selectedFile,
    fileName,
    error: fileError,
    validateFile,
  } = useFileValidation();

  // Guard Clause
  if (!cart || cart.length === 0) return null;

  // Computed Values
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);
  const groupedCart = groupCartItems(cart);
  const groupedByProduct = groupCartByProduct(cart);

  // Handlers
  const handleConfirm = () => {
    if (!email) {
      setEmailError("Email wajib diisi ya kak :)");
      return;
    }
    onConfirm({
      email,
      fileName,
      file: selectedFile,
    });
  };

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
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <h2 className="text-xl font-bold text-gray-800">Detail Pesanan</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer transition"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            <QrisSection />
            <PriceSummary itemCount={cart.length} totalPrice={totalPrice} />
            <ProductItemList groupedCart={groupedCart} />

            <hr className="border-gray-100" />

            <UserInfoSection groupedByProduct={groupedByProduct} />
            <EmailInput
              isLoggedIn={isLoggedIn}
              userEmail={user?.email}
              onEmailChange={(e) => setEmail(e.target.value)}
              errorLabel={emailError}
            />
            <PaymentMethod />

            <div>
              <p className="text-sm text-gray-500 mb-3">
                *opsional, demi kenyamanan yuk upload bukti pembayaran :)
              </p>
              <UploadSection
                fileError={fileError}
                selectedFileName={fileName}
                onFileChange={validateFile}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 sticky bottom-0">
            <button
              onClick={handleConfirm}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors cursor-pointer shadow-lg shadow-blue-500/30"
            >
              Konfirmasi pembayaran
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default PaymentPortal;
