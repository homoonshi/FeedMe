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
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

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
    "공부하세요", "할 일을 작성하세요!",
    "11시",
    "공부하세요", "할 일을 작성하세요!",
    "11시",
    "공부하세요"
  ]);

  const [requests, setRequests] = useState([
    {
      img: "./images/img-cat.png",
      nickname: "지나"
    },
    {
      img: "./images/img-cat.png",
      nickname: "민우"
    }, {
      img: "./images/img-cat.png",
      nickname: "제시카"
    }, {
      img: "./images/img-cat.png",
      nickname: "시카고"
    }, {
      img: "./images/img-cat.png",
      nickname: "바보"
    },
  ]);
  const [isSettingsMode, setIsSettingsMode] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(true); // Switch 상태 관리
  const [isRequestMode, setRequestMode] = useState(false);

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

  const toggleRequestMode = () => {
    setRequestMode(!isRequestMode);
  }

  return (
    <div className="NoticeModal" onClick={onClose}>
      <div className="NoticeContent" onClick={(e) => e.stopPropagation()}>
        <div className='NoticeTitle'>
          <h2>{isSettingsMode ? '알림 설정' : '알림'}</h2>
          {isSettingsMode ? (
            <ArrowBackIosNewOutlinedIcon
              style={{
                color: '#49454F',
                cursor: "pointer"
              }}
              onClick={toggleSettingsMode} />
          ) : (
            <SettingsOutlinedIcon
              style={{
                color: '#49454F',
                cursor: "pointer"
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
            <TimePicker defaultValue={dayjs('12:08', format)} format={format} disabled={!isSwitchOn} />
          </div>
        ) : (
          <div>
            {isRequestMode ? (
              <div>
                <div className='AlarmFriends'
                  onClick={toggleRequestMode}>
                  <NotificationsNoneOutlinedIcon />
                  <span>알림 목록 보기</span>
                </div>
                <ul>
                  {requests.map((request, index) => (
                    <li key={index}>
                      <img src={request.img}
                        style={{
                          width: "35px",
                          marginRight: "20px",
                          borderRadius: "50%",
                        }} alt='creatureImg' />
                      <span style={{
                        fontFamily: "PretendardM"
                      }}>{request.nickname}</span>
                      <div className='RequestButtons'>
                        <span
                          style={{
                            width: "35px",
                            fontFamily: "PretendardSB",
                            color: "#696969"
                          }}
                          className="NoticeButton" onClick={() => handleDelete(index)}>거절</span>
                        <span
                          style={{
                            width: "35px",
                            marginLeft: "15px",
                            fontFamily: "PretendardSB",
                            color: "#007bff"
                          }}
                          className="NoticeButton" onClick={() => handleDelete(index)}>수락</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <div className='AlarmFriends'
                  onClick={toggleRequestMode}>
                  <GroupAddOutlinedIcon />
                  <span>친구 요청 목록 보기</span>
                </div>
                <ul>
                  {notifications.map((notification, index) => (
                    <li key={index}>
                      <NotificationsNoneOutlinedIcon
                        style={{
                          width: "19px",
                          marginRight: "13px"
                        }} />
                      <span>{notification}</span>
                      <CloseIcon
                        style={{
                          width: "19px",
                          marginLeft: "auto"
                        }}
                        className="NoticeButton" onClick={() => handleDelete(index)} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
