// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice';
import userReducer from './userSlice';
import alarmReducer from './alarmSlice';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    alarm: alarmReducer,
    todo: todoReducer,
  },
});

export default store;
