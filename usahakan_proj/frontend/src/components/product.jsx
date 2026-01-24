import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDefaultData } from "../api/users_api";

const Product = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDefaultData();
        setCategory(response.categoryData);
        setProducts(response.productsData);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-full p-5">
      {category.map((cat) => (
        <div key={cat.id}>
          {/* Category Header */}
          <div className="p-2 flex items-center h-fit">
            <i className="fa-solid fa-angles-right text-xl mr-2"></i>
            <h1 className="font-bold text-xl">{cat.name}</h1>
          </div>
          <div className="h-full py-3 px-10 flex gap-5 flex-col md:flex-row md:flex-wrap">
            {products
              .filter((product) => product.category_id === cat.id)
              .map((product) => (
                <div
                  key={product.id}
                  className="overflow-hidden cursor-pointer bg-gray-300 rounded-2xl w-40 h-67 flex justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate(`/${cat.name}/${product.name}`)}
                >
                  <div>
                    <img
                      src={`/poster/${product.image}`}
                      alt={product.name}
                      className="w-[160px] h-[300px] mt-[-25px] object-cover object-top rounded-3xl"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export { Product };
