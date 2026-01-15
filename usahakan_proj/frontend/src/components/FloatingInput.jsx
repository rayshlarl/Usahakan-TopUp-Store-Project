const FloatingInput = ({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
}) => {
    return (
        <div className="relative">
            <label className="absolute -top-2.5 left-4 bg-white px-2 text-sm font-medium text-gray-700 z-10">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
        </div>
    );
};

export { FloatingInput };
