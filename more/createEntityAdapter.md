createEntityAdapter
===================

See redux-modern/src/more moreSlice.ts and Users.tsx:


```ts
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
}

const usersAdapter = createEntityAdapter<User>();
const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: usersAdapter.addOne,
    addUsers: usersAdapter.addMany,
    updateUser: usersAdapter.updateOne,
    removeUser: usersAdapter.removeOne,
    // setOne, setMany, removeMany, updateMany, upsertOne, ...
  },
});

export const { addUser, addUsers, updateUser, removeUser } = usersSlice.actions;

// Export memoized selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // selectTotal, selectEntities
} = usersAdapter.getSelectors((state: { users: typeof initialState }) => state.users);

export default usersSlice.reducer;
```
