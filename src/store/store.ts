import { combineReducers, configureStore } from '@reduxjs/toolkit';
import contactsSlice from './contactsSlice';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  contacts: contactsSlice,
  auth: authSlice,
});

export const setupStore = () => { return configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
  }),
});
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']