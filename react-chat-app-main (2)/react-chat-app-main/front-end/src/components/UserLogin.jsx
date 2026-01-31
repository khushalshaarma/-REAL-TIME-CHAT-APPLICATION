import { useState } from 'react';
import { FaReact } from 'react-icons/fa6';
import '../style.css';
import _ from 'lodash'; // Optional (only needed if you're using lodash functions)
import PropTypes from 'prop-types';

const UserLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    const trimmedName = _.trim(username); // using lodash here
    if (trimmedName) {
      localStorage.setItem("user", trimmedName); // Optional: store directly here
      onLogin(trimmedName);
    }
  };

  return (
    <div className="login_container">
      <h2>
        <FaReact /> Join the Chat
      </h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleLogin}>Join</button>
    </div>
  );
};

UserLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default UserLogin;
