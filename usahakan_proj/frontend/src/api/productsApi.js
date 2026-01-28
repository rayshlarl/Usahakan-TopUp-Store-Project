import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getDefaultData = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

export const getProductItems = async (category, product_name) => {
  const response = await axios.get(`${API_URL}/${category}/${product_name}`);
  return response.data;
};

export const getCategoryProduct = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getItemByProductName = async (productName) => {
  try {
    const response = await axios.post(`${API_URL}/products/${productName}`, {
      productName,
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteItemById = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/products/item/${itemId}`);
  } catch (err) {
    console.error(err);
  }
};

export const createItem = async (itemData) => {
  try {
    // console.log(itemData);
    const { file, fileName, ...restData } = itemData;

    const formData = new FormData();
    formData.append("itemData", JSON.stringify(restData));
    if (file) {
      formData.append("icon", file);
    }
    const response = await axios.post(`${API_URL}/products/item`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getUploadUrl = (folder, filename) => {
  return `${API_URL}/${folder}/${filename}`;
};
