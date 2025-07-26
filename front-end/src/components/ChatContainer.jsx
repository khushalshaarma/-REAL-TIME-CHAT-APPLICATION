import React, { useEffect, useRef, useState } from "react";
import { FcComments } from "react-icons/fc";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import socketIOClient from "socket.io-client";

const ChatContainer = ({ user, setUser }) => {
  const [chats, setChats] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    // Connect to backend socket server
    socketRef.current = socketIOClient("http://localhost:3002");

    // Listen for initial chat history
    socketRef.current.on("chat", (chats) => {
      console.log("📦 Received initial chat history:", chats);
      setChats(chats);
    });

    // Listen for new messages from others
    socketRef.current.on("message", (msg) => {
      console.log("💬 New real-time message received:", msg);
      setChats((prevChats) => [...prevChats, msg]);
    });

    // Clean up on component unmount
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Send new message to server
  const addMessage = (chatText) => {
    const newChat = {
      username: user,
      message: chatText,
      avatar: localStorage.getItem("avatar"),
    };

    console.log("📤 Sending new message:", newChat);
    socketRef.current.emit("newMessage", newChat);
  };

  // Logout: clear storage and reset user
  const Logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <div className="home">
      <div className="chats_header">
        <h4>Username: {user}</h4>
        <p>
          <FcComments className="chats_icon" /> KHUSHALS ROOM
        </p>
        <p className="chats_logout" onClick={Logout}>
          <strong>Logout</strong>
        </p>
      </div>

      {/* List of all messages */}
      <ChatLists chats={chats} />

      {/* Input box to send new messages */}
      <InputText addMessage={addMessage} />
    </div>
  );
};

export default ChatContainer;
