import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

export default function Chat() {
  const state = useSelector((state_) => state_);
  console.log(state);
  return (
    <div className="warperChatDiv">
      <div className="usersOnlineDiv">
        <div className="usersOnlineHeaderDiv">
          <span className="usersOnlineText">Online Users</span>
        </div>
      </div>
      <div className="chatDiv">
        <div className="chatHeaderDiv">
          <img className="chatLogo" src="/images/chat.png" alt="Img" />
          <span className="chatHeaderText">Chat</span>
        </div>
        <div className="massagesWarperDiv">
          {" "}
          <Message
            isMyMessage={false}
            username="daniel"
            message="Im a"
            time="12:12"
            id="insomnia"
          />

        </div>
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
