import { authActions } from "./auth";
import { snackbarActions } from "./snackbar";
import { todosActions } from "./todos";
import axios from "axios";
import store from "./index";
import { API_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const login = (params) => {
  return async (dispatch) => {
    dispatch(snackbarActions.open({ message: "Logging in...", type: "info" }));
    try {
      const res = await axios.post(API_URL + "login", params);
      await dispatch(
        authActions.login({
          token: res.data.token,
          isAuth: true,
        })
      );
      await AsyncStorage.setItem("todoToken", res.data.token);
      await dispatch(
        snackbarActions.open({
          message: res.data.message,
          type: "success",
        })
      );
    } catch (e) {
      if (e.response)
        dispatch(
          snackbarActions.open({
            message: e.response.data.message,
            type: "error",
          })
        );
      else
        dispatch(
          snackbarActions.open({
            message: "Unexpected server error",
            type: "error",
          })
        );
    }
  };
};

export const register = (params) => {
  return async (dispatch) => {
    dispatch(snackbarActions.open({ message: "Registering...", type: "info" }));
    try {
      const res = await axios.post(API_URL + "register", params);
      dispatch(
        snackbarActions.open({
          message: res.data.message,
          type: "success",
        })
      );
    } catch (e) {
      if (e.response)
        dispatch(
          snackbarActions.open({
            message: e.response.data.message,
            type: "error",
          })
        );
      else
        dispatch(
          snackbarActions.open({
            message: "Unexpected server error",
            type: "error",
          })
        );
    }
  };
};

export const getTodos = (params) => {
  return async (dispatch) => {
    let auth = store.getState().auth;
    try {
      const res = await axios.get(API_URL + "todos", {
        headers: {
          "x-auth-token": auth.token,
        },
      });
      dispatch(todosActions.setTodos({ data: res.data }));
    } catch (e) {
      if (e.response)
        dispatch(
          snackbarActions.open({
            message: e.response.data.message,
            type: "error",
          })
        );
      else
        dispatch(
          snackbarActions.open({
            message: "Unexpected server error",
            type: "error",
          })
        );
    }
  };
};

export const updateTodos = (params) => {
  return async (dispatch) => {
    let auth = store.getState().auth;
    await dispatch(
      snackbarActions.open({
        message: "Updating to do...",
        type: "info",
      })
    );
    try {
      const { _id } = params;
      delete params._id;
      const res = await axios.put(API_URL + "todos/" + _id, params, {
        headers: {
          "x-auth-token": auth.token,
        },
      });
      await dispatch(todosActions.updateTodos({ data: res.data }));
      await dispatch(
        snackbarActions.open({
          message: "To do updated...",
          type: "success",
        })
      );
    } catch (e) {
      if (e.response)
        dispatch(
          snackbarActions.open({
            message: e.response.data.message,
            type: "error",
          })
        );
      else
        dispatch(
          snackbarActions.open({
            message: "Unexpected server error",
            type: "error",
          })
        );
    }
  };
};
export const deleteTodos = (params) => {
  return async (dispatch) => {
    await dispatch(
      snackbarActions.open({
        message: "Deleting the todo...",
        type: "info",
      })
    );
    let auth = store.getState().auth;
    try {
      const { _id } = params;
      const res = await axios.delete(API_URL + "todos/" + _id, {
        headers: {
          "x-auth-token": auth.token,
        },
      });
      await dispatch(todosActions.deleteTodo({ data: res.data }));
      await dispatch(
        snackbarActions.open({
          message: "To do deleted...",
          type: "success",
        })
      );
    } catch (e) {
      if (e.response)
        dispatch(
          snackbarActions.open({
            message: e.response.data.message,
            type: "error",
          })
        );
      else
        dispatch(
          snackbarActions.open({
            message: "Unexpected server error",
            type: "error",
          })
        );
    }
  };
};
export const newTodo = (params) => {
  return async (dispatch) => {
    let auth = store.getState().auth;
    await dispatch(
      snackbarActions.open({
        message: "Adding new to do...",
        type: "info",
      })
    );
    try {
      const res = await axios.post(API_URL + "todos", params, {
        headers: {
          "x-auth-token": auth.token,
        },
      });
      await dispatch(todosActions.newTodo({ data: res.data }));
      await dispatch(
        snackbarActions.open({
          message: "New to do added...",
          type: "success",
        })
      );
    } catch (e) {
      dispatch(
        snackbarActions.open({
          message: e.response.data.message,
          type: "error",
        })
      );
    }
  };
};
