import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string | null;
  login: string | null;
  status: string;
}

const initialState: AuthState = {
  userId: null,
  login: null,
  status: '',
};

export interface SignInResponse {
  jwt: string;
  userId: string;
  login: string;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('jwt');
      state.userId = null;
      state.login = null;
    },
    login: (state, action: PayloadAction<SignInResponse>) => {
      localStorage.setItem('jwt', action.payload.jwt);
      state.userId = action.payload.userId;
      state.login = action.payload.login;
    },
  },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
