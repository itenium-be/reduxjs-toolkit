import { Action, configureStore, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { todoReducer } from "./todos/todoSlice";
import { immerSlice } from "./immer/immerSlice";
import { zooApiSlice } from "./zoo/zoo-api";
import { wildsSlice } from "./wilds/wildsSlice";

// The complexity of the legacy createStore just goes way
// This is typically the easiest part of a migration.
export const store = configureStore({
  reducer: {
    todos: todoReducer,
    immer: immerSlice.reducer,
    wilds: wildsSlice.reducer,

    // Attach the RTK Query API Reducer
    [zooApiSlice.reducerPath]: zooApiSlice.reducer,
  },

  // The API middleware takes care of caching, invalidation, polling, ...
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(zooApiSlice.middleware),

  // devTools: true (default) or DevToolsEnhancerOptions
});

// NEXT: Show how it works in Redux DevTools & Network Tabs
// NEXT: Show src/zoo/components/ZooList.tsx


type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();

export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
export const createAppAsyncThunk = createAsyncThunk.withTypes<{state: RootState, dispatch: AppDispatch}>();
