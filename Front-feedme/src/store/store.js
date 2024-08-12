// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice';
import userReducer from './userSlice';
<<<<<<< HEAD
import alarmReducer from './alarmSlice';
import todoReducer from './todoSlice';
=======
import friendsListReducer from './friendsSlice.js';
import friendInfoReducer from './friendInfoSlice.js'; 
import feedListReducer from './feedListSlice.js';
>>>>>>> origin/front-hyunsu

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
<<<<<<< HEAD
    alarm: alarmReducer,
    todo: todoReducer,
=======
    friendsList: friendsListReducer,
    friendInfo: friendInfoReducer,
    feedList: feedListReducer, 
>>>>>>> origin/front-hyunsu
  },
});

export default store;
