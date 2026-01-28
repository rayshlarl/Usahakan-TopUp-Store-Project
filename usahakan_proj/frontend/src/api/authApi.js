import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const sendUserData = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response.data;
};

export const getRegisterData = async (
  fullName,
  email,
  password,
  passwordConfirm
) => {
  const response = await axios.post(`${API_URL}/register`, {
    fullName,
    email,
    password,
    passwordConfirm,
  });
  return response.data;
};
