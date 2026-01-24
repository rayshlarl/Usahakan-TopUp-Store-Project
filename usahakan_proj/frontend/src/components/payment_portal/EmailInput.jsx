const EmailInput = ({ isLoggedIn, userEmail, onEmailChange }) => {
  return (
    <div>
      <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
        Email aktif
      </p>
      <input
        type="email"
        placeholder={isLoggedIn ? "" : "Masukkan email untuk notifikasi"}
        defaultValue={isLoggedIn ? userEmail : ""}
        readOnly={isLoggedIn}
        required={true}
        onChange={onEmailChange}
        className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${
          isLoggedIn ? "bg-gray-100 cursor-not-allowed text-gray-600" : ""
        }`}
      />
    </div>
  );
};

export default EmailInput;
