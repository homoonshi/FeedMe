// src/redux/slice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  nickname: null,
  birthday: null,
  token: null,
  hasCreature: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setNickname: (state, action) => {
      state.nickname = action.payload;
    },
    setBirthday: (state, action) => {
      state.birthday = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCreature: (state, action) => {
      state.hasCreature = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.hasCreature = false;
    },
  },
});

export const { setNickname, setBirthday, setEmail, setToken, setCreature, logout } = authSlice.actions;
export default authSlice.reducer;
