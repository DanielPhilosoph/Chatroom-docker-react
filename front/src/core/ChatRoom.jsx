import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import PropTypes from "prop-types";

import Chat from "./Chat";
import NavBar from "./NavBar";

export default function ChatRoom({ username }) {
  const socketRef = useRef();
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:3001");
    socketRef.current.emit("onConnect", { name: username.toString() });

    socketRef.current.on("newConnection", (msg) => {
      console.log(msg);
    });
  }, []);

  document.documentElement.style.setProperty("--background-color", "#526377");
  return (
    <div className="chatroom">
      <NavBar />
      <Chat username={username} />
    </div>
  );
}

ChatRoom.propTypes = {
  username: PropTypes.string.isRequired,
};
