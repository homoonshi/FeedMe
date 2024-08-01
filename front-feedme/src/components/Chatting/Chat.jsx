import React, { useState } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import ChattingFriendList from './ChattingFriendList';
import ChattingFriendProfile from './ChattingFriendProfile';
import ChatWindow from './ChatWindow';
import './Chat.css';
import test1 from '../../assets/images/test1.png';

const Chat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [view, setView] = useState('profile');

  const friends = [
    { id: 1, name: 'pi', avatar: test1 },
    { id: 2, name: '지나', avatar: test1 },
    ];

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setView('profile');
  };

  const handleChatClick = (friend) => {
    setSelectedFriend(friend);
    setView('chat');
  };

  return (
    <div className="ChatContainer">
      <Sidebar />

      <div className="ChatMain">
        <Search />
        <div className="ChatDashboard">
        <div className="ChatFriendList">
          <ChattingFriendList
            friends={friends}
            onFriendClick={handleFriendClick}
            onChatClick={handleChatClick}
          />
        </div>

        <div className="ChatDetail">
          {selectedFriend ? (
            view === 'profile' ? (
              <ChattingFriendProfile friend={selectedFriend} />
            ) : (
              <ChatWindow friend={selectedFriend} />
            )
          ) : (
            <div>친구를 선택하세요</div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
