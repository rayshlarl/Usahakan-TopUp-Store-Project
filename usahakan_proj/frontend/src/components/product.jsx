import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDefaultData } from "../api/users_api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // --> Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDefaultData();
        setProducts(response.result.rows);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Group Product by category
  const productGroup = products.reduce((acc, product) => {
    const category = product.category_name;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {}); //

  return (
    <div className="h-full p-5">
      {Object.entries(productGroup).map(([categoryName, categoryProducts]) => (
        <div key={categoryName}>
          {/* Category Header */}
          <div className="p-2 flex items-center h-fit">
            <i className="fa-solid fa-angles-right text-xl mr-2"></i>
            <h1 className="font-bold text-xl">{categoryName}</h1>
          </div>

          {/* Product Cards */}
          <div className="h-full py-3 px-10 flex gap-5 flex-col md:flex-row md:flex-wrap">
            {categoryProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden cursor-pointer bg-gray-300 rounded-2xl w-40 h-67 flex justify-center hover:scale-105 transition-transform duration-200"
                onClick={() => navigate(`/${categoryName}/${product.name}`)}
              >
                <img
                  src={`/poster/${product.image}`}
                  alt={product.name}
                  className="w-[160px] h-[300px] mt-[-25px] object-cover object-top rounded-3xl"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Product };
