import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL2;
const endpoint = "signin";
const endpoint2 = "signup";
const refreshEndpoint = "refresh-token";

export const authAPI = {
    signIn: async (usernameoremail: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/${endpoint}`, {usernameoremail, password});
            return response.data;
        } catch (error: unknown) {
            throw new Error((error as Error).message || 'Login failed');
        }
    },
    signUp: async (username: string, password: string, email: string) => {
        try {
            const response = await axios.post(`${API_URL}/${endpoint2}`, {username, password, email});
            return response.data;
        } catch (error: unknown) {
            throw new Error((error as Error).message || 'Register failed');
        }
    },
    refreshToken: async (refreshToken: string) => {
        try {
            const response = await axios.post(`${API_URL}/${refreshEndpoint}`, {refreshToken});
            return response.data;
        } catch (error: unknown) {
            throw new Error((error as Error).message || 'Refresh token failed');
        }
    }
}
