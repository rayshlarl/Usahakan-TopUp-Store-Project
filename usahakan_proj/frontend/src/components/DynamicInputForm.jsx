const DynamicInputForm = ({
  inputFields = [],
  inputData = {},
  onInputChange,
  errors = {},
}) => {
  if (!inputFields || inputFields.length === 0) {
    return null;
  }

  const isSideBySide = inputFields.length === 2;

  return (
    <div className="w-full bg-white flex justify-center mt-10 p-5 rounded-2xl shadow-md">
      <div className="w-full max-w-xl">
        {isSideBySide ? (
          <div className="flex flex-col">
            <div className="flex">
              {inputFields.map((field, index) => (
                <input
                  key={field.field_name}
                  type={field.field_type || "text"}
                  placeholder={field.placeholder || field.field_label}
                  value={inputData[field.field_name] || ""}
                  onChange={(e) =>
                    onInputChange(field.field_name, e.target.value)
                  }
                  minLength={field.min_length}
                  maxLength={field.max_length}
                  className={`
                    px-4 py-3 shadow-sm outline-none transition-all
                    ${errors[field.field_name]
                      ? "border-2 border-red-500"
                      : "border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    }
                    ${index === 0
                      ? "flex-1 rounded-l-2xl"
                      : "w-1/3 rounded-r-2xl border-l-0"
                    }
                  `}
                />
              ))}
            </div>
            {/* Error messages untuk side by side */}
            <div className="flex mt-1">
              {inputFields.map((field, index) => (
                <div
                  key={`error-${field.field_name}`}
                  className={index === 0 ? "flex-1" : "w-1/3"}
                >
                  {errors[field.field_name] && (
                    <p className="text-red-500 text-xs">
                      {errors[field.field_name]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {inputFields.map((field) => (
              <div key={field.field_name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {field.field_label}
                </label>
                <input
                  type={field.field_type || "text"}
                  placeholder={field.placeholder || field.field_label}
                  value={inputData[field.field_name] || ""}
                  onChange={(e) =>
                    onInputChange(field.field_name, e.target.value)
                  }
                  minLength={field.min_length}
                  maxLength={field.max_length}
                  className={`w-full px-4 py-3 rounded-2xl shadow-sm outline-none transition-all
                    ${errors[field.field_name]
                      ? "border-2 border-red-500"
                      : "border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                    }
                  `}
                />
                {errors[field.field_name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[field.field_name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { DynamicInputForm };
