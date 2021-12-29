import React from "react";
import PropTypes from "prop-types";

export default function Message(
  {
    isMyMessage,
    username,
    message,
    time,
    id
  }
) {
  if (!isMyMessage) {
    return (
      <div className="message" id={id}>
        <span className="messageName">{username}</span>
        <span className="messageText">{message}</span>
        <span className="messageTime">{time}</span>
      </div>
    );
  }
  return (
    <div className="messageSelf" id={id}>
      <span className="messageNameSelf">{username}</span>
      <span className="messageTextSelf">{message}</span>
      <span className="messageTimeSelf">{time}</span>
    </div>
  );
}

Message.propTypes = {
  isMyMessage: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
