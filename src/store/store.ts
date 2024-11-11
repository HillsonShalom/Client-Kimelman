import { configureStore } from "@reduxjs/toolkit";
import candidatesSlice from "./slices/candSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        candidates: candidatesSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();