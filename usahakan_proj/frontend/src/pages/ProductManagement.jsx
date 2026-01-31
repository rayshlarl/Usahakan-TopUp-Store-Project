import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { PlusIcon, CubeTransparentIcon } from "@heroicons/react/24/solid";
import { createProduct, loadProductsAndCategory, updateProduct } from "../api";
import { getInputTypes } from "../api";
import { FormProductPortal } from "../components/portal/productPortal/productPortal";
import { ProductCard } from "../components/productCard";

// Main Component
const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [inputStyle, setInputStyle] = useState([]);
  const [showAddProductPortal, setShowAddProductPortal] = useState(false);
  const [showEditProductPortal, setShowEditProductPortal] = useState(false);

  // Submit add product handler
  const submitAddProduct = async (productData) => {
    const result = await createProduct(productData);
  };

  // Submit edit product handler
  const submitEditproduct = async (productData) => {
    const response = await updateProduct(productData);
    console.log("Jalan wok"); // TODO >>> update fetching
  };

  // Handler untuk hapus produk
  const handleDeleteProduct = (productId) => {
    console.log(productId);
  };

  //fetch the input types, categories - products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRespon = await loadProductsAndCategory();
        const inputTypesResponse = await getInputTypes();
        setInputStyle(inputTypesResponse.data);
        setProducts(dataRespon.result.rows);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category_name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});
  // console.log(groupedProducts);
  return (
    <>
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          {/* Page Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Produk Tersedia
              </h1>
              <p className="text-gray-500">Kelola produk digital Anda.</p>
            </div>
            <button
              onClick={() => setShowAddProductPortal(true)}
              className="flex items-center gap-2 bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 cursor-pointer"
            >
              <PlusIcon className="w-5 h-5" />
              <span className="font-medium">Tambah Produk</span>
            </button>
          </div>

          {/* Products by Category */}
          {Object.entries(groupedProducts).map(
            ([category, categoryProducts]) => (
              <div key={category} className="mb-8">
                {/* Category Header */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">
                    <CubeTransparentIcon className="w-5" />
                  </span>
                  <h2 className="text-lg font-bold text-gray-800">
                    {category}
                  </h2>
                </div>

                {/* Product Cards Grid */}
                <div className="bg-white rounded-2xl p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onEdit={() => {
                          setShowEditProductPortal(true);
                          setSelectedProduct(product);
                        }}
                        onDelete={handleDeleteProduct}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          )}

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Belum ada produk.</p>
              <button
                onClick={() => setShowAddProductPortal}
                className="mt-4 text-blue-500 hover:underline"
              >
                Tambah produk pertama
              </button>
            </div>
          )}
        </div>

        {showAddProductPortal && (
          <FormProductPortal
            onClose={() => setShowAddProductPortal(false)}
            onSubmit={submitAddProduct}
            categorys={groupedProducts}
            inputTypes={inputStyle}
            defaultValue={null}
            isEdit={false}
          />
        )}

        {showEditProductPortal && (
          <FormProductPortal
            onClose={() => setShowEditProductPortal(false)}
            onSubmit={submitEditproduct}
            categorys={groupedProducts}
            inputTypes={inputStyle}
            defaultValue={selectedProduct}
            isEdit={true}
          />
        )}
      </div>
    </>
  );
};

export { ProductManagement };
