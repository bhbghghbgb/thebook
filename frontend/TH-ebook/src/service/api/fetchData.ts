// src/service/api/fetchData.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const fetchData = async (endpoint: string) => {
  const response = await axios.get(`${API_URL}${endpoint}`);
  return response.data;
};