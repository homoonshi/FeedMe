import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../store/slice';
import { fetchUserData } from '../../store/userSlice';
import { fetchFriendsList, updateFriendsList } from '../../store/friendsSlice';
import { fetchFriendInfo } from '../../store/friendInfoSlice';
import Sidebar from '../Main/Sidebar';
import Search from '../Main/Search';
import ChattingFriendList from './ChattingFriendList';
import ChattingFriendProfile from './ChattingFriendProfile';
import ChatWindow from './ChatWindow';
import Creature from '../Mypage/Creature';
import ChatCreature from './ChatCreature';
import './Chat.css';
import '../../assets/font/Font.css';
import { EventSourcePolyfill } from 'event-source-polyfill';

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user);
  const friendsList = useSelector((state) => state.friends.list || []); // 안전하게 접근
  const friendsStatus = useSelector((state) => state.friends.status || 'idle'); // 안전하게 접근
  const selectedFriendInfo = useSelector((state) => state.friendInfo);

  const { creatureId, creatureName, exp, level, image, togetherDay } = user;

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [view, setView] = useState('profile');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendToDelete, setFriendToDelete] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const sessionToken = sessionStorage.getItem('accessToken');
    if (sessionToken) {
      dispatch(setToken(sessionToken));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
      dispatch(fetchFriendsList(token)).then((response) => {
        if (response.meta.requestStatus === 'fulfilled') {
          console.log('Friends list loaded successfully:', response.payload);
        } else if (response.meta.requestStatus === 'rejected') {
          console.error('Failed to load friends list:', response.payload);
        }
      });
    }
  }, [dispatch, token]);

  useEffect(() => {
    console.log('Current friends list:', friendsList);
    console.log('Current friends status:', friendsStatus);
    const friend = [...firends];
    friendList.forEach(f => {
      const {friendId, counterpartNickname, avatar, isChecked, receiveTime} = f;
      friend.push(f);
    })
    setFriends(friend);
  }, [friendsList, friendsStatus]);

  useEffect(() => {
    if (token) {
      const eventSource = new EventSourcePolyfill('https://i11b104.p.ssafy.io/api/alarms/subscribe/chat', {
        headers: {
          'Authorization': `${token}`,
        },
      });

      eventSource.addEventListener('chattingRoom', (event) => {
        const newChat = JSON.parse(event.data);
        dispatch(updateFriendsList(newChat));
      });

      return () => {
        eventSource.close();
      };
    }
  }, [dispatch, token]);

  const handleFriendClick = (friend) => {
    setSelectedFriend(friend);
    setView(friend.isCreature ? 'creatureChat' : friend.id === 'my-avatar' ? 'creature' : 'profile');
    if (friend.id !== 'my-avatar' && !friend.isCreature) {
      dispatch(fetchFriendInfo({ token, counterpartNickname: friend.counterpartNickname }));
    }
  };

  const handleChatClick = (friend) => {
    if (selectedFriend && selectedFriend.friendId === friend.friendId && view === 'chat') {
      return;
    }

    setSelectedFriend(null);
    setView(null);

    setTimeout(() => {
      setSelectedFriend(friend);
      setView('chat');
    }, 0);
  };

  const handleDeleteFriend = (friend) => {
    setFriendToDelete(friend);
    setIsModalOpen(true);
  };

  const confirmDeleteFriend = () => {
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
                  {view === 'profile' && (
                    <ChattingFriendProfile friend={selectedFriendInfo} onDelete={handleDeleteFriend} />
                  )}
                  {view === 'chat' && (
                    <ChatWindow roomId={selectedFriend.friendId} />
                  )}
                  {view === 'creature' && (
                    <Creature
                      creature={{ id: creatureId, name: creatureName, daysTogether: togetherDay, level, exp, image }}
                    />
                  )}
                  {view === 'creatureChat' && (
                    <ChatCreature 
                      user={user}
                    /> 
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
