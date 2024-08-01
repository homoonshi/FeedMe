import React from 'react';
import Louvre from '../../assets/images/Louvre.JPG';

const Creature = () => {
    
    // 이미지 사이즈 조정 삭제해도 됨
    const sample = {
        width:"100px",
        height:'100px',
        objectFit:"cover"
      }

  return (
    <div>
      <h2>Lv. 1</h2>
      <img src={Louvre} alt="creature" style={sample}/>
      <p>EXP <progress value="50" max="100"></progress></p>
    </div>
  );
};

export default Creature;
