import React from 'react';
import { Link } from 'react-router-dom';
import '../Main/Sidebar.css';

const Menu = ({ icon: Icon, des, link, isActive, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: isActive ? 'rgba(245, 91, 162, 0.13)' : 'transparent',
                color: isActive ? '#F55BA2' : '#49454F'
            }}
        >
            <div className='menu'>
            <Icon
                className='menu-icon'
                style={{ color: isActive ? '#F55BA2' : '#49454F' }}
            />
            <Link
                style={{
                    fontFamily: 'PretendardM',
                    color: isActive ? '#F55BA2' : '#49454F',
                }}
                to={des}
            >
                {link}
            </Link>
            </div>
            <span
                id='SidebarLine'
                style={{ backgroundColor: isActive ? '#F55BA2' : 'transparent' }}
            >|</span>
        </div>
    );
};

export default Menu;
