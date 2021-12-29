import React from "react";
import PropTypes from "prop-types";

export default function Chat({ username }) {
  return (
    <div className="warperChatDiv">
      <div className="usersOnlineDiv">
        <div className="usersOnlineHeaderDiv">
          <span className="usersOnlineText">Online Users</span>
        </div>
        <div>{username}</div>
      </div>
      <div className="chatDiv">
        <div className="chatHeaderDiv">
          <img className="chatLogo" src="/images/chat.png" alt="Img" />
          <span className="chatHeaderText">Chat</span>
        </div>
        <div className="massagesWarperDiv">sss</div>
        <div className="sendMassageDiv">
          <input
            type="text"
            className="messageInput"
            placeholder="Type a message..."
          />
          <button type="submit" className="sendButton">
            <i className="far fa-paper-plane" />
          </button>
        </div>
      </div>
    </div>
  );
}

Chat.propTypes = {
  username: PropTypes.string.isRequired,
};
