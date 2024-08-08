// src/redux/slice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  hasCreature: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
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

export const { setToken, setCreature, logout } = authSlice.actions;
export default authSlice.reducer;
