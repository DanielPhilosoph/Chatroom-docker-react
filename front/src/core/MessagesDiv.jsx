import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import SpecialMessage from "./SpecialMessage";

const MessagesDiv = React.forwardRef((props, ref) => {
  const state = useSelector((state_) => state_);
  console.log(state);
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
  );
});

export default MessagesDiv;
