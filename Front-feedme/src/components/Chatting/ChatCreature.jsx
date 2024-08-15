import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../store/slice';
import { fetchUserData } from '../../store/userSlice';
import axios from 'axios';
import './ChatCreature.css';
import '../../assets/font/Font.css';

const ChatCreature = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');  // 입력창에 입력된 값을 관리
  const [chatHistory, setChatHistory] = useState([]);  // 채팅 기록을 관리
  
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken) {
      dispatch(setToken(sessionToken));
    } else {
      navigate('/login'); 
    }
  }, [dispatch, navigate]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [dispatch, token]);

  // 서버로 요청을 보내는 함수
  const handleSend = async () => {
    if (!inputValue.trim()) return; // 입력값이 없으면 요청하지 않음

    try {
      const response = await axios.get('https://i11b104.p.ssafy.io/api/api/chat/creature', {
        params: {
          ragQuestion: inputValue,
        },
        headers: {
          Authorization: `${token}`, // 인증 토큰 추가
        },
      });

      // 서버 응답을 채팅 기록에 추가
      setChatHistory(prevHistory => [
        ...prevHistory,
        { type: 'user', text: inputValue },
        { type: 'bot', text: response.data.ragData },
      ]);

      setInputValue(''); // 입력창 초기화
    } catch (error) {
      console.error('Error fetching chat data:', error);
    }
  };

  return (
    <div className="ChatCreatureMain">
      <div className="chat-window">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-message ${chat.type}`}>
            {chat.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="질문을 입력하세요..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatCreature;
