import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faRotate } from '@fortawesome/free-solid-svg-icons';
import './CreatureResult.css';
import '../../assets/font/Font.css';
import { useDispatch, useSelector } from 'react-redux';
import catImage from '../../assets/images/test3.png';

const CreatureResult = () => {

  const { creatureName, photo } = useSelector((state) => state.auth);

  return (
    <div className="CreatureResultMain">
      <div className="CreatureResultContainer">
        <Link to="/CreatureCreate" className="backButton">
          <FontAwesomeIcon icon={faAngleLeft} size="2x" />
        </Link>
        <div className="CreatureResultNameContainer">
          <div className="CreatureResultName">{creatureName}</div>
        </div>
        <div className="CreatureResultHeader">
          <img src={photo} alt="Cat" className="CreatureResultImage" />
        </div>
        <Link to="/Main">
          <button type="submit" className="CreatureResultStartButton">Start</button>
        </Link>
        {/* <Link to="/CreatureResult" className="CreatureResultReloadButton">
          <button>
            <FontAwesomeIcon icon={faRotate} rotation={180} size="xl" style={{color: "#ffffff",}} />
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default CreatureResult;
