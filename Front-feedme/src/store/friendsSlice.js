import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 비동기 친구 목록 불러오기 Thunk
export const fetchFriendsList = createAsyncThunk(
  'friends/fetchFriendsList', 
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.get('https://i11b104.p.ssafy.io/api/friends/chats', {
        headers: {
          Authorization: `${token}`, // Bearer 추가
        },
      });
      
      return response.data.map(friend => ({
        friendId: friend.friendId,
        counterpartNickname: friend.counterpartNickname,
        avatar: friend.avatar,
        isChecked: friend.isChecked,
        receiveTime : friend.receiveTime,
      }));
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch friends list');
    }
  }
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    list: [],
    status: 'idle', // 초기 상태는 idle
    error: null,
  },
  reducers: {
    // 임시로 새로운 친구 목록 추가
    addTemporaryFriend: (state, action) => {
      const newFriend = action.payload;
      state.list.push(newFriend);
    },
    // 기존 친구 목록 업데이트
    updateFriendsList: (state, action) => {
      const updatedFriend = action.payload;
      const index = state.list.findIndex(f => f.friendId === updatedFriend.friendId);

      if (index !== -1) {
        // 이미 존재하는 친구라면 목록에서 제거하고 가장 뒤로 이동
        state.list[index] = {
          ...state.list[index],
          ...updatedFriend,
        };
      }
    }
  },
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

// 액션과 리듀서를 내보내기
export const { addTemporaryFriend, updateFriendsList } = friendsSlice.actions;
export default friendsSlice.reducer;
