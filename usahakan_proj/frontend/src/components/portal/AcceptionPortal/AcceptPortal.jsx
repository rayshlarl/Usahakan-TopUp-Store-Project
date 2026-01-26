import { Portal } from "../Portal";
import { updateOrder } from "../../../api/users_api";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

const AcceptionPortal = ({ order, onClose }) => {
  //--> accept handler
  const acceptHandler = async (invoiceCode) => {
    const response = await updateOrder(invoiceCode, "selesai");
    window.location.reload();
    onClose();
  };
  //--> decline handler
  const declineHandler = async (invoiceCode) => {
    const response = await updateOrder(invoiceCode, "ditolak");
    window.location.reload();
    onClose();
  };
  return (
    <Portal onClose={onClose}>
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={() => onClose()}
      >
        <div
          className="bg-white rounded-2xl shadow-xl p-6 max-w-xs w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* konten di sini */}
          <div className=" w-full flex justify-end">
            <XMarkIcon className="w-8" />
          </div>
          <div className=" w-full h-20 flex justify-center text-center">
            <p className="font-bold">
              Pesanan ini mau dilanjut <br /> kemana?
            </p>
          </div>
          <div className="w-full flex justify-between items-center">
            <button
              onClick={() => declineHandler(order.invoice_code)}
              className="bg-red-500 py-2 px-10 rounded-lg text-white"
            >
              Tolak
            </button>
            <button
              onClick={() => acceptHandler(order.invoice_code)}
              className="bg-green-600 py-2 px-10 rounded-lg text-white"
            >
              Selesai
            </button>
          </div>
        </div>
      </div>
    </Portal>
  );
};
export { AcceptionPortal };
