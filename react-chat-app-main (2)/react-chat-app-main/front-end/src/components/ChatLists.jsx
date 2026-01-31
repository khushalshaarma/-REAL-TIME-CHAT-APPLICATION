import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';

const ChatLists = ({ chats, currentUser }) => {
  const endOfMessages = useRef();

  useEffect(() => {
    endOfMessages.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const SenderChat = ({ message, username, avatar }) => (
    <div className="chat_sender">
      <img src={avatar} alt="" />
      <p>
        <strong>{username}</strong> <br />
        {message}
      </p>
    </div>
  );

  SenderChat.propTypes = {
    message: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  };

  const ReceiverChat = ({ message, username, avatar }) => (
    <div className="chat_receiver">
      <img src={avatar} alt="" />
      <p>
        <strong>{username}</strong> <br />
        {message}
      </p>
    </div>
  );

  ReceiverChat.propTypes = {
    message: PropTypes.string,
    username: PropTypes.string,
    avatar: PropTypes.string,
  };

  return (
    <div className="chats_list">
      {chats.map((chat, index) =>
        chat.username === currentUser ? (
          <SenderChat
            key={index}
            message={chat.message}
            username={chat.username}
            avatar={chat.avatar}
          />
        ) : (
          <ReceiverChat
            key={index}
            message={chat.message}
            username={chat.username}
            avatar={chat.avatar}
          />
        )
      )}
      <div ref={endOfMessages}></div>
    </div>
  );
};

ChatLists.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.object),
  currentUser: PropTypes.string,
};

export default ChatLists;
