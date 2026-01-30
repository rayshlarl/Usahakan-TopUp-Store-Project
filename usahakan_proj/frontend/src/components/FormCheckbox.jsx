// Checkbox compoenent
export const FormCheckbox = ({ onChange, label, checked }) => (
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
    />
    <span className="text-sm text-gray-700">{label}</span>
  </label>
);
