import { Portal } from "../Portal";
import { getUploadUrl } from "../../../api";

const ImagePortal = ({ orderImage, onClose }) => {
  return (
    <Portal>
      <div
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full flex justify-center flex-col "
          onClick={(e) => e.stopPropagation()}
        >
          {/* konten di sini */}
          {orderImage ? (
            <img
              src={getUploadUrl("paymentsProof", orderImage)}
              alt="Bukti pembayaran"
              className="rounded-xl max-h-80 object-contain"
            />
          ) : (
            <p>Costumer tidak menambahkan foto</p>
          )}

          <p>{orderImage}</p>
          <br />
          <div
            onClick={onClose}
            className="bg-gray-800 rounded-lg h-10 w-full flex justify-center items-center cursor-pointer hover:bg-gray-600"
          >
            <p className="font-bold text-white">Kembali</p>
          </div>
        </div>
      </div>
    </Portal>
  );
};
export { ImagePortal };
