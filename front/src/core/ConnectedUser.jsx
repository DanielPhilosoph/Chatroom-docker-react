import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setChatState, setMessageToSocketId } from "../helper/actionsFunctions";

export default function ConnectedUser({ name, id, socketId, isMyself }) {
  const dispatch = useDispatch();

  let src = "/images/person.png";
  if (name === "Global Chat") {
    src = "/images/chat_1.png";
  }

  const onUserClick = (e) => {
    e.preventDefault();
    dispatch(setMessageToSocketId(socketId));
    let chatState = "person";
    if (isMyself) {
      chatState = "myself";
    } else if (socketId === "global") {
      chatState = "global";
    }
    dispatch(setChatState(chatState));
  };

  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.code === "Enter") {
      onUserClick(e);
    }
  };

  let myself = "";
  if (isMyself) {
    myself = "(yourself)";
  }

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
      <div className="connectedUserName">{`${name} ${myself}`}</div>
    </div>
  );
}

ConnectedUser.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  socketId: PropTypes.string.isRequired,
  isMyself: PropTypes.bool.isRequired,
};
