
export type UserStateType<T>= {
    user: T | null;
    isLogin: boolean;
    errors: string;
}