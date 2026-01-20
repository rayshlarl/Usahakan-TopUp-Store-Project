import SideBar from "../components/Sidebar";
import { Header } from "../components/Header";
import { DynamicInputForm } from "../components/DynamicInputForm";
import { getProductItems } from "../api/users_api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useCart } from "../store/CartContext";

const ProductDetails = () => {
  const { addToCart } = useCart();

  const [productItems, setProductItems] = useState([]);
  const [inputFields, setInputFields] = useState([]);
  const [inputData, setInputData] = useState({});
  const [errors, setErrors] = useState({});
  const { category, id } = useParams(); // -> get url

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductItems = async () => {
      try {
        const response = await getProductItems(category, id);

        if (!response.packages?.length) {
          navigate("/");
        }

        setProductItems(response.packages);

        const fields = response.inputFields || [];
        setInputFields(fields);

        const initialData = {};
        fields.forEach((field) => {
          initialData[field.field_name] = "";
        });
        setInputData(initialData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProductItems();
  }, [category, id]);

  const handleInputChange = (fieldName, value) => {
    setInputData((prev) => ({ ...prev, [fieldName]: value }));
  };

  const validateInputs = () => {
    const newErrors = {};

    for (const field of inputFields) {
      const value = inputData[field.field_name] || "";

      if (!value.trim()) {
        newErrors[field.field_name] = `${field.field_label} wajib diisi`;
      } else if (field.min_length && value.length < field.min_length) {
        newErrors[field.field_name] = `Minimal ${field.min_length} karakter`;
      } else if (field.max_length && value.length > field.max_length) {
        newErrors[field.field_name] = `Maksimal ${field.max_length} karakter`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddToCart = (item) => {
    if (!validateInputs()) return;

    addToCart({
      id: item.id,
      name: item.name,
      product: id,
      category: category,
      price: item.price,
      icon: item.icon,
      inputData: { ...inputData },
      inputFields: inputFields,
    });

    alert("Berhasil ditambahkan ke keranjang!");
  };

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        {/* <SideBar /> */}
        <div className="flex-1">
          <Header />
          <div className="flex justify-center min-h-screen p-8">
            <div className="w-full max-w-5xl flex items-center flex-col">
              {/* Banner */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-full h-48 flex justify-center items-center rounded-2xl shadow-lg">
                <h1 className="text-white text-2xl font-bold">{id}</h1>
              </div>

              {/* Dynamic Input Form */}
              <DynamicInputForm
                inputFields={inputFields}
                inputData={inputData}
                onInputChange={handleInputChange}
                errors={errors}
              />

              {/* Product Items Grid */}
              <div className="w-full p-6 mt-5 bg-white rounded-xl shadow-md">
                <h2 className="text-lg font-bold mb-4">Pilih Nominal</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {productItems.map((item, index) => (
                    <div
                      key={index}
                      className="rounded-xl overflow-hidden shadow-md bg-white border border-blue-300 hover:shadow-lg hover:-translate-y-2 transition-all duration-200 flex flex-col"
                    >
                      {/* Title */}
                      <div className="text-center py-3 px-2 min-h-[60px] flex items-center justify-center">
                        <p className="text-gray-800 font-bold text-sm">
                          {item.name}
                        </p>
                      </div>

                      {/* Image */}
                      <div className="flex items-center justify-center py-4 flex-1">
                        <img
                          src={
                            item.icon ||
                            "https://tse1.mm.bing.net/th/id/OIP.fbSKtSY1fCpz0IlYeoAB_AHaGU?rs=1&pid=ImgDetMain&o=7&rm=3"
                          }
                          alt={item.name}
                          className="w-12 h-12 object-contain"
                        />
                      </div>

                      {/* Price & Stock */}
                      <div className="bg-gray-50 py-3 mt-auto">
                        <p className="text-gray-400 text-xs text-right px-3">
                          Cuma
                        </p>
                        <p className="text-red-500 font-bold text-right px-3">
                          Rp {item.price.toLocaleString()}
                        </p>

                        {/* Stock */}
                        <div className="flex items-center justify-center gap-1 mt-2 text-gray-500 text-xs">
                          <i className="fa-solid fa-box"></i>
                          <span>Stok: {item.stock}</span>
                        </div>
                      </div>

                      {/* Add to Cart Button */}
                      <button
                        className="cursor-pointer w-full bg-blue-500 text-white py-2 font-semibold text-sm hover:bg-blue-600 transition-colors"
                        onClick={() => handleAddToCart(item)}
                      >
                        <i className="fa-solid fa-cart-plus mr-2"></i>
                        Tambah
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductDetails };
