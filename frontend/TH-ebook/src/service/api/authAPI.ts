import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL2;
const endpoint = "/signin";
const endpoint2 = "/signup";
export const authAPI = {
    signIn: async (nameoremail: string, password: string) => {
        try {
            const response = await axios.post(`${API_URL}/${endpoint}`, {nameoremail, password});
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
    }
}