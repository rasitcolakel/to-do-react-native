import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  toggleSnackbar: false,
  snackbarMessage: "null",
  type: "error",
};
const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: initialState,
  reducers: {
    close(state) {
      state.toggleSnackbar = false;
      state.snackbarMessage = null;
      state.type = "success";
    },
    open(state, action) {
      state.toggleSnackbar = true;
      state.snackbarMessage = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const snackbarReducer = snackbarSlice.reducer;
export const snackbarActions = snackbarSlice.actions;
