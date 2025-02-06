import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from './slices/auth.slice';
import cardReducer from './slices/card.slice';
import paymentReducer from './slices/payment.slice';
import profileReducer from './slices/profile.slice';

// Combine all reducers in a single root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  card: cardReducer,       // Ensure consistency by using a 'card' property
  payment: paymentReducer,
  profile: profileReducer,
});

// Create the Redux store using the combined reducers
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Define RootState and AppDispatch types for TypeScript support
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
