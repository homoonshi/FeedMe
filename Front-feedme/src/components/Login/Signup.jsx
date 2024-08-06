import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div>
      <p>닉네임<input></input></p>
      <p>이메일<input></input></p>
      <p>생일</p>
      <button>
        <Link to="/CreatureCreate">다음</Link>
      </button>
    </div>
  );
};

export default Signup;