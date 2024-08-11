import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFriendInfo = createAsyncThunk(
  'friendInfo/fetchFriendInfo',
  async ({ token, counterpartNickname }, { rejectWithValue }) => {
    try {
      console.log({ token, counterpartNickname });

      const response = await axios({
        method: 'get',
        url: `http://localhost:8080/friends/info`, 
        headers: {
          Authorization: `${token}`,
        },
        params: {
          counterpartNickname: "yebon",
        }
      });

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response ? error.response.data : error.message); 
    }
  }
);



const friendInfoSlice = createSlice({
  name: 'friendInfo',
  initialState: {
    friendId: null,
    nickname: '',
    creatureImg: '',
    level: 0,
    exp: 0,
    join: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriendInfo.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { friendId, nickname, creatureImg, level, exp, join } = action.payload;
        state.friendId = friendId;
        state.nickname = nickname;
        state.creatureImg = creatureImg;
        state.level = level;
        state.exp = exp;
        state.join = join;
      })
      .addCase(fetchFriendInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default friendInfoSlice.reducer;
