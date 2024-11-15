import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/User.ts";
import {UserStateType} from "../../type/UserStateType.ts";

const initialState: UserStateType<User>= {
    user: null,
    isLogin: false,
    errors: '',
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signIn: (state: UserStateType<User>, {payload: user}: PayloadAction<User>) => {
            state.isLogin = false;
            state.errors = '';
        },
        signUp: (state: UserStateType<User>, {payload: user}: PayloadAction<User> ) => {
            state.isLogin = false;
            state.errors = '';
        },
        authSusccess: (state, {payload: user}: PayloadAction<User>) => {
            state.user = user;
            state.isLogin = true;
        },
        authFailure: (state, {payload: error}: PayloadAction<string>) => {
            state.errors = error
        }
     },
})

export const { signIn, signUp, authSusccess, authFailure} = userSlice.actions;

export default userSlice.reducer;