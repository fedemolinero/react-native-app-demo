// store.ts

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import productsReducer from './reducers/productsReducer';

const store = configureStore({
  reducer: {
    products: productsReducer,
    // Otros reducers si los tienes
  },
});

export type RootState = ReturnType<typeof store.getState>;

// Definición de AppThunk
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
