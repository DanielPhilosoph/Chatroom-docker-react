import React from "react";
import PropTypes from "prop-types";

export default function ConnectedUser({ name, id, socketId }) {
  return (
    <div className="connectedUserDiv" name={id} data-xx={socketId}>
      <div className="connectedUserImgDiv">
        <img className="connectedUserImg" src="/images/person.png" alt="img" />
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
