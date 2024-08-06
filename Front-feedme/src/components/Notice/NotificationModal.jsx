import React, { useState } from 'react';
import './NotificationModal.css';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import Switch from '@mui/material/Switch';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
dayjs.extend(customParseFormat);

const label = { inputProps: { 'aria-label': 'Color switch demo' } };
const format = 'HH:mm';

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    "할 일을 작성하세요!",
    "11시",
    "공부하세요",
    "할 일을 작성하세요!",
    "11시",
    "공부하세요",
    "할 일을 작성하세요!",
    "11시",
    "공부하세요",
    "할 일을 작성하세요!",
    "11시",
    "공부하세요","할 일을 작성하세요!",
    "11시",
    "공부하세요","할 일을 작성하세요!",
    "11시",
    "공부하세요",

  ]);
  const [isSettingsMode, setIsSettingsMode] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true); // Switch 상태 관리

  const handleDelete = (index) => {
    const newNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(newNotifications);
  };

  const toggleSettingsMode = () => {
    setIsSettingsMode(!isSettingsMode);
  };

  const handleSwitchChange = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <div className="NoticeModal" onClick={onClose}>
      <div className="NoticeContent" onClick={(e) => e.stopPropagation()}>
        <div className='NoticeTitle'>
          <h2>{isSettingsMode ? '알림 설정' : '알림'}</h2>
          {isSettingsMode ? (
            <ArrowBackIosNewOutlinedIcon 
            style={{
              color: '#49454F'
            }}
            onClick={toggleSettingsMode} />
          ) : (
            <SettingsOutlinedIcon 
            style={{
              color: '#49454F'
            }}
            onClick={toggleSettingsMode} />
          )}
        </div>
        {isSettingsMode ? (
          <div className="SettingsContent">
            <div className='SettingOnOff'>
              <p>알림 받기</p>
              <Switch {...label} checked={isSwitchOn} onChange={handleSwitchChange} color="secondary" />
            </div>
            <TimePicker defaultValue={dayjs('12:08', format)} format={format} disabled={!isSwitchOn}/>
          </div>
        ) : (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>
                <NotificationsNoneOutlinedIcon 
                style={{
                  width: "19px",
                  marginRight: "13px"
                }}/>
                <span>{notification}</span>
                <CloseIcon 
                style={{
                  width: "19px",
                  marginLeft: "auto"
                }}
                className="NoticeButton" onClick={() => handleDelete(index)}/>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
