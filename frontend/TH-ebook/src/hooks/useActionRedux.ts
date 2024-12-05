import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {Action} from "@reduxjs/toolkit";

export const useActionRedux = (action:Action, value?:string) => {
    const dispatch = useDispatch();
    return useMemo(() => dispatch(action(value)), [dispatch, action, value]);
};