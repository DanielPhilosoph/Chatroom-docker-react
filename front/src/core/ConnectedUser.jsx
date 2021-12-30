import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setMessageToSocketId } from "../helper/actionsFunctions";

export default function ConnectedUser({ name, id, socketId }) {
  const dispatch = useDispatch();

  let src = "/images/person.png";
  if (name === "Global Chat") {
    src = "/images/chat_1.png";
  }

  const onUserClick = (e) => {
    e.preventDefault();
    dispatch(setMessageToSocketId(socketId));
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.code === "Enter") {
      onUserClick(e);
    }
  };

  return (
    <div
      tabIndex={0}
      role="button"
      className="connectedUserDiv"
      name={id}
      onKeyUp={handleKeyUp}
      onClick={onUserClick}
    >
      <div className="connectedUserImgDiv">
        <img className="connectedUserImg" src={src} alt="img" />
      </div>
      <div className="connectedUserName">{name}</div>
    </div>
  );
}

ConnectedUser.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  socketId: PropTypes.string.isRequired,
};
