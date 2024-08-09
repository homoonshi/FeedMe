import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:8080/users/mypage', {
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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    nickname: '',
    email: '',
    birthday: '',
    creatureName: '',
    exp: 0,
    level: 0,
    image: '',
    togetherDay: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { nickname, email, birthday, creatureName, exp, level, image, togetherDay } = action.payload;
        state.nickname = nickname;
        state.email = email;
        state.birthday = birthday;
        state.creatureName = creatureName;
        state.exp = exp;
        state.level = level;
        state.image = image;
        state.togetherDay = togetherDay;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;