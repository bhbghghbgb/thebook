/**
 *
 *
 * HOC này dùng để bọc các component cần lấy các thông tin được protected như user, ... .
 *
 * */


import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from '../../models/User';
import {useAuth} from "../../context/AuthContext.tsx";
import {api} from "../../utils/axiosInterceptors.ts";
import LoadingSpinner from "../_Common/LoadingSpinner.tsx";

interface WithAuthProps {
    user: User;
}

const fetchUser = async () => {
    try {
        // await phải nằm trong 1 async function
        const response = await api.get('/profile')
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        return null;
    }
};

/**
 *
 *
 * nếu P extends WithAuthProps, thì tất cả các component được bọc bởi
 * withAuth phải có kiểu props tương tự như WithAuthProps. Điều này có nghĩa là các
 * component đó phải có các props user, token, và refreshToken.
 *
 *
 * */
const withAuth = <P extends WithAuthProps>(
    WrappedComponent: React.ComponentType<P>
) => {
    return (props: Omit<P, keyof WithAuthProps>) => {
        const {isAuth} = useAuth();
        const navigate = useNavigate();
        const [user, setUser] = useState<User | null>(null);

        useEffect(() => {
            const checkAuth = async () => {
                if (!isAuth) {
                    navigate('/auth/signin');
                } else {
                    const fetchedUser = await fetchUser();
                    if (fetchedUser) {
                        setUser(fetchedUser);
                    } else {
                        navigate('/auth/signin');
                    }
                }
            };
            checkAuth().then(r => `User is ${r}`);
        }, [isAuth, navigate]);

        if (!user) {
            return <LoadingSpinner isLoading={true} />;
        }

        const componentProps = {
            ...props,
            user: user,
        } as P;

        return <WrappedComponent {...componentProps} />;
    };
};

export default withAuth;
