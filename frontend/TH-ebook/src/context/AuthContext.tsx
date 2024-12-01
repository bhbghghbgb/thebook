/**
 *
 * Tạo context liên quan đến các thao tác cần phải xác thực người dùng trước khi thực hiện.
 * Muốn sử dụng context này, cần phải bọc toàn bộ ứng dụng trong AuthProvider.
 * lấy các context bằng cách sử dụng custom hook useAuth.
 *
 * */

import React, {createContext, useState, useCallback, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../models/User";
import {authAPI} from "../service/api/authAPI";
import {ApiResponse} from "../type/ApiResponse.ts";

interface AuthContextType {
    user: User | null;
    isAuth: boolean | null;
    signin: (usernameoremail: string, password: string) => Promise<ApiResponse<User>>;
    logout: () => void;
    signup: (username: string, email: string, password: string, fistname: string, lastname: string, phone: string) => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<ApiResponse<User>>;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    );
    const [isAuth, setAuth] = useState(user !== null);
    const navigate = useNavigate();

    const handleAuthSuccess = (response: ApiResponse<User>) => {
        if (!response.isError && response.data) {
            setAuth(true);
            if (response.data) {
                setUser(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return true;
        }
        return false;
    };
    const signin = async (usernameoremail: string, password: string) => {
        try {
            const response: ApiResponse<User> = await authAPI.signIn(
                usernameoremail,
                password
            );
            handleAuthSuccess(response);
            return response;
        } catch (error) {
            console.error("Signin failed:", error);
            throw error;
        }
    };

    const signup = async (username: string, email: string, password: string, fistname: string, lastname: string, phone: string) => {
        try {
            const response: ApiResponse<User> = await authAPI.signUp(username, email, password, fistname, lastname, phone);
            handleAuthSuccess(response);
            return response;
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        }
    };

    const logout = useCallback(async () => {
        setUser(null);
        localStorage.removeItem("user");
        // Optionally navigate to signin page
        const response = await authAPI.logout();
        console.info("Logout response:", response);
        navigate("/auth/signin");
    }, [navigate]);

    const refreshToken = useCallback(async () => {
        try {
            const response: ApiResponse<User> = await authAPI.refreshToken();
            const isCheck = handleAuthSuccess(response);
            if (!isCheck) {
                throw new Error("Failed to refresh token");
            }
            return isCheck;
        } catch (error) {
            console.error("Token refresh failed:", error);
            // Handle specific error cases
            if (error instanceof Error) {
                const errorMessage = error.message.toLowerCase();
                if (
                    errorMessage.includes("no refresh token") ||
                    errorMessage.includes("invalid refresh token") ||
                    errorMessage.includes("expired")
                ) {
                    logout();
                }
            } else {
                logout();
            }
            throw error;
        }
    }, [logout]);

    const changePassword = async (oldPassword: string, newPassword: string) => {
        try {
            const response: ApiResponse<User> = await authAPI.changePassword(oldPassword, newPassword);
            return response;
        } catch (error) {
            console.error("Change password failed:", error);
            throw error;
        }
    }
    const value = {
        user,
        isAuth,
        signin,
        logout,
        signup,
        changePassword,
        refreshToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
