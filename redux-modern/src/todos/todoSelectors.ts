import { createSelector } from "@reduxjs/toolkit"
import { RootState } from "../store";


export const selectMyTodosCompletedCount = createSelector(
  [
    (state: RootState) => {
      console.log('Selecting todos');
      return state.todos;
    },
    (state: RootState) => {
      console.log('Selecting user id');
      return state.more.users.ids[0];
    },
  ],
  (todos, userId) => {
    console.log('Calculating completed todos for user');
    return todos.filter(todo => todo.userId === userId && todo.done).length;
  }
);
