import { createSelector } from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux"; // eslint-disable-line
import { lruMemoize, unstable_autotrackMemoize, weakMapMemoize } from "reselect"; // eslint-disable-line
import { RootState } from "../store";

type LogSelector = 'none' | 'basic' | 'withParameters';
const logSelector: LogSelector = 'none';

////////////////////
// BASIC SELECTOR //
////////////////////
export const selectMyTodosCompletedCount = createSelector(
  [
    (state: RootState) => {
      if (logSelector === 'basic')
        console.log('Selecting todos');
      return state.todos;
    },
    (state: RootState) => {
      if (logSelector === 'basic')
        console.log('Selecting user id');
      return state.more.users.ids[0];
    },
  ],
  (todos, userId) => {
    if (logSelector === 'basic')
      console.log('Calculating completed todos for user');
    return todos.filter(todo => todo.userId === userId && todo.done).length;
  }
);


/////////////////////
// WITH PARAMETERS //
/////////////////////
export const selectTodos = createSelector(
  [
    (state: RootState) => {
      if (logSelector === 'withParameters')
        console.log('Selecting todos');
      return state.todos;
    },
    (_, needle: string) => {
      if (logSelector === 'withParameters')
        console.log(`Selecting needle argument ${needle}`);
      return needle?.toLowerCase();
    },
  ],
  (todos, needle) => {
    if (logSelector === 'withParameters')
      console.log(`Calculating matching todos ${needle}`);

    if (!needle)
      return todos;

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



///////////////////////////
// createSelectorOptions //
///////////////////////////
// Use this instead of selectMyTodosCompletedCount
// This will NOT trigger the inputStabilityCheck warning
export const selectMyTodosCompletedCountNoWarning = createSelector(
  [
    (state: RootState) => {
      console.log('Selecting todos & user id');
      return {todos: state.todos, userId: state.more.users.ids[0]};
    }
  ],
  ({todos, userId}) => {
    console.log('Calculating completed todos for user');
    return todos.filter(todo => todo.userId === userId && todo.done).length;
  }, {
    memoize: lruMemoize,
    memoizeOptions: {
      equalityCheck: (a, b) => a.todos === b.todos && a.userId === b.userId,
      // resultEqualityCheck: shallowEqual,
      // maxSize: 10
    },
  }
);


///////////////////////////////
// unstable_autotrackMemoize //
///////////////////////////////
// Use this instead of selectTodos
// The unstable_autotrackMemoize will not recalculate the
// combiner whenever we toggle a Todo between (not) done!
export const selectTodosWithProxyMemoize = createSelector(
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
    console.log(`Calculating matching todos ${needle}`);
    return todos.filter(todo => todo.text.toLowerCase().includes(needle));
  }, {
    memoize: unstable_autotrackMemoize,
  }
);


export const selectTodosArgsMemoize = createSelector(
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
    console.log(`Calculating matching todos ${needle}`);
    return todos.filter(todo => todo.text.toLowerCase().includes(needle));
  }, {
    // memoize: lruMemoize,
    // memoizeOptions: {
    //   equalityCheck: shallowEqual,
    //   // resultEqualityCheck: shallowEqual,
    //   // maxSize: 10
    // },
    argsMemoize: lruMemoize,
    argsMemoizeOptions: {
      equalityCheck: shallowEqual,
      resultEqualityCheck: shallowEqual,
      maxSize: 10
    }
  }
);
