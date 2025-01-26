import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Accidentally mutating state in reducers is the
// single most common mistake Redux users make.
function reducerSpreadHell(state: any, action: any) {
  // Also, do you really want to be doing this...
  return {
    ...state,
    first: {
      ...state.first,
      second: {
        ...state.first.second,
        [action.someId]: {
          ...state.first.second[action.someId],
          fourth: action.someValue,
        },
      },
    },
  }
}

// If you could be doing this:
// state.first.second[action.someId].fourth = action.someValue;





// https://github.com/immerjs/immer ⭐ 28k
// Create the next immutable state tree by simply modifying the current tree

// Winner of the "Breakthrough of the year" React open source award and
// "Most impactful contribution" JavaScript open source award in 2019

export const immerSlice = createSlice({
  name: "immer",
  initialState: {
    newMessagesCount: 0,
  },
  reducers: {
    addMessage: (state, action: PayloadAction<any>) => {
      // state has been wrapped with the Immer produce() fn
      // It tracks all mutations and then creates the newState
      // by replaying the mutations in an immutable equivalent
      state.newMessagesCount++;
    },
  },
});

export default immerSlice.actions;
export type ImmerRootState = {
  immer: ReturnType<typeof immerSlice.getInitialState>,
}

// NEXT: The Immer produce() fn in detail @ produce.test.ts
