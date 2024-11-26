import {AxiosResponse} from 'axios';
import {AuthResponse} from "../../type/AuthResponse.ts";
import {api} from "../../utils/axiosInterceptors.ts";
import {User} from "../../models/User.ts";
const endpoint = "signin";
const endpoint2 = "signup";
const refreshEndpoint = "refresh-token";

// Create an axios instance with default config


export const authAPI = {
    signIn: async (usernameoremail: string, password: string) => {
        try {
            const response:AxiosResponse<AuthResponse> = await api.post(`/${endpoint}`, {
                usernameoremail, 
                password
            });
            return response.data;
        } catch (error: unknown) {
            console.error('Signin failed', error);
            throw new Error((error as Error).message || 'Signin failed');
        }
    },
    signUp: async (username: string, email: string, password: string, fistName: string, lastname: string, phone: string) => {
        try {
            console.log({
                fistName,
                lastname,
                username,
                email,
                password,
                phone
            })
            const response = await api.post(`/${endpoint2}`, {
                fistName,
                lastname,
                username,
                email,
                password,
                phone
            });
            return response.data;
        } catch (error: unknown) {
            throw new Error((error as Error).message || 'Signup failed');
        }
    },
    refreshToken: async () => {
        try {
            const response:AxiosResponse<AuthResponse> = await api.post(`/${refreshEndpoint}`);
            return response.data;
        } catch (error: unknown) {
            throw new Error((error as Error).message || 'Refresh token failed');
        }
    }
}
