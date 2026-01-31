import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// --> Load products and category
export const loadProductsAndCategory = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

//                                                                    <== item fetch section

// --> load item based on cate and prod
export const getProductItems = async (category, product_name) => {
  const response = await axios.get(`${API_URL}/${category}/${product_name}`);
  return response.data;
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

export const updateItem = async (itemData) => {
  console.log(itemData.itemId);
  try {
    const { file, filename, iconData, ...restData } = itemData;
    const formData = new FormData();

    formData.append("itemData", JSON.stringify({ ...restData, iconData }));
    if (file) {
      formData.append("icon", file);
    }
    const response = await axios.put(
      `${API_URL}/products/updateItem/${itemData.itemId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//                                                                        <== products fetch section

//create new product
export const createProduct = async (productData) => {
  try {
    const { file, fileName, ...restData } = productData;

    const formData = new FormData();
    formData.append("productData", JSON.stringify(restData));
    if (file) {
      formData.append("thumbnails", file);
    }
    const response = await axios.post(`${API_URL}/products`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

//update Product
//update Product
export const updateProduct = async (productData) => {
  try {
    const { file, filename, ...restData } = productData;

    const formData = new FormData();
    formData.append("productData", JSON.stringify(restData));
    if (file) {
      formData.append("thumbnails", file);
    }
    const response = await axios.put(
      `${API_URL}/updateProduct/${productData.id}`,
      formData, //
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const getUploadUrl = (folder, filename) => {
  return `${API_URL}/${folder}/${filename}`;
};
