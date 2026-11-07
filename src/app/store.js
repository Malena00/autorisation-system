import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import recoveryReducer from '../features/recovery/recoverySlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        recovery: recoveryReducer,
    },
});