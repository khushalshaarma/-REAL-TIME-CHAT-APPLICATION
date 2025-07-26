import React, { useState } from 'react';
import UserLogin from './components/UserLogin'; // adjust path if needed
import ChatContainer from './components/ChatContainer';

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <div className="App">
      {/* Render ChatContainer when user is logged in */}
      {user ? (
        <ChatContainer user={user} setUser={setUser} />
      ) : (
        <UserLogin setUser={setUser} />
      )}
    </div>
  );
}
export default App;