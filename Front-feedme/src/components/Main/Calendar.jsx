import React from 'react';
import './Calendar.css';
import arrow_r from '../../assets/icons/icon-arrow-right.png';
import arrow_l from '../../assets/icons/icon-arrow-left.png';


const Calendar = () => {
  return (
    <div className='Calendar'>
      <div className='CalendarTop'>
        <img src={arrow_l} alt="" />
        <span>8월</span>
        <img src={arrow_r} alt="" />
      </div>
      <div className=''>
        <table>
          <thead>
            <tr>
              <th>월</th>
              <th>화</th>
              <th>수</th>
              <th>목</th>
              <th>금</th>
              <th>토</th>
              <th>일</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
