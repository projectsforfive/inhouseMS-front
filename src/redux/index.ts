import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authReducer from './slices/auth.slice';
import paymentReducer from './slices/payment.slice';

const rootReducer = combineReducers({
  auth: authReducer,
  payment: paymentReducer
});

export const store = configureStore({
  reducer: rootReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
