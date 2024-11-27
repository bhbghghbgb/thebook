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
        // // Lấy access token từ localStorage
        // const token = localStorage.getItem("token");
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        // Đảm bảo withCredentials được set để gửi cookies
        config.withCredentials = true;
        return config;
    },
    (error) => {
        return Promise.reject({
            status: "error",
            statusCode: error.response?.status || 500,
            message: error.response?.data?.message || "Internal Server Error",
            metadata: error.response?.data?.metadata || {},
        });
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            (error.response?.status === 401 || error.response.message?.includes("TokenExpiredError"))&&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/refresh-token") && // Prevent infinite loop
            !originalRequest.url?.includes("/signin") // Prevent infinite loop
        ) {
            originalRequest._retry = true;
            try {
                // Gọi API refresh token - refreshToken sẽ được gửi tự động qua cookies
                const response: AxiosResponse<AuthResponse> = await api.post(
                    "/refresh-token"
                );
                const data: AuthResponse = response.data;
                const newToken = data.token.startsWith("Bearer ")
                    ? data.token.split(" ")[1]
                    : data.token;
                if (newToken) {
                    
                    /* // Lưu token mới vào localStorage
                    localStorage.setItem("token", newToken);
                    // Cập nhật token trong header của request ban đầu
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    // Thử lại request ban đầu với token mới */

                    return axios(originalRequest);
                }
            } catch (refreshError: unknown) {
                console.error("Token refresh failed:", refreshError);
                // Xóa token khi refresh thất bại
                // localStorage.removeItem("token");
                // Có thể thêm logic redirect đến trang login ở đây
                return Promise.reject({
                    status: "error",
                    statusCode: refreshError.response?.status || 500,
                    message:
                        refreshError.response?.data?.message || "Internal Server Error",
                    metadata: refreshError.response?.data?.metadata || {},
                });
            }
        }

        return Promise.reject({
            status: "error",
            statusCode: error.response?.status || 500,
            message: error.response?.data?.message || "Internal Server Error",
            metadata: error.response?.data?.metadata || {},
        });
    }
);

/*

Promise.reject:

This method returns a Promise that is rejected with the given reason. In this case, the reason is an object containing error details.
Error Object:

The object passed to Promise.reject contains several properties to provide detailed information about the error:
status: A string indicating the status of the response. Here, it is set to "error".
statusCode: The HTTP status code of the error response. It uses optional chaining (?.) to safely access error.response.status. If error.response or error.response.status is undefined, it defaults to 500 (Internal Server Error).
message: The error message from the response. It uses optional chaining to access error.response.data.message. If error.response.data or error.response.data.message is undefined, it defaults to "Internal Server Error".
metadata: Additional metadata from the error response. It uses optional chaining to access error.response.data.metadata. If error.response.data or error.response.data.metadata is undefined, it defaults to an empty object {}.


*/
