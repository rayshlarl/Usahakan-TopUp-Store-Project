import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard_data } from "../api/users_api";

const Product = () => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashboard_data();
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
                  className="cursor-pointer bg-gray-300 rounded-3xl w-40 h-67 flex justify-center cursor-pointer hover:scale-105 transition-transform duration-200"
                  onClick={() => navigate(`/${cat.name}/${product.name}`)}
                >
                  <div>
                    <img
                      src={
                        product.image ||
                        "https://item4gamer.com/wp-content/uploads/2022/11/mobile-legends-1.webp"
                      }
                      alt={product.name}
                      className="w-35 rounded-3xl pt-2"
                    />
                    <div className="flex justify-center items-center pt-2">
                      <p>{product.name}</p>
                    </div>
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
