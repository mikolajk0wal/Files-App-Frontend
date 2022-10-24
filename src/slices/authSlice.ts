import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../enums/UserType";

interface AuthState {
  userId: string | null;
  login: string | null;
  type: UserType | null;
  status: string;
}

const initialState: AuthState = {
  userId: null,
  login: null,
  type: null,
  status: "",
};

export interface SignInResponse {
  jwt: string;
  userId: string;
  login: string;
  type: UserType;
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("jwt");
      state.userId = null;
      state.login = null;
      state.type = null;
    },
    login: (state, action: PayloadAction<SignInResponse>) => {
      localStorage.setItem("jwt", action.payload.jwt);
      state.userId = action.payload.userId;
      state.login = action.payload.login;
      state.type = action.payload.type;
    },
  },
});

export const { logout, login } = authSlice.actions;

export default authSlice.reducer;
