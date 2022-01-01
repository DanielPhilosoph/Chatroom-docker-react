import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../helper/functions";

export default function Message({ isMyMessage, username, message, time, id }) {
  const formattedDate = formatDate(time);
  if (!isMyMessage) {
    return (
      <div className="message" id={id}>
        <span className="messageName">{username}</span>
        <span className="messageText">{message}</span>
        <span className="messageTime">{formattedDate}</span>
      </div>
    );
  }
  return (
    <div className="messageSelf" id={id}>
      <span className="messageNameSelf">{username}</span>
      <span className="messageText">{message}</span>
      <span className="messageTime">{formattedDate}</span>
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
