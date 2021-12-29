import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";

import Chat from "./Chat";
import NavBar from "./NavBar";

export default function ChatRoom() {
  const socketRef = useRef();
  const state = useSelector((state_) => state_);
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("info"));
    socketRef.current = io.connect("http://localhost:3001");
    socketRef.current.emit("onConnect", {
      name: state.username ? state.username : userInfo.name,
      id: state.id ? state.id : userInfo.id,
    });

    socketRef.current.on("newConnection", (msg) => {
      console.log(msg);
    });
  }, []);

  document.documentElement.style.setProperty("--background-color", "#526377");
  return (
    <div className="chatroom">
      <NavBar />
      <Chat />
    </div>
  );
}
