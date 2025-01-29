import { Action, createAsyncThunk, ThunkAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";

export type AppThunk<ThunkReturnType = void> = ThunkAction<ThunkReturnType, RootState, unknown, Action>;
export const createAppAsyncThunk = createAsyncThunk.withTypes<{state: RootState, dispatch: AppDispatch}>();
