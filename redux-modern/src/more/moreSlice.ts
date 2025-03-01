import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';


export const increaseYearAsync = createAsyncThunk(
  'more/increaseYearAsync',
  async (data: {years: number}, { dispatch }) => {
    for (let i = 0; i < data.years; i++) {
      dispatch(moreSlice.actions.increaseYear());
    }
  },
);


interface User {
  id: string;
  name: string;
}

// Uses "id" as the... id
// Switching to this one, also need to update Users.tsx removeUser call
// const usersAdapter = createEntityAdapter<User>();

// Use "name" as the id
const usersAdapter = createEntityAdapter({
  // In case "id" is not the name of the id property
  selectId: (user: User) => user.name,
  // Sorter for the "All IDs" array
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});
const initialUsersState = usersAdapter.getInitialState();


export const moreSlice = createSlice({
  name: 'more',
  initialState: {
    currentYear: 2025,
    users: initialUsersState,
    // users: {
    //   ids: Id[],
    //   entities: Record<Id, T>,
    // }
  },
  reducers: {
    increaseYear: state => {
      state.currentYear++;
    },
    addUser: (state, action: Parameters<typeof usersAdapter.addOne>[1]) => {
      usersAdapter.addOne(state.users, action);
    },
    removeUser: (state, action: Parameters<typeof usersAdapter.removeOne>[1]) => {
      usersAdapter.removeOne(state.users, action);
    },
    // If the usersAdapter is set to the full state,
    // the mapping becomes as easy as:
    // addUsers: usersAdapter.addMany,
    // updateUser: usersAdapter.updateOne,
    // ... there are many more fns ready for use

    // Prepared Reducer Example
    addPartialUser: {
      reducer: (state, action: PayloadAction<User>) => {
        usersAdapter.addOne(state.users, action.payload);
      },
      prepare: (user: Partial<User>) => {
        return {
          payload: {
            id: 'new',
            name: 'New User',
            ...user,
          }
        };
      },
    },
  },
});

export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = usersAdapter.getSelectors((state: { users: typeof initialUsersState }) => state.users);


export const { increaseYear } = moreSlice.actions;
