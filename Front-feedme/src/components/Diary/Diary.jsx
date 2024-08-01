import React from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import DiaryPic from './DiaryPic';
import './Diary.css'

const Diary = () => {
  return (
    <div className="DiaryContainer">
      <Sidebar/>
      <div className="DiaryMain">
        <Search />
          <div className="DiaryDashboard">
            <DiaryPic />
          </div>
      </div>
    </div>
  );
};

export default Diary;