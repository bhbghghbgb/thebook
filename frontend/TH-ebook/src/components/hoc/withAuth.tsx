import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from '../../models/User';
import {useAuth} from "../../context/AuthContext.tsx";

const withAuth = (WrappedComponent: React.ComponentType<React.PropsWithChildren<{ user: User }>>) => {


    /* 
    
    
    Record<string, unknown>: Đây là một type generic của TypeScript, đại diện cho một đối
    tượng mà các key của nó là kiểu string và các value có thể là bất kỳ kiểu nào (unknown).
    Trong trường hợp này, nó được sử dụng để định nghĩa rằng props có thể chứa bất kỳ số 
    lượng prop nào với tên là kiểu string và giá trị có thể là bất kỳ kiểu dữ liệu nào.

    
    
    */


    return (props: React.PropsWithChildren<Record<string, unknown>>) => {
        const {user, token, refreshToken} = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                if (!token) {
                    navigate('/auth/signin');
                }
            }
            checkAuth().then(r => `Checked auth: ${r}`);
        }, [token, navigate, refreshToken]);


        if (!token) {
            return null;
        }

        if (!user) {
            return null;
        }

        return <WrappedComponent {...props} user={user}/>;
    };
};

export default withAuth;
