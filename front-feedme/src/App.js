import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Intro from './pages/Intro.jsx';
import Login from './pages/Login.jsx';
import Signup from './components/Login/Signup.jsx';
import CreatureCreate from './components/Creature/CreatureCreate.jsx'
import CreatureResult from './components/Creature/CreatureResult.jsx';
import Main from './pages/Main.jsx';
import Todo from './components/Todo/Todo.jsx';
import Diary from './components/Diary/Diary.jsx';
import Chat from './components/Chatting/Chat.jsx';
import Setting from './components/Set/Setting.jsx';
import MyPage from './components/Mypage/MyPage.jsx';

function App() {
  return (
    <div>
      
      {/* 로그인 하면서 수정할 버튼 */}
      {/* <button>
        <Link to="/">Intro</Link>
      </button>
      <button>
        <Link to="/Main">main</Link>
      </button> */}
      {/*  */}

      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/CreatureCreate" element={<CreatureCreate />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Todo" element={<Todo />} />
        <Route path="/Diary" element={<Diary />} />
        <Route path="/Chatting" element={<Chat />} />
        <Route path="/Setting" element={<Setting />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/CreatureResult" element={<CreatureResult />} />
      </Routes>
    </div>
  );
}

export default App;

