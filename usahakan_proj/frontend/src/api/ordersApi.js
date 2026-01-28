import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getOrdersData = async () => {
  const response = await axios.get(`${API_URL}/orders`);
  return response.data;
};

export const createOrder = async (formData) => {
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

export const updateOrder = async (invoiceCode, actions) => {
  try {
    const response = await axios.post(`${API_URL}/orders`, {
      invoiceCode,
      actions,
    });
    return response.data;
  } catch (err) {
    console.error("Gagal update:", err);
    throw err;
  }
};
