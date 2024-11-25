import axios, {AxiosResponse} from "axios";
import {AuthResponse} from "../type/AuthResponse.ts";

const API_URL = import.meta.env.VITE_API_URL2;
// Create an axios instance with default config
export const api = axios.create({
    baseURL: API_URL,
});

// Set default configs for all axios requests
api.defaults.withCredentials = true;
api.defaults.headers.common["Content-Type"] = "application/json";

// Request interceptor
api.interceptors.request.use(
    (config) => {
        // Lấy access token từ localStorage
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        // Đảm bảo withCredentials được set để gửi cookies
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/refresh-token")
        ) {
            originalRequest._retry = true;
            try {
                // Gọi API refresh token - refreshToken sẽ được gửi tự động qua cookies
                const response: AxiosResponse<AuthResponse> = await axios.post("/refresh-token");
                const data: AuthResponse = response.data;
                const newToken = data.token.startsWith("Bearer ")
                    ? data.token.split(" ")[1]
                    : data.token;
                if (newToken) {
                    // Lưu token mới vào localStorage
                    localStorage.setItem("token", newToken);
                    // Cập nhật token trong header của request ban đầu
                    originalRequest.headers.Authorization = newToken;
                    // Thử lại request ban đầu với token mới
                    return axios(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // Xóa token khi refresh thất bại
                localStorage.removeItem("token");
                // Có thể thêm logic redirect đến trang login ở đây
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
