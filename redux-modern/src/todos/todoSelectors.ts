import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";


////////////////////
// BASIC SELECTOR //
////////////////////
export const selectMyTodosCompletedCount = createSelector(
  [
    (state: RootState) => {
      // console.log('Selecting todos');
      return state.todos;
    },
    (state: RootState) => {
      // console.log('Selecting user id');
      return state.more.users.ids[0];
    },
  ],
  (todos, userId) => {
    // console.log('Calculating completed todos for user');
    return todos.filter(todo => todo.userId === userId && todo.done).length;
  }
);


/////////////////////
// WITH PARAMETERS //
/////////////////////
export const selectTodos = createSelector(
  [
    (state: RootState) => {
      console.log('Selecting todos');
      return state.todos;
    },
    (_, needle: string) => {
      console.log(`Selecting needle argument ${needle}`);
      return needle?.toLowerCase();
    },
  ],
  (todos, needle) => {
    if (!needle)
      return todos;

    console.log(`Calculating matching todos ${needle}`);
    return todos.filter(todo => todo.text.toLowerCase().includes(needle));
  }
);



/////////////////////////
// MULTIPLE PARAMETERS //
/////////////////////////
export const selectTodosWithCase = createSelector(
  [
    (state: RootState) => state.todos,
    (_, needle: string) => needle,
    (_, __, caseSensitive: boolean) => caseSensitive
  ],
  (todos, needle, caseSensitive) => { /* magic here */}
)



/////////////////////////
// inputStabilityCheck //
/////////////////////////
// Use this instead of selectMyTodosCompletedCount to trigger the console warning
export const selectMyTodosCompletedCountTriggersInputStabilityCheckWarning = createSelector(
  [
    (state: RootState) => ({todos: state.todos, userId: state.more.users.ids[0]})
  ],
  ({todos, userId}) => {
    return todos.filter(todo => todo.userId === userId && todo.done).length;
  }
);


///////////////////////////
// identityFunctionCheck //
///////////////////////////
// Enable in TodoList.tsx to trigger the console warning
export const selectAllTodosTriggersIdentityFunctionCheckWarning = createSelector(
  [
    (state: RootState) => state.todos,
  ],
  // The combiner, result function should do actual work!
  todos => todos
);
