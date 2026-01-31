import { useEffect, useState } from "react";
import ChatLists from "./ChatLists";
import InputText from "./InputText";
import UserLogin from "./UserLogin";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:3002");

const ChatContainer = () => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [chats, setChats] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to server");
    });

    socket.on("chat", (messages) => {
      setChats(messages);
    });

    socket.on("message", (msg) => {
      setChats((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("connect");
      socket.off("chat");
      socket.off("message");
    };
  }, []);

  const addMessage = (text) => {
    const msg = {
      message: text,
      username: user,
      avatar: `https://i.pravatar.cc/40?u=${user}`,
      timeStamp: new Date().toISOString()
    };
    socket.emit("newMessage", msg);
    setChats((prev) => [...prev, msg]);
  };

  const handleLogin = (username) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  if (!user) return <UserLogin onLogin={handleLogin} />;

  return (
    <div className="App">
      <ChatLists chats={chats} />
      <InputText addMessage={addMessage} />
    </div>
  );
};

export default ChatContainer;
