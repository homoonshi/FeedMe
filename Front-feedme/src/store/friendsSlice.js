import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFriendsList = createAsyncThunk(
  'friends/fetchFriendsList',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://i11b104.p.ssafy.io/api/friends/list', {
        headers: {
          Authorization: `${token}`,
        },
      });
      return response.data; 
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    list: [], 
    status: 'idle', 
    error: null, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendsList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriendsList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchFriendsList.rejected, (state, action) => {
        state.status = 'failed'; 
        state.error = action.payload; 
      });
  },
});

export default friendsSlice.reducer;
