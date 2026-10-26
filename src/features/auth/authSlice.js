import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    phone: null,
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

        logout: (state) => {
            state.isAuthenticated = false;
            state.phone = null;
            state.rememberMe = false;
        },
    },
});

export const { loginSucces, logoout } = authSlice.actions;

export default authSlice.reducer;