/* eslint-disable operator-linebreak */
import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import SpecialMessage from "./SpecialMessage";

const MessagesDiv = React.forwardRef((props, ref) => {
  const state = useSelector((state_) => state_);
  console.log(state);
  if (state.chatState === "global") {
    return (
      <div ref={ref} className="massagesWarperDiv">
        {state.messages.map((message) => {
          switch (message.type) {
            case "regular":
              return (
                <Message
                  key={message.time}
                  isMyMessage={message.id === state.id}
                  username={message.name}
                  message={message.message}
                  time={message.time.toString()}
                  id={message.id}
                />
              );
            case "connect":
              return (
                <SpecialMessage
                  key={message.time}
                  type="connected"
                  name={message.name}
                  time={message.time.toString()}
                  id={message.id}
                />
              );
            case "disconnect":
              return (
                <SpecialMessage
                  key={message.time}
                  type="disconnect"
                  name={message.name}
                  time={message.time.toString()}
                  id={message.id}
                />
              );
            default:
              return "";
          }
        })}
      </div>
    );
  }
  if (state.chatState === "person") {
    return (
      <div ref={ref} className="massagesWarperDiv">
        {state.personalMessages.map((personalMessage) => {
          if (
            personalMessage.to === state.messageTo_socketId ||
            personalMessage.from === state.messageTo_socketId
          ) {
            return (
              <Message
                key={personalMessage.time}
                isMyMessage={personalMessage.id === state.id}
                username={personalMessage.name}
                message={personalMessage.message}
                time={personalMessage.time.toString()}
                id={personalMessage.id}
              />
            );
          }
          return "";
        })}
      </div>
    );
  }
  if (state.chatState === "myself") {
    return (
      <div ref={ref} className="massagesWarperDiv">
        {state.personalMessages.map((personalMessage) => {
          if (
            personalMessage.to === state.messageTo_socketId &&
            personalMessage.from === state.messageTo_socketId
          ) {
            return (
              <Message
                key={personalMessage.time}
                isMyMessage={personalMessage.id === state.id}
                username={personalMessage.name}
                message={personalMessage.message}
                time={personalMessage.time.toString()}
                id={personalMessage.id}
              />
            );
          }
          return "";
        })}
      </div>
    );
  }
  return "";
});

export default MessagesDiv;
