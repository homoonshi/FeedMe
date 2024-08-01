import React, { useState } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import ToDoList from './TodoList';
import Creature from '../Creature/Creature';
import './Todo.css'

const Todo = () => {
  const [drawing, setDrawing] = useState(false);

  const handleDrawClick = () => {
    alert('Drawing created!');
    setDrawing(true);
  };

  return (
    <div className="TodoContainer">
      <Sidebar/>
      <div className="TodoMain">
        <Search />
          <div className="TodoDashboard">
            <div className="TodoList">
              <ToDoList />
              <button onClick={handleDrawClick}>DRAW</button>
                {drawing && (
                  <div/>
                )} 
            </div>
            <div className="TodoCreature">
              <Creature />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Todo;
