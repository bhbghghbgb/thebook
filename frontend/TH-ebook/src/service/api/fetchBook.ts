// src/service/api/fetchData.ts
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL2;

export const fetchBook = async (endpoint: string) => {
  const response = await axios.get(`${API_URL}/${endpoint}`);
  return response.data;
};
