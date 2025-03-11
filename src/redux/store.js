import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./auth/authSlice";

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
import { canimApi } from "@/services/canim";

const rootReducer = combineReducers({
  auth: authReducer,
  [canimApi.reducerPath]: canimApi.reducer, // Add the API reducer
});

const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(canimApi.middleware), // Add RTK Query middleware
});

export const persistor = persistStore(store);
export const RootState = store.getState();
export const AppDispatch = store.dispatch;
