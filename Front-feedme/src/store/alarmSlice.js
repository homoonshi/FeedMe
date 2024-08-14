import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const initialState = {
  notifications : [],
  requests: [],
  isSettingsMode: false,
  isSwitchOn: true,
  isRequestMode: false,
  alarmTime: dayjs('00', 'HH'), // 초기 알림 시간 설정


}

const alarmSlice = createSlice({
  name: 'alarm',
  initialState,
  reducers: {
    addNotifications: (state, action) => {
      state.notifications.push(action.payload);
    },
    removeNotifications: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    setRequests: (state, action) => {
      state.requests = action.payload;
    },
    addRequests: (state, action) => {
      state.requests.push(action.payload);
    },
    removeRequests: (state, action) => {
      state.requests = state.requests.filter(
        (requests) => requests.id !== action.payload
      );
    },
    setIsSettingsMode: (state, action) => {
      state.isSettingsMode = action.payload;
    },
    setIsSwitchOn: (state, action) => {
      state.isSwitchOn = action.payload;
    },
    setRequestMode: (state, action) => {
      state.isRequestMode = action.payload;
    },
    setAlarmTime: (state, action) => {
      state.alarmTime = action.payload;
    },

  }
});

export const { 
  addNotifications,
  removeNotifications,
  setRequests,
  addRequests,
  removeRequests,
  setIsSettingsMode,
  setIsSwitchOn,
  setRequestMode,
  setAlarmTime,


 } = alarmSlice.actions;

export default alarmSlice.reducer;