import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// --> Pasang ini di route yang butuh autenteikasi token JWT
// const token = localStorage.getItem("token");
// headers: {
//     Authorization: `Bearer ${token}`;
//   }

//Get the default data as categories, product & items
const getDefaultData = async () => {
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

//Get the total items,product and category as count
const getDahsboardData = async () => {
  const response = await axios.get(`${API_URL}/dashboard`);
  return response.data;
};

//Get the orders data
const getOrdersData = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

//Get register Data
const getRegisterData = async (fullName, email, password, passwordConfirm) => {
  const response = await axios.post(`${API_URL}/register`, {
    fullName,
    email,
    password,
    passwordConfirm,
  });
  return response.data;
};

export {
  getDefaultData,
  getProductItems,
  sendUserData,
  getDahsboardData,
  getOrdersData,
  getRegisterData,
};
