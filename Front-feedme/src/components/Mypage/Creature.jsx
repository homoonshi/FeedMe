import React from 'react';
import CreatureImage from '../../assets/images/test1.png';
import './Creature.css';
import '../../assets/font/Font.css'

const Creature = () => {
  return (
    <div className="MCreature">
      <p className="MCreatureName">불사조</p>
      <p className="MCreatureterm">🤍 247일째 함께하는 중</p>
      <img src={CreatureImage} alt="creature" />
      <div className="MCreatureInfo">
        <p className="MCreatureLv">Lv. 1</p>
        <div className="MCreatureExp">
          <p>EXP</p>
          <progress value="50" max="100"></progress>
        </div>
      </div>
    </div>
  );
};

export default Creature;
