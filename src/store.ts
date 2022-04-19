import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import AppReducer from './App.slice';

export const store = configureStore({
    reducer: {
        app: AppReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAllDispatch = () => useDispatch<AppDispatch>();