import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  token: null, //localStorage.getItem("todoToken"),
  isAuth: false, //!!localStorage.getItem("todoToken"),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
      //localStorage.setItem("todoToken", action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isAuth = false;
      //localStorage.removeItem("todoToken");
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
