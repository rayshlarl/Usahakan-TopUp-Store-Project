import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// --> Pasang ini di route yang butuh autenteikasi token JWT
// headers: {
//     Authorization: `Bearer ${token}`;
//   }

//Get the dasboard data as categories & product
const getDashboardData = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}`);

  return response.data;
};

//Get the product items as the diamonds, uc, etc.
const getProductItems = async (category, product_name) => {
  const response = await axios(`${API_URL}/${category}/${product_name}`);
  return response.data;
};

//Get the user from the db user_db table
const sendUserData = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export { getDashboardData, getProductItems, sendUserData };
