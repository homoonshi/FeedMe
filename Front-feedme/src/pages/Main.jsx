import React from 'react';
import Sidebar from '../components/Main/Sidebar';
import SearchBar from '../components/Main/Search';
import CreatureInfo from '../components/Main/CreatureInfo';
import Calendar from '../components/Main/Calendar';
import '../pages/Main.css';

const Main = () => {
  
  return (
    <div className="Main">
      <div className="MainRectangle">
        <Sidebar />
        <div className='MainRight'>
          <SearchBar />
          <div className='MainRightContents'>
            <CreatureInfo />
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;