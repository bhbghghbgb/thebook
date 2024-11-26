import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {User} from '../../models/User';
import {useAuth} from "../../context/AuthContext.tsx";

interface WithAuthProps {
    user: User;
}

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

    /* 
    
    
    Record<string, unknown>: Đây là một type generic của TypeScript, đại diện cho một đối
    tượng mà các key của nó là kiểu string và các value có thể là bất kỳ kiểu nào (unknown).
    Trong trường hợp này, nó được sử dụng để định nghĩa rằng props có thể chứa bất kỳ số 
    lượng prop nào với tên là kiểu string và giá trị có thể là bất kỳ kiểu dữ liệu nào.

    
    
    */


    return (props: Omit<P, keyof WithAuthProps>) => {
        const {user, token} = useAuth();
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                if (!token) {
                    navigate('/auth/signin');
                }
            }
            checkAuth().then(r => `Checked auth: ${r}`);
        }, [token, navigate]);


        if (!token) {
            return null;
        }

        if (!user) {
            return null;
        }

        const componentProps = {
            ...props,
            user: user,
        } as P;

        return <WrappedComponent {...componentProps}  />;
    };
};

export default withAuth;
