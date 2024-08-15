import React, { useEffect } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import TodoMainList from './TodoMainList';
import TodoCreature from './TodoCreature';
import './Todo.css'


const Todo = (date) => {

  return (
    <div className="TodoBack">
      <div className="TodoContainer">
        <Sidebar />
        <div className="TodoMain">
          <div className="TodoDashboard">
            <div className="TodoList">
              <TodoMainList
                date = {date}
              />
            </div>
            <div className="TodoCreatures">
              <TodoCreature />
            </div>
          </div>
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Todo;
