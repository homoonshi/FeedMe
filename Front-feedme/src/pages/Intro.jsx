import React from 'react';
import { Link } from 'react-router-dom';
import './Intro.css'
import '../assets/font/Font.css'

const Intro = () => {
  return (
    <div className="Intro">
      <div className="IntroChild">
        <h1 className="IntroLogo">Feed Me</h1>
        <div className="IntroClickWrapper">
          <button class="w-btn w-btn-gra1">
            <Link to='/Login'>Click</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;