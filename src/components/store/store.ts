
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import calendarReducer from './calendarSlice';
const store = configureStore({
  reducer: {
    form: formReducer,
    calendar:calendarReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

