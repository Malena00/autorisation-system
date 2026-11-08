import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    name: '',
    phone: '+7 999 999-99-99',
    password: '1234567890',
    avatar: null,
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

        registerSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.password = action.payload.password;
            state.avatar = action.payload.avatar;
            state.rememberMe = false;
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

export const { loginSuccess, registerSuccess, passwordUpdated, logout } = authSlice.actions;

export default authSlice.reducer;