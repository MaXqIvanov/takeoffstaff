import { combineReducers, configureStore } from '@reduxjs/toolkit';
import contactsSlice from './contactsSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  contacts: contactsSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});