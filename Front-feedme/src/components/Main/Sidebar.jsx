import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../Main/Sidebar.css';
import Menu from './SidebarMenu';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const Sidebar = () => {
  const [active, setActive] = useState('/Main');
  const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate 훅 사용

  const handleClick = (path) => {
    setActive(path);
    // navigate(path); // 지정된 경로로 페이지 이동
  };

  const clickLogo = () => {
    navigate('/');
  }

  return (
    <div className='SidebarBack'>
      <div className='SidebarLogo' onClick={clickLogo}>
        <h2>Feed me</h2>
      </div>
      <div className='SidebarList'>
        <Menu
          isActive={active === '/Main'}
          onClick={() => handleClick('/Main')}
          icon={GridViewOutlinedIcon}
          des="/Main"
          link="메인"
        />
        <Menu
          isActive={active === '/Todo'}
          onClick={() => handleClick('/Todo')}
          icon={FormatListBulletedIcon}
          des="/Todo"
          link="할 일 목록"
        />
        <Menu
          isActive={active === '/Diary'}
          onClick={() => handleClick('/Diary')}
          icon={AutoStoriesOutlinedIcon}
          des="/Diary"
          link="그림일기"
        />
        <Menu
          isActive={active === '/Chatting'}
          onClick={() => handleClick('/Chatting')}
          icon={ChatBubbleOutlineOutlinedIcon}
          des="/Chatting"
          link="채팅"
        />
      </div>
    </div>
  );
};

export default Sidebar;
