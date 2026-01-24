import { useState } from "react";
import { Portal } from "../Portal";
import { groupCartItems, groupCartByProduct } from "../../utils/cartHelpers";
import QrisSection from "./QrisSection";
import PriceSummary from "./PriceSummary";
import ProductItemList from "./ProductItemList";
import UserInfoSection from "./UserInfoSection";
import EmailInput from "./EmailInput";
import PaymentMethod from "./PaymentMethod";
import UploadSection from "./UploadSection";

const PaymentPortal = ({ cart = [], onClose, onConfirm }) => {
  // --> Cek apakah user sudah login (pindah ke atas supaya bisa set initial email)
  const savedUser = localStorage.getItem("user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const isLoggedIn = !!user;

  // --> Set email dari awal kalau user sudah login
  const [email, setEmail] = useState(isLoggedIn ? user.email : "");

  if (!cart || cart.length === 0) {
    return null;
  }

  // --> Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0);

  // --> State untuk nama file bukti pembayaran
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileError, setFileError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ekstensi file
      const allowedExtensions = [".png", ".jpg", ".jpeg"];
      const fileName = file.name.toLowerCase();
      const isValidFile = allowedExtensions.some((ext) =>
        fileName.endsWith(ext)
      );

      if (!isValidFile) {
        setFileError("Hanya file PNG, JPG, atau JPEG yang diperbolehkan kak!");
        e.target.value = "";
        setSelectedFileName("");
        return;
      }

      setFileError("");
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName("");
    }
  };

  // --> Group cart items
  const groupedCart = groupCartItems(cart);
  const groupedByProduct = groupCartByProduct(cart);

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
            <h2 className="text-xl font-bold text-gray-800">Detail Pesanan</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-light cursor-pointer"
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
            />
            <PaymentMethod />
            <UploadSection
              fileError={fileError}
              selectedFileName={selectedFileName}
              onFileChange={handleFileChange}
            />
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <button
              onClick={() => onConfirm({ email })}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors cursor-pointer"
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
