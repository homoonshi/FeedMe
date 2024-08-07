import React, { useState } from 'react';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import ChattingFriendList from './ChattingFriendList';
import ChattingFriendProfile from './ChattingFriendProfile';
import ChatWindow from './ChatWindow';
import Creature from '../Mypage/Creature';
import './Chat.css';
import '../../assets/font/Font.css';
import test1 from '../../assets/images/test1.png';

const Chat = () => {
  const [friends, setFriends] = useState([
    { id: 1, name: 'pi', avatar: test1 },
    { id: 2, name: '지나', avatar: test1 },
    { id: 3, name: '지수', avatar: test1 },
    { id: 4, name: '수보', avatar: test1 },
    { id: 5, name: '차미', avatar: test1 },
    { id: 6, name: '미푸', avatar: test1 },
    { id: 7, name: '미푸', avatar: test1 },
  ]);
  const [creatures, setCreatures] = useState([
    { id: 1, name: '불사조', daysTogether: 247, level: 1, exp: 50 }
  ]);
  const [selectedCreatureId, setSelectedCreatureId] = useState(null);

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [view, setView] = useState('profile');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setView(friend.id === 'my-avatar' ? 'creature' : 'profile');
  };

  const handleChatClick = (friend) => {
    setSelectedFriend(friend);
    setView('chat');
  };

  const handleDeleteFriend = (friend) => {
    setFriendToDelete(friend);
    setIsModalOpen(true);
  };

  const confirmDeleteFriend = () => {
    setFriends(friends.filter(friend => friend.id !== friendToDelete.id));
    setSelectedFriend(null);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFriendToDelete(null);
  };

  return (
    <div className="ChatBack">
      <div className="ChatBox">
        <Sidebar />
        <div className="ChatRight">
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
                    <ChattingFriendProfile friend={selectedFriend} onDelete={handleDeleteFriend} />
                  ) : view === 'chat' ? (
                    <ChatWindow friend={selectedFriend} />
                  ) : (
                    creatures.map(creature => (
                      <Creature key={creature.id} creature={creature} />
                    ))
                  )}
                </div>
              ) : (
                <div>친구를 선택하세요</div>
              )}
            </div>
          </div>
          <Search />
        </div>
      </div>

      {isModalOpen && (
        <div className="ChatModal">
          <div className="ChatModalContent">
            <p>정말로 친구를 삭제하시겠습니까?</p>
            <button className="ChatModalContentCancel" onClick={closeModal}>취소</button>
            <button className="ChatModalContentDel" onClick={confirmDeleteFriend}>삭제</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
