import { createSlice } from "@reduxjs/toolkit";
let initialState = { data: [] };
const todosSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    setTodos(state, action) {
      state.data = [...action.payload.data];
    },
    updateTodos(state, action) {
      state.data = [
        ...state.data.map((t) =>
          t._id === action.payload.data._id ? action.payload.data : t
        ),
      ];
    },

    deleteTodo(state, action) {
      state.data = [
        ...state.data.filter((t) => t._id !== action.payload.data._id),
      ];
    },

    newTodo(state, action) {
      state.data.push(action.payload.data);
    },
  },
});

export const todosReducer = todosSlice.reducer;
export const todosActions = todosSlice.actions;
