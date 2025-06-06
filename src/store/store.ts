import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import productsReducer from "./products-slice";
import { productsApi } from "../api/products-api.ts";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const cartPersistConfig = {
  key: "cart",
  storage,
};

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  products: productsReducer,
  [productsApi.reducerPath]: productsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(productsApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
