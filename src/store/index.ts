import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import financesReducer from "../slices/financesSlice";
import categoriasReducer from "../slices/categoriasSlice";
import filtersReducer from "../slices/filtersSlice";
import appReducer from "../slices/appSlice";

const rootReducer = combineReducers({
  finances: financesReducer,
  categorias: categoriasReducer,
  filters: filtersReducer,
  settings: appReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
          "persist/FLUSH",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
