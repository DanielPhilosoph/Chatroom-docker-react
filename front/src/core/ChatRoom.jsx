import React from "react";
import Chat from "./Chat";
import NavBar from "./NavBar";

export default function ChatRoom() {
  document.documentElement.style.setProperty("--background-color", "#526377");
  return (
    <div className="chatroom">
      <NavBar />
      <Chat />
    </div>
  );
}
