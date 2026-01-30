// Form Input Component
export const FormInput = ({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  disabled,
  error,
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      placeholder={placeholder}
      className={`px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
        error ? "border-red-500 bg-red-50" : "border-gray-300"
      } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
    />
    {error && <span className="text-xs text-red-500">{error}</span>}
  </div>
);
