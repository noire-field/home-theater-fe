import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    status: number;
    loading: boolean;
}

const initialState: AppState = {
    status: 0,
    loading: false
}

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        AppSetStatus(state, action: PayloadAction<number>) {
            state.status = action.payload;
        },
        AppSetLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
});

export const { AppSetStatus, AppSetLoading } = AppSlice.actions;
export default AppSlice.reducer;