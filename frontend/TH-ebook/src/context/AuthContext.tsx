import React, {createContext, useState, useCallback, useContext} from "react";
import {useNavigate} from "react-router-dom";
import {User} from "../models/User";
import {authAPI} from "../service/api/authAPI";
import {AuthResponse} from "../type/AuthResponse.ts";

interface AuthContextType {
    user: User | null;
    token: string | null;
    signin: (usernameoremail: string, password: string) => Promise<AuthResponse>;
    logout: () => void;
    signup: (username: string, email: string, password: string, fistname: string, lastname: string, phone: string) => Promise<void>;
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

export const AuthProvider= ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") || "null")
    )
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const navigate = useNavigate();

    if (!token && !user) navigate("/auth/signin");
    const handleTokenResponse = (response: AuthResponse) => {
        if (response.success && response.token) {
            // Extract token if it's in Bearer format, otherwise use as is
            const actualToken = response.token.startsWith("Bearer ")
                ? response.token.split(" ")[1]
                : response.token;

            setToken(actualToken);
            localStorage.setItem("token", actualToken);

            if (response.user) {
                setUser(response.user);
                localStorage.setItem("user", JSON.stringify(response.user));
            }

            return actualToken;
        }
        return null;
    };
    const signin = async (usernameoremail: string, password: string) => {
        try {
            const response: AuthResponse = await authAPI.signIn(
                usernameoremail,
                password
            );
            handleTokenResponse(response);
            return response;
        } catch (error) {
            console.error("Signin failed:", error);
            throw error;
        }
    };

    const signup = async (username: string, email: string, password: string, fistname: string, lastname: string, phone: string) => {
        try {
            const response = await authAPI.signUp(username, email, password, fistname, lastname, phone);
            handleTokenResponse(response);
        } catch (error) {
            console.error("Signup failed:", error);
            throw error;
        }
    };

    const logout = useCallback(() => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Optionally navigate to signin page
        navigate("/auth/signin");
    }, [navigate]);

    const refreshToken = useCallback(async () => {
        try {
            const response: AuthResponse = await authAPI.refreshToken();
            const newToken = handleTokenResponse(response);
            if (!newToken) {
                throw new Error("Failed to refresh token");
            }
            return newToken;
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
    const value = {
        user,
        token,
        signin,
        logout,
        signup,
        refreshToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
