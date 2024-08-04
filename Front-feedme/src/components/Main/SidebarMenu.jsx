import React from 'react';
import { Link } from 'react-router-dom';
import '../Main/Sidebar.css';

const Menu = ({ icon: Icon, des, link, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: isActive ? 'rgba(135, 201, 8, 0.13)' : 'transparent',
                color: isActive ? '#87C908' : '#49454F'
            }}
        >
            <div className='menu'>
            <Icon
                className='menu-icon'
                style={{ color: isActive ? '#87C908' : '#49454F' }}
            />
            <Link
                style={{
                    fontFamily: 'PretendardM',
                    color: isActive ? '#87C908' : '#49454F',
                }}
                to={des}
            >
                {link}
            </Link>
            </div>
            <span
                id='SidebarLine'
                style={{ backgroundColor: isActive ? '#87C908' : 'transparent' }}
            >|</span>
        </div>
    );
};

export default Menu;
