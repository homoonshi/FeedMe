import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const ChatWindow = ({ roomId }) => {
  const [username, setUsername] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const messageContainerRef = useRef(null);
  const stompClient = useRef(null);
  const isSubscribed = useRef(false);

  const limit = 10;

  useEffect(() => {
    if (roomId) {
      console.log('Room ID:', roomId); // roomId가 올바르게 전달되었는지 확인
      connect();
    }
    return () => {
      disconnect();
    };
  }, [roomId]); // roomId가 변경될 때마다 새로 연결되도록 설정

  const connect = () => {
    if (!roomId || stompClient.current) return; // roomId가 null이거나 이미 연결되어 있는지 확인

    const socket = new SockJS('http://localhost:8080/ws/friendChat');
    stompClient.current = new Client({
        webSocketFactory: () => socket,
        debug: (str) => {
            console.log(str);
        },
        onConnect: (frame) => {
            console.log('Connected: ' + frame);

            if (stompClient.current && !isSubscribed.current) {
                stompClient.current.subscribe(`/chatRoom/messages/${roomId}`, (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    showMessage(receivedMessage);
                });

                stompClient.current.subscribe(`/chatRoom/loadMessages/${roomId}`, (message) => {
                    const slice = JSON.parse(message.body);
                    const newMessages = slice.content || [];
                    if (newMessages.length === 0) {
                        setHasMore(false);
                    } else {
                        setMessages((prevMessages) => [...newMessages.reverse(), ...prevMessages]);
                        setSkip((prevSkip) => prevSkip + limit);
                    }
                    setHasMore(!slice.last);
                });

                isSubscribed.current = true;
            }

            fetchMoreData(); // 초기 데이터 로드
        },
        onStompError: (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        },
        onDisconnect: () => {
            console.log("Disconnected");
            isSubscribed.current = false;
            stompClient.current = null;
        },
        reconnectDelay: 1000
    });

    stompClient.current.activate();
  };

  const disconnect = () => {
    if (stompClient.current) {
      stompClient.current.deactivate();
      stompClient.current = null;
    }
    console.log("Disconnected");
  };

  const sendMessage = () => {
    if (stompClient.current && messageContent.trim() !== '') {
      stompClient.current.publish({
        destination: `/chat/messages/${roomId}`,
        body: JSON.stringify({
          'sendId': username,
          'content': messageContent
        })
      });
      setMessageContent('');
    }
  };

  const fetchMoreData = () => {
    if (stompClient.current && hasMore) {
      stompClient.current.publish({
        destination: `/chat/loadMessages/${roomId}`,
        body: JSON.stringify({
          'skip': skip,
          'limit': limit
        })
      });
    }
  };

  const handleScroll = () => {
    if (messageContainerRef.current.scrollTop === 0 && hasMore) {
      fetchMoreData();
    }
  };

  const showMessage = (message) => {
    console.log("Received message:", message);
    const parsedMessage = JSON.parse(message.message);
    setMessages((prevMessages) => [...prevMessages, parsedMessage]);
    
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
        />
        <br />
        <input
          type="text"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <div
        id="messageContainer"
        style={{ height: '40vh', overflow: 'auto', border: '1px solid black', padding: '10px' }}
        ref={messageContainerRef}
        onScroll={handleScroll}
      >
        {messages.map((message, index) => (
          <div key={index} className="message" style={{ padding: '5px', borderBottom: '1px solid #ddd' }}>
            {message.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
