import React, { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";

import Chat from "./Chat";
import NavBar from "./NavBar";
import {
  addToMessages,
  removeConnectedUser,
  setConnectedUsers,
  setUserNameAndId,
} from "../helper/actionsFunctions";

export default function ChatRoom() {
  const socketRef = useRef();
  const state = useSelector((state_) => state_);
  const dispatch = useDispatch();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("info"));
    // TODO fix working with localStorage, need to figure out a way to deal with refresh
    // TODO show fix my problems with multiple connection
    // ? If state is null (probably refresh), so take from local storage
    if (state.username === "" || state.id === "") {
      dispatch(setUserNameAndId(userInfo.id, userInfo.name));
    }
    socketRef.current = io.connect("http://localhost:3001");
    socketRef.current.emit("onConnect", {
      name: state.username !== "" ? state.username : userInfo.name,
      id: state.id !== "" ? state.id : userInfo.id,
    });

    socketRef.current.on("newConnection", (msg) => {
      dispatch(addToMessages(msg.id, msg.name, "", msg.time, "connect"));
      dispatch(setConnectedUsers(msg.connectedUsers));
    });

    socketRef.current.on("messageBack", (msg) => {
      dispatch(
        addToMessages(msg.id, msg.name, msg.message, msg.time, "regular")
      );
    });

    socketRef.current.on("userDisconnect", (msg) => {
      dispatch(addToMessages(msg.id, msg.name, "", msg.time, "disconnect"));
      dispatch(removeConnectedUser(msg.id));
    });

    // TODO should get a private MSG from someone
    // TODO add to general state as ${name}ChatMessages.
    socketRef.current.on("privateMessage", (msg) => {
      console.log(msg);
    });
  }, []);

  document.documentElement.style.setProperty("--background-color", "#526377");
  return (
    <div className="chatroom">
      <NavBar />
      <Chat socketRef={socketRef} />
    </div>
  );
}
