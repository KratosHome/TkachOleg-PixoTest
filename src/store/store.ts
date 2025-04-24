import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice.ts";
import productReducer from "./products-slice.ts";

const loadStorage = (key: string) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : undefined;
};

const saveStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
  },
  preloadedState: {
    cart: loadStorage("cartState"),
  },
});

store.subscribe(() => saveStorage("cartState", store.getState().cart));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
