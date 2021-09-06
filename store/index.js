import { configureStore } from "@reduxjs/toolkit";
import { snackbarReducer } from "./snackbar";
import { authReducer } from "./auth";
import { todosReducer } from "./todos";

export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    auth: authReducer,
    todos: todosReducer,
  },
});
