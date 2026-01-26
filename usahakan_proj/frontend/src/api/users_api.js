import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getUploadUrl = (folder, filename) => {
  return `${API_URL}/${folder}/${filename}`;
};

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
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

//Create a new order (with file upload)
const createOrder = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/cart`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

//Update orders
const updateOrder = async (invoiceCode, actions) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, {
      invoiceCode,
      actions,
    });
    return response.data;
  } catch (err) {
    console.error("gagal updates :", err);
    throw err;
  }
};

// Products Management
const getCategoryProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export {
  getDefaultData,
  getProductItems,
  sendUserData,
  getDahsboardData,
  getOrdersData,
  getRegisterData,
  createOrder,
  updateOrder,
  getUploadUrl,
  getCategoryProduct,
};
