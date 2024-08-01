import React, { useState } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import TodoMainList from './TodoMainList';
import TodoCreature from './TodoCreature';
import './Todo.css'


const Todo = () => {
  return (
    <div className="TodoBack">
      <div className="TodoContainer">
        <Sidebar/>
        <div className="TodoMain">
          <Search />
            <div className="TodoDashboard">
              <div className="TodoList">
                <TodoMainList />
              </div>
              <div className="TodoCreature">
                <TodoCreature />
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
