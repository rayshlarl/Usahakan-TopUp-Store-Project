const UserInfoSection = ({ groupedByProduct }) => {
    return (
        <>
            {groupedByProduct.map((productGroup, productIndex) => (
                <div key={productIndex} className="space-y-3">
                    <p className="font-semibold text-gray-800">{productGroup.product}</p>

                    {productGroup.inputs.map((input, inputIndex) => (
                        <div key={inputIndex} className="bg-gray-50 rounded-xl p-4">
                            <div className="grid grid-cols-2 gap-4">
                                {input.inputFields?.map((field, fieldIndex) => (
                                    <div key={fieldIndex}>
                                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                                            {field.field_label}
                                        </p>
                                        <p className="text-gray-800 font-medium">
                                            {input.inputData?.[field.field_name] || "-"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default UserInfoSection;
