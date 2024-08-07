import React from 'react';
import CreatureImage from '../../assets/images/test1.png';
import './Creature.css';

const Creature = ({ creature }) => {
  return (
    <div className="MCreature">
      <p className="MCreatureName">{creature.name}</p>
      <p className="MCreatureterm">🤍 {creature.daysTogether}일째 함께하는 중</p>
      <img src={CreatureImage} alt="creature" />  
      <div className="MCreatureInfo">
        <p className="MCreatureLv">Lv. {creature.level}</p>
        <div className="MCreatureExp">
          <p>EXP</p>
          <progress value={creature.exp} max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default Creature;
