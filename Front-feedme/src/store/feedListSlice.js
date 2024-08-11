import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFeedList = createAsyncThunk(
  'feedList/fetchFeedList',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/feed/recent/friends', {
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

const feedListSlice = createSlice({
  name: 'feedList',
  initialState: {
    feeds: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeedList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.feeds = action.payload;
      })
      .addCase(fetchFeedList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default feedListSlice.reducer;
