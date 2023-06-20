import type { AxiosError } from "axios";
import { ASY_STATUS } from "@/constants";
import { storeTokens } from "@/utils/token";
import { loginFn } from "@/http/apis/auth-api";
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface User {
  phone: string;
  password: string;
}

export const loginUser = createAsyncThunk<any, User, { rejectValue: any }>(
  "login",
  async ({ phone, password }, { rejectWithValue }) => {
    try {
      const res = await loginFn("+61" + phone, password);
      return res.data;
    } catch (err: any) {
      const error: AxiosError<any> = err;
      if (!error.response) throw err;
      const { data } = error.response;
      return rejectWithValue(data);
    }
  }
);

export interface AuthState {
  isAuth: boolean;
  user: any;
  status: ASY_STATUS;
  error: any;
}

const initialState: AuthState = {
  isAuth: false,
  status: ASY_STATUS.IDLE,
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<AuthState["user"]>) => {
      const user = action.payload;
      state.user = user;
      if (user === null) {
        state.isAuth = false;
      } else {
        state.isAuth = true;
      }
    },
    setUpdateUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = Object.assign(state.user || {}, action.payload);
    },
  },
  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.status = ASY_STATUS.LOADING;
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { tokens, ...user } = payload;
      state.status = ASY_STATUS.IDLE;
      if (user) {
        state.user = user;
        state.isAuth = true;
        storeTokens(tokens);
        state.error = {};
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = ASY_STATUS.ERROR;
      if (action.payload) {
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

export const { setAuth, setUpdateUser } = authSlice.actions;

export default authSlice.reducer;
