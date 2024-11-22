import React, {createContext, useState, useEffect, useCallback, useContext} from 'react';
import axios from 'axios';
import { User } from '../models/User';
import setupAxiosInterceptors from '../utils/axiosInterceptors';

interface AuthContextType {
    user: User | null;
    token: string | null;
    signin: (email: string, password: string) => Promise<void>;
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

    useEffect(() => {
        const fetchUser = async () => {
            if (token) {
                try {
                    const response = await axios.get('/api/user', {
                        headers: { Authorization: token }
                    });
                    setUser(response.data.user);
                } catch (error) {
                    console.error('Failed to fetch user', error);
                    logout();
                }
            }
        };

        fetchUser().then(r => r);
    }, [token]);

    const signin = async (email: string, password: string) => {
        try {
            const response = await axios.post('/signin', { email, password });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
            }
        } catch (error) {
            console.error('Signin failed', error);
        }
    };

    const signup = async (username: string, email: string, password: string) => {
        try {
            const response = await axios.post('/signup', { username, email, password });
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                setUser(response.data.user);
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
            const response = await axios.post('/refresh-token');
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
            }
        } catch (error) {
            console.error('Refresh token failed', error);
            logout();
        }
    }, []);

    useEffect(() => {
        setupAxiosInterceptors(refreshToken);
    }, [refreshToken]);

    return (
        <AuthContext.Provider value={{ user, token, signin, logout, signup, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};
