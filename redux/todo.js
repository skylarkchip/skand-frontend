import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  todos: [],
  searchKeyword: "",
  currentPage: 1,
};

const todoSlice = createSlice({
  name: "todo",
  initialState: INITIAL_STATE,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
