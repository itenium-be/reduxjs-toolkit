import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { todoReducer } from "./todos/todoSlice";
import { immerSlice } from "./immer/immerSlice";


export const store = configureStore({
  reducer: {
    todos: todoReducer,
    immer: immerSlice.reducer,
  },
});


export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
