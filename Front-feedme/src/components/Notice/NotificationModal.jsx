import React, { useEffect, useState } from 'react';
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
import { addNotifications, addRequests, removeRequests, setIsSettingsMode, setIsSwitchOn, setRequestMode, setAlarmTime } from '../../store/alarmSlice';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

dayjs.extend(customParseFormat);

const label = { inputProps: { 'aria-label': 'Color switch demo' } };
const format = 'HH';

const NotificationModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { notifications, requests, isSettingsMode, isSwitchOn, isRequestMode, alarmTime } = useSelector((state) => state.alarm);
  const {token} = useSelector((state) => state.auth);

  // SSE 연결 설정
  useEffect(() => {
    const eventSource = new EventSource('https://i11b104.p.ssafy.io/api/subscribe/alarm');

    eventSource.addEventListener('alarm', function (event) {
      const newNotification = JSON.parse(event.data);
      dispatch(addNotifications(newNotification));
    });

    eventSource.addEventListener('friend', function (event) {
      const newRequest = JSON.parse(event.data);
      dispatch(addRequests(newRequest));
    });

    eventSource.onerror = function (err) {
      console.error('SSE error:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const handleDelete = (index) => {
    const newNotifications = notifications.filter((_, i) => i !== index);
    dispatch(addNotifications(newNotifications));
  };

  const handleReject = (index) => {
    // 서버에서 요청을 거절하기 위한 API 호출
    const requestId = requests[index].id;
    axios.post(`https://i11b104.p.ssafy.io/api/friends/reject/${requestId}`)
      .then(() => {
        dispatch(removeRequests(index));
      })
      .catch(error => {
        console.error('Error rejecting friend request:', error);
      });
  }

  const handleAccept = (index) => {
    // 서버에서 요청을 수락하기 위한 API 호출
    const requestId = requests[index].id;
    axios.post(`https://i11b104.p.ssafy.io/api/friends/accept/${requestId}`)
      .then(() => {
        dispatch(addRequests(index));
      })
      .catch(error => {
        console.error('Error accepting friend request:', error);
      });
  }

  const handleTimeChange = async (time) => {
    if (time) {
      const formattedTime = time.format('HH');
      const intAlarmTime = parseInt(formattedTime, 10);
  
      dispatch(setAlarmTime(time));

      try {
        await axios.post('https://i11b104.p.ssafy.io/api/alarms/time', { 
          alarmTime: intAlarmTime 
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          }
        }
      );
        console.log('Time setting updated');
      } catch (error) {
        console.error('Error setting time:', error);
      }
    } else {
      console.log('No alarm time');
    }
  };
  



  const toggleSettingsMode = () => {
    dispatch(setIsSettingsMode(!isSettingsMode));
  };

  const handleSwitchChange = () => {
    dispatch(setIsSwitchOn(!isSwitchOn));
  };

  const toggleRequestMode = () => {
    dispatch(setRequestMode(!isRequestMode));
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
            <TimePicker
              value={alarmTime} // 현재 선택된 시간
              format={format}
              disabled={!isSwitchOn}
              showMinute={false}
              showSecond={false}
              onChange={handleTimeChange} // 시간 변경 시 호출
              // inputReadOnly
            />
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
                          className="NoticeButton" onClick={() => handleReject(index)}>거절</span>
                        <span
                          style={{
                            width: "35px",
                            marginLeft: "15px",
                            fontFamily: "PretendardSB",
                            color: "#007bff"
                          }}
                          className="NoticeButton" onClick={() => handleAccept(index)}>수락</span>
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
