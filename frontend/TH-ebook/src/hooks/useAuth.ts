import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../service/api/authAPI';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    const { user, token, login, logout, signup, refreshToken } = context;

    const signIn = async (email: string, password: string) => {
        try {
            const response = await authAPI.signIn(email, password);
            if (response.success) {
                login(email, password);
            }
        } catch (error) {
            console.error('Sign in failed', error);
        }
    };

    const signUp = async (username: string, email: string, password: string) => {
        try {
            const response = await authAPI.signUp(username, email, password);
            if (response.success) {
                login(email, password);
            }
        } catch (error) {
            console.error('Sign up failed', error);
        }
    };

    return { user, token, signIn, logout, signUp, refreshToken };
};
