import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import AppReducer from './App.slice';
import UserReducer from './User.slice';
import ShowReducer from './Show.slice';

export const store = configureStore({
    reducer: {
        app: AppReducer,
        user: UserReducer,
        show: ShowReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAllDispatch = () => useDispatch<AppDispatch>();