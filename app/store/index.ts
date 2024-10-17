import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import alphabetReducer from "./slices/alphabetSlice";
import searchReducer from "./slices/searchSlice";
import organsReducer from "./slices/organsSlice"; // Import the organs reducer

export const store = configureStore({
  reducer: {
    alphabet: alphabetReducer,
    search: searchReducer,
    organs: organsReducer, // Add it to the store
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for using dispatch and selector
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
