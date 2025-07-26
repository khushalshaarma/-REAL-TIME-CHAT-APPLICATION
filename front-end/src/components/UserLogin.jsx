import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa6';
import '../style.css';
import _ from 'lodash';

const UserLogin = ({ setUser }) => {
  const [userName, setUserName] = useState('');

  const handleUser = () => {
    if (!userName.trim()) return;

    // Generate avatar URL first
    const avatarUrl = `https://picsum.photos/id/${_.random(1, 1000)}/200/300`;

    // Save to localStorage
    localStorage.setItem('user', userName);
    localStorage.setItem('avatar', avatarUrl);

    // Optional debug
    console.log("✅ Logged in as:", userName, "Avatar:", avatarUrl);

    // Then update state
    setUser(userName);
  };

  return (
    <div className="login_container">
      <div className="login_title">
        <FaReact className="login_icon" />
        <h1>Live Messenger</h1>
        <p>Login to start chatting</p>
      </div>
      <div className="login_form">
        <input
          type="text"
          placeholder="Enter a Unique Name"
          onChange={(e) => setUserName(e.target.value)}
        />
        <button onClick={handleUser}>Login</button>
      </div>
    </div>
  );
};

export default UserLogin;
