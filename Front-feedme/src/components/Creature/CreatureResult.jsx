import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faRotate } from '@fortawesome/free-solid-svg-icons';
import './CreatureResult.css';
import '../../assets/font/Font.css';
import { fetchUserData } from '../../store/userSlice';

const CreatureResult = () => {
  const dispatch = useDispatch();

  
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch, token]);
  
  const { creatureName, photo } = useSelector((state) => state.auth);
  
  console.log(user)
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
          <img src={`data:image/gif;base64,${photo}`} alt="Cat" className="CreatureResultImage" />
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
