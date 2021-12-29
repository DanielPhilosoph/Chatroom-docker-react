import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "../helper/functions";

export default function SpecialMessage({ type, name, time }) {
  const formattedDate = formatDate(time);
  let className;
  let message;
  switch (type) {
    case "disconnect":
      className = "disconnectMessage";
      message = "has disconnected";
      break;
    case "connected":
      className = "connectedMessage";
      message = "has connected";
      break;

    default:
      break;
  }
  return (
    <div className={className}>
      <span className="messageTextSpecial">{`${name} ${message}`}</span>
      <span className="messageTimeSpecial">{formattedDate}</span>
    </div>
  );
}

SpecialMessage.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};
