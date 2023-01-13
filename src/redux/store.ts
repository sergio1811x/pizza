import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filter/slices";
import cart from "./slices/cart/slices";
import pizzas from "./slices/pizza/slices";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: { filter, cart, pizzas },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
