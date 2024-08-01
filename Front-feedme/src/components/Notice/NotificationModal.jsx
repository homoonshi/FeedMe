import React, { useState } from 'react';
import './NotificationModal.css';

const NotificationModal = ({ onClose }) => {
  const [notifications, setNotifications] = useState([
    "할 일을 작성하세요!",
    "11시"
  ]);

  const handleDelete = (index) => {
    const newNotifications = notifications.filter((_, i) => i !== index);
    setNotifications(newNotifications);
  };

  return (
    <div className="NoticeModal" onClick={onClose}>
      <div className="NoticeContent" onClick={(e) => e.stopPropagation()}>
        <h2>알림</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>
              <span>{notification}</span>
              <button className="NoticeButton" onClick={() => handleDelete(index)}>x</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NotificationModal;
