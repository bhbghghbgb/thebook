// src/service/api/fetchData.ts
import axios from "axios";

const API_URL = import.meta.env.REACT_APP_API_URL;

export const fetchData = async (endpoint: string) => {
  const response = await axios.get(`${API_URL}/${endpoint}`);
  return response.data;
};
