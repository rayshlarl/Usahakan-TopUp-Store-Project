import qrisImage from "/MyQris.png";

const QrisSection = () => {
    return (
        <div className="flex flex-col items-center text-center">
            <p className="text-gray-600 mb-4">Scan dulu Qrisnya kak</p>

            {/* QRIS Image */}
            <div className="w-64 h-64 rounded-xl flex items-center justify-center mb-4">
                <img
                    src={qrisImage}
                    alt="QRIS"
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Download Button */}
            <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-xl transition-colors cursor-pointer mb-4">
                Download QRIS
            </button>

            <p className="text-sm text-gray-500">Bayar sesuai nominal ya kak :D</p>
        </div>
    );
};

export default QrisSection;
