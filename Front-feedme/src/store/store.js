// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice';
import userReducer from './userSlice';
import friendsListReducer from './friendsSlice.js';
import friendInfoReducer from './friendInfoSlice.js'; 
import feedListReducer from './feedListSlice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    friendsList: friendsListReducer,
    friendInfo: friendInfoReducer,
    feedList: feedListReducer, 
  },
});

export default store;
