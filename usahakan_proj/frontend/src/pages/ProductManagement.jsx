import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/solid";
import { getCategoryProduct } from "../api";
import { useNavigate } from "react-router-dom";

// Product Card Component
const ProductCard = ({ product, onEdit, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/products/${product.name}`)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex gap-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={product.name}
        className="w-20 h-20 rounded-lg object-cover"
      />

      {/* Product Info */}
      <div className="flex-1">
        <span className="text-xs font-semibold text-blue-500 uppercase">
          {product.category}
        </span>
        <h3 className="font-bold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={(e) => {
              onDelete(product.id);
              e.stopPropagation();
            }}
            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <TrashIcon className="w-4 h-4" />
            <span className="text-sm">Hapus</span>
          </button>
          <button
            onClick={(e) => {
              onEdit(product.id);
              e.stopPropagation();
            }}
            className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 cursor-pointer"
          >
            <PencilIcon className="w-4 h-4" />
            <span className="text-sm">Ubah</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Component
const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  // Handler untuk tambah produk
  const handleAddProduct = () => {
    console.log("Tambah produk");
    // TODO: Implement add product modal/page
  };

  // Handler untuk edit produk
  const handleEditProduct = (productId) => {
    console.log("Edit produk:", productId);
    // TODO: Implement edit product modal/page
  };

  // Handler untuk hapus produk
  const handleDeleteProduct = (productId) => {
    const isConfirmed = confirm("Yakin mau hapus produk ini?");
    if (!isConfirmed) return;
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  //fetch the categories - products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataRespon = await getCategoryProduct();
        // console.log(dataRespon.result.rows);
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
              onClick={handleAddProduct}
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
                        onEdit={handleEditProduct}
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
                onClick={handleAddProduct}
                className="mt-4 text-blue-500 hover:underline"
              >
                Tambah produk pertama
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export { ProductManagement };
