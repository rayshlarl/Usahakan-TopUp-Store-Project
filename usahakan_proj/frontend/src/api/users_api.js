import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getDashboard_data = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

const getProductItems = async (category, product_name) => {
  const response = await axios(`${API_URL}/${category}/${product_name}`);
  return response.data;
};

export { getDashboard_data, getProductItems };
