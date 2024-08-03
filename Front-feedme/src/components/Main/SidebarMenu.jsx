import React from 'react';
import { Link } from 'react-router-dom';
import '../Main/Sidebar.css';

const Menu = ({ icon: Icon, des, link, color}) => {
    return (
        <div>
            <Icon className='menu-icon'/>
            <Link
                style={{
                    fontFamily: 'PretendardM',
                    color: {color},
                }}
                to={des}
            >
                {link}
            </Link>
            <span id='SidebarLine'>|</span>
        </div>
    );
};

export default Menu;
