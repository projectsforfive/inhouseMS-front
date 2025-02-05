import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import cardReducer from '@/redux/slices/card.slice'


import authReducer from './slices/auth.slice';
import paymentReducer from './slices/payment.slice';

const rootReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: {
    rootReducer,
    cardReducer,
    payment: paymentReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
