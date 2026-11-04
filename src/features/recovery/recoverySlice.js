import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    step : 1,
    phone: '',
    codeSent: false,
    verified: false,
    error: '',
};

const recoverySlice = createSlice({
    name: 'recovery',
    initialState,
    reducers: {
        phoneSubmitted: (state, action) => {
            state.phone = action.payload;
            state.step = 2;
            state.codeSent = true;
            state.verified = false;
            state.error = '';
        },
        codeVerified: (state) => {
            state.verified = true;
            state.step = 3;
            state.error = '';
        },
        setRecoveryError: (state, action) => {
            state.error = action.payload;
        },
        resetRecovery: () => initialState,
    },
});

export const {
    phoneSubmitted,
    codeVerified,
    setRecoveryError,
    resetRecovery,
} = recoverySlice.actions;

export default recoverySlice.reducer;