import React, { useState } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import ChattingFriendList from './ChattingFriendList';
import ChattingFriendProfile from './ChattingFriendProfile';
import ChatWindow from './ChatWindow';
import Creature from '../Mypage/Creature';
import './Chat.css';
import test1 from '../../assets/images/test1.png';

const Chat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [view, setView] = useState('profile');

  const friends = [
    { id: 1, name: 'pi', avatar: test1 },
    { id: 2, name: '지나', avatar: test1 },
    { id: 3, name: '지수', avatar: test1 },
    { id: 4, name: '수보', avatar: test1 },
    { id: 5, name: '차미', avatar: test1 },
    { id: 6, name: '미푸', avatar: test1 },
    { id: 7, name: '미푸', avatar: test1 },
  ];

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setView(friend.id === 'my-avatar' ? 'creature' : 'profile');
  };

  const handleChatClick = (friend) => {
    setSelectedFriend(friend);
    setView('chat');
  };

  return (
    <div className="ChatBack">
      <div className="ChatBox">
        <Sidebar />
        <div className="ChatRight">
          <Search />
          <div className="ChatRightContents">
            <div className="ChatFriendList">
              <ChattingFriendList
                friends={friends}
                onFriendClick={handleFriendClick}
                onChatClick={handleChatClick}
              />
            </div>

            <div className="ChatDetail">
              {selectedFriend ? (
                <div className="ChatDetailInner">
                  {view === 'profile' ? (
                    <ChattingFriendProfile friend={selectedFriend} />
                  ) : view === 'chat' ? (
                    <ChatWindow friend={selectedFriend} />
                  ) : (
                    <Creature />
                  )}
                </div>
              ) : (
                <div>친구를 선택하세요</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
