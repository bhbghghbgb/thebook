import React, { createContext, useState, useEffect, useCallback, useContext } from 'react';
import { User } from '../models/User';
import { authAPI } from '../service/api/authAPI';
import setupAxiosInterceptors from '../utils/axiosInterceptors';

interface AuthContextType {
    user: User | null;
    token: string | null;
    signin: (usernameoremail: string, password: string) => Promise<void>;
    logout: () => void;
    signup: (username: string, email: string, password: string) => Promise<void>;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

    const signin = async (usernameoremail: string, password: string) => {
        try {
            const response = await authAPI.signIn(usernameoremail, password);
            if (response.success) {
                setToken(response.token);
                localStorage.setItem('token', response.token);
                setUser(response.user);
            }
        } catch (error) {
            console.error('Signin failed', error);
        }
    };

    const signup = async (username: string, email: string, password: string) => {
        try {
            const response = await authAPI.signUp(username, email, password);
            if (response.success) {
                setToken(response.token);
                localStorage.setItem('token', response.token);
                setUser(response.user);
            }
        } catch (error) {
            console.error('Signup failed', error);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
    };

    const refreshToken = useCallback(async () => {
        try {
            const response = await authAPI.refreshToken(token || '');
            if (response.success) {
                setToken(response.token);
                localStorage.setItem('token', response.token);
            }
        } catch (error) {
            console.error('Refresh token failed', error);
            logout();
        }
    }, [token]);

    useEffect(() => {
        setupAxiosInterceptors(refreshToken);
    }, [refreshToken]);

    return (
        <AuthContext.Provider value={{ user, token, signin, logout, signup, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};
