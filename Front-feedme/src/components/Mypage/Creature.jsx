import React from 'react';
import './Creature.css';

const Creature = ({ creature }) => {
  const getMaxExpForLevel = (level) => {
    switch (level) {
      case 0:
        return 10;
      case 1:
        return 30;
      case 2:
        return 100;
      case 3:
        return 3000;
      default:
        return 3000;
    }
  };

  const maxExp = getMaxExpForLevel(creature.level);

  return (
    <div className="MCreature">
      <p className="MCreatureName">{creature.name}</p>
      <p className="MCreatureterm">🤍 {creature.daysTogether}일째 함께하는 중</p>
      
      <img src={`data:image/gif;base64,${creature.image}`} alt="creature" />
      <div className="MCreatureInfo">
        <p className="MCreatureLv">Lv. {creature.level}</p>
        <div className="MCreatureExp">
          <p>EXP</p>
          +
          <progress value={creature.exp} max={maxExp}></progress>
        </div>
      </div>
    </div>
  );
};
 
export default Creature;
