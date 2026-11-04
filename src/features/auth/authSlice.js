import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    phone: '+7 999 999-99-99',
    password: '1234567890',
    rememberMe: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.phone = action.payload.phone;
            state.rememberMe = action.payload.rememberMe;
        },

        passwordUpdated: (state, action) => {
            state.password = action.payload;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.rememberMe = false;
        },
    },
});

export const { loginSucces, logoout } = authSlice.actions;

export default authSlice.reducer;