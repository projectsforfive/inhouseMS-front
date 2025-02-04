import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
import cardReducer from '@/redux/slices/card.slice'


import authReducer from './slices/auth.slice';
import paymentReducer from './slices/payment.slice';

// const rootReducer = combineReducers({
//   auth: authReducer,
//   payment: paymentReducer
// });

export const store = configureStore({
  reducer: {
    auth: authReducer,
    payment: paymentReducer,
    cardReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
