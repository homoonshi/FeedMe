import React from 'react';
import { Link } from 'react-router-dom';
import '../Main/Sidebar.css';
import main from '../../assets/icons/icon-main-green-50.png'
import todolist from '../../assets/icons/icon-todo-gray-50.png'
import diary from '../../assets/icons/icon-diary-gray-50.png'
import chat from '../../assets/icons/icon-chat-gray-50.png'

const Sidebar = () => {
  return (
    <div className='SidebarBack'>
      <div className='SidebarLogo'>
        <h2>Feed me</h2>
      </div>
      <div className='SidebarList'>
        <div id='SidebarBack'>
          <img src={main} alt="main-icon" />
          <Link style={{
            fontFamily: 'PretendardM',
            color: '#87C908'
          }} to="/Main">메인</Link>
          <span id='SidebarLine'>|</span>
        </div>
        <div>
          <img src={todolist} alt="main-icon" />
          <Link style={{
            fontFamily: 'PretendardM',
            color: '#49454F'
          }} to="/Todo">할 일 목록</Link>
        </div>
        <div>
          <img src={diary} alt="main-icon" />
          <Link style={{
            fontFamily: 'PretendardM',
            color: '#49454F'
          }} to="/Diary">그림일기</Link>
        </div>
        <div>
          <img src={chat} alt="main-icon" />
          <Link style={{
            fontFamily: 'PretendardM',
            color: '#49454F'
          }} to="/Chatting">채팅</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
