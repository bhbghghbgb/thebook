import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../models/User.ts";

const initialState: {users: User[]; isLogin: boolean}= {
    users: [],
    isLogin: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addUser: (state, action: { payload: User }) => {
            state.users.push(action.payload);
        },

        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
    },
})

export const { addUser } = userSlice.actions;
export const { setIsLogin } = userSlice.actions;

export default userSlice.reducer;