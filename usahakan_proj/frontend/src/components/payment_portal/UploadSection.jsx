const UploadSection = ({
    fileError,
    selectedFileName,
    onFileChange,
}) => {
    return (
        <div className="text-center">
            <p className="text-sm text-gray-500 mb-3">
                *opsional, demi kenyamanan yuk upload bukti pembayaran :)
            </p>
            {fileError && <p className="text-sm text-red-500 mb-2">{fileError}</p>}
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl cursor-pointer transition-colors">
                Pilih Foto
                <input
                    type="file"
                    accept=".png,.jpg,.jpeg"
                    onChange={onFileChange}
                    className="sr-only"
                />
            </label>
            {selectedFileName && (
                <p className="text-sm text-green-600 mt-2">{selectedFileName}</p>
            )}
        </div>
    );
};

export default UploadSection;
