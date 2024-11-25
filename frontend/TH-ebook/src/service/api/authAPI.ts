import {AxiosResponse} from 'axios';
import {AuthResponse} from "../../type/AuthResponse.ts";
import {api} from "../../utils/axiosInterceptors.ts";
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
    signUp: async (username: string, password: string, email: string) => {
        try {
            const response = await api.post(`/${endpoint2}`, {
                username, 
                password, 
                email
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
