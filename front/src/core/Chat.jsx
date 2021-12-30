import React, { useRef, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import ConnectedUser from "./ConnectedUser";
import { SocketContext } from "../socket/SocketContext";
import MessagesDiv from "./MessagesDiv";
import { addToPersonalMessages } from "../helper/actionsFunctions";

export default function Chat() {
  const messageRef = useRef();
  const massagesWarperDiv = useRef();
  const dispatch = useDispatch();
  // Get Socket from context
  const socket = useContext(SocketContext);
  const state = useSelector((state_) => state_);

  const objDiv = massagesWarperDiv.current;

  const onSendClick = (e) => {
    e.preventDefault();
    if (state.messageTo_socketId === "global") {
      socket.emit("message", {
        name: state.username,
        id: state.id,
        message: messageRef.current.value,
      });
    } else {
      socket.emit("privateMessage", state.messageTo_socketId, {
        name: state.username,
        id: state.id,
        message: messageRef.current.value,
      });

      // ? Find my user to get socketId
      const myUser = state.connectedUsers.find((user) => user.id === state.id);

      // ? Add to personal messages
      dispatch(
        addToPersonalMessages(
          state.id,
          state.username,
          messageRef.current.value,
          new Date(),
          myUser.socketId,
          state.messageTo_socketId
        )
      );
    }

    // ? Erase message value after message
    messageRef.current.value = "";

    // ? Scroll down when sending new message
    setTimeout(() => {
      objDiv.scrollTop = objDiv.scrollHeight;
    }, 50);
  };

  const onKeyPressHandler = (e) => {
    if (e.code === "Enter") {
      onSendClick(e);
    }
  };

  return (
    <div className="warperChatDiv">
      <div className="usersOnlineDiv">
        <div className="usersOnlineHeaderDiv">
          <span className="usersOnlineText">Online Users</span>
        </div>
        <ConnectedUser
          key="1"
          name="Global Chat"
          id="1"
          socketId="global"
          isMyself={false}
        />
        {state.connectedUsers.map((user) => (
          <ConnectedUser
            key={user.id}
            name={user.name}
            id={user.id}
            isMyself={user.id === state.id}
            socketId={user.socketId}
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
        <MessagesDiv
          ref={massagesWarperDiv}
          messageTo_socketId={state.messageTo_socketId}
        />
        <div className="sendMassageDiv">
          <input
            ref={messageRef}
            onKeyUp={onKeyPressHandler}
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
