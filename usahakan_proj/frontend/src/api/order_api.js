import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Create a new order
 * @param {Object} orderData - The order data to submit
 * @returns {Promise} - The response from the server
 */
export const createOrder = async (orderData) => {
    try {
        const response = await axios.post(`${API_URL}/api/orders/create`, orderData);
        return response.data;
    } catch (err) {
        console.error("Error creating order:", err);
        throw err;
    }
};
