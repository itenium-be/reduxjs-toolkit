import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTodos } from './fetchTodos';
import { Todo } from './types';

const todoSlice = createSlice({
  // Action prefix: todos/addTodo, todos/removeTodo etc
  name: "todos",
  initialState: fetchTodos(),
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      // "state" is WritableDraft<Todo>[] (=Immer)
      // "[].push()" does NOT mutate!
      state.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      // state = newState does NOT work!
      // In such case, return the newState
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addTodo, removeTodo, toggleTodo, updateTodo } = todoSlice.actions;
export const todoReducer = todoSlice.reducer;

// What Changed?
// - The toolkit combines the Actions & Reducers into one
// - No crazy spreading thanks to Immer
// - No overhead for type safety
// - The tests just keep working!

// Final verdict?
// 41 lines --> 28 lines

// NEXT: Let's look at Immer first (immer/immerSlice.ts)
