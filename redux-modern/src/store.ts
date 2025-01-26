import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { todoReducer } from "./todos/todoSlice";


export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});


export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector = useSelector.withTypes<RootState>();
