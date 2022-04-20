import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    loggedIn: boolean;
    isAdmin: boolean;
    lang: string;
}

const initialState: UserState = {
    loggedIn: false,
    isAdmin: false,
    lang: 'en'
}

export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        UserSetLogin(state, action: PayloadAction<UserSetLoginState>) {
            state.loggedIn = action.payload.loggedIn;
            state.isAdmin = action.payload.isAdmin;
        },
        UserSetLang(state, action: PayloadAction<string>) {
            state.lang = action.payload;
        }
    }
});

export const { UserSetLogin, UserSetLang } = UserSlice.actions;

// Interface
export interface UserSetLoginState {
    loggedIn: boolean;
    isAdmin: boolean;
}

// Export
export default UserSlice.reducer;