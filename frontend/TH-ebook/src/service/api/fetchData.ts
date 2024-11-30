// src/service/api/fetchData.ts
import {api} from "../../utils/axiosInterceptors.ts";
import {AxiosResponse} from "axios";
import {ApiResponse} from "../../type/ApiResponse.ts";

const API_URL:string = import.meta.env.VITE_API_URL3;

export const fetchData = async <T>(endpoint: string) => {
  const response:AxiosResponse<ApiResponse<T>> = await api.get(`${API_URL}/${endpoint}`);
  return response.data;
};
