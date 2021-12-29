import React, { useRef } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import Message from "./Message";
import SpecialMessage from "./SpecialMessage";
import ConnectedUser from "./ConnectedUser";

export default function Chat({ socketRef }) {
  const messageRef = useRef();
  const state = useSelector((state_) => state_);

  const onSendClick = (e) => {
    e.preventDefault();
    socketRef.current.emit("message", {
      name: state.username,
      id: state.id,
      message: messageRef.current.value,
    });
  };

  return (
    <div className="warperChatDiv">
      <div className="usersOnlineDiv">
        <div className="usersOnlineHeaderDiv">
          <span className="usersOnlineText">Online Users</span>
        </div>
        {state.connectedUsers.map((user) => (
          <ConnectedUser
            key={user.id}
            name={user.name}
            id={user.id}
            socketId="socketId"
          />
        ))}
      </div>
      <div className="chatDiv">
        <div className="chatHeaderDiv">
          <img className="chatLogo" src="/images/chat.png" alt="Img" />
          <span className="chatHeaderText">Chat</span>
        </div>
        {/*
        // TODO when talking to someone private - should change to load private messages
        // TODO when to many messages, show create a scroll
        */}
        <div className="massagesWarperDiv">
          {state.messages.map((message) => {
            switch (message.type) {
              case "regular":
                return (
                  <Message
                    key={message.time}
                    isMyMessage={message.id === state.id}
                    username={message.name}
                    message={message.message}
                    time={message.time}
                    id={message.id}
                  />
                );
              case "connect":
                return (
                  <SpecialMessage
                    key={message.time}
                    type="connected"
                    name={message.name}
                    time={message.time}
                    id={message.id}
                  />
                );
              case "disconnect":
                return (
                  <SpecialMessage
                    key={message.time}
                    type="disconnect"
                    name={message.name}
                    time={message.time}
                    id={message.id}
                  />
                );
              default:
                return "";
            }
          })}
        </div>
        <div className="sendMassageDiv">
          <input
            ref={messageRef}
            type="text"
            className="messageInput"
            placeholder="Type a message..."
          />
          <button onClick={onSendClick} type="submit" className="sendButton">
            <i className="fas fa-arrow-right" />
          </button>
        </div>
      </div>
    </div>
  );
}

Chat.propTypes = {
  socketRef: PropTypes.func.isRequired,
};
