import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import { filesApi } from '../services/files';
import { authApi } from '../services/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(filesApi.middleware, authApi.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
