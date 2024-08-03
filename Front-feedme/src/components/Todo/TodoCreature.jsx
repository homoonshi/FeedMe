import React from 'react';
import CreatureImage from '../../assets/images/test1.png';
import '../../assets/font/Font.css' 
import './TodoCreature.css'

const TodoCreature = () => {
  return (
    <div className="TodoCreatureA">
      <p className="TodoCreatureAName">Lv. 1</p> 
      <img src={CreatureImage} alt="creature" />
      <div className="TodoCreatureAInfo">
        <div className="TodoCreatureAExp">
          <p>EXP</p>
          <progress value="60" max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default TodoCreature;