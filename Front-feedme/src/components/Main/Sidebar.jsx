import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import '../Main/Sidebar.css';
import Menu from './SidebarMenu';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';

const Sidebar = () => {
  const [ clicked, setClicked ] = useState('#49454F');

  const ClickedMenu = () => {
    setClicked('#87C908');
  }
  
  return (
    <div className='SidebarBack'>
      <div className='SidebarLogo'>
        <h2>Feed me</h2>
      </div>
      <div className='SidebarList'>
        <Menu color={clicked} onClick={ClickedMenu} icon={GridViewOutlinedIcon} des="/Main" link="메인"/>
        <Menu color={clicked} onClick={ClickedMenu} icon={FormatListBulletedIcon} des="/Todo" link="할 일 목록"/>
        <Menu color={clicked} onClick={ClickedMenu} icon={AutoStoriesOutlinedIcon} des="/Diary" link="그림일기"/>
        <Menu color={clicked} onClick={ClickedMenu} icon={ChatBubbleOutlineOutlinedIcon} des="/Chatting" link="채팅"/>
        
      </div>
    </div>
  );
};

export default Sidebar;
