// src/service/api/fetchData.ts
import axios from "axios";

export const fetchData = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
