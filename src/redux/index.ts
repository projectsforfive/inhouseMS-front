import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import interviewReducer from '@/redux/slices/interview'


import authReducer from './slices/auth.slice';

const rootReducer = combineReducers({
  auth: authReducer
});

export const store = configureStore({
  reducer: {
    rootReducer,
    interviewReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
