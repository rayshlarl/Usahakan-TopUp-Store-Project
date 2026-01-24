import { Portal } from "../Portal";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const SuccessPortal = ({ invoiceCode, onClose }) => {
  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-center p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckBadgeIcon className="w-15 text-green-500" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Pembayaran Berhasil!
          </h2>

          <p className="text-gray-500 mb-6">
            Terima kasih kak, pesanan kamu sedang diproses
          </p>

          {/* Invoice Code --> generate inv*/}
          {invoiceCode && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Kode Invoice
              </p>
              <p className="text-lg font-bold text-blue-600">{invoiceCode}</p>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors cursor-pointer"
          >
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </Portal>
  );
};

export default SuccessPortal;
