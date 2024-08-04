import React from 'react';
import './TodoList.css';

const ToDoList = ({onClick}) => {
  return (
    <div className='ToDoList' onClick={onClick}>
      <div>
        <span className='ToDoListTitle'>TO DO</span>
        <span className='ToDoListNotDo'>(02)</span>
      </div>
      <div className='ToDoListContents'>
        <ul>
          <li><input type="checkbox" /><label for="todo"> 알고리즘 공부하기</label></li>
          <li><input type="checkbox" /><label for="todo"> 리액트 공부하기</label></li>
        </ul>
      </div>
    </div>
  );
};

export default ToDoList;
