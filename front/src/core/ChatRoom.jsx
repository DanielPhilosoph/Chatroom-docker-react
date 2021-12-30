import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Chat from "./Chat";
import NavBar from "./NavBar";
import {
  addToMessages,
  addToPersonalMessages,
  removeConnectedUser,
  setConnectedUsers,
  setUserNameAndId,
} from "../helper/actionsFunctions";
import { socket, SocketContext } from "../socket/SocketContext";

export default function ChatRoom() {
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

    socket.emit("onConnect", {
      name: state.username !== "" ? state.username : userInfo.name,
      id: state.id !== "" ? state.id : userInfo.id,
    });

    socket.on("newConnection", (msg) => {
      dispatch(addToMessages(msg.id, msg.name, "", msg.time, "connect"));
      dispatch(setConnectedUsers(msg.connectedUsers));
    });

    socket.on("messageBack", (msg) => {
      dispatch(
        addToMessages(msg.id, msg.name, msg.message, msg.time, "regular")
      );
    });

    socket.on("userDisconnect", (msg) => {
      dispatch(addToMessages(msg.id, msg.name, "", msg.time, "disconnect"));
      dispatch(removeConnectedUser(msg.id));
    });

    socket.on("privateMessage", (msg) => {
      dispatch(
        addToPersonalMessages(
          msg.id,
          msg.name,
          msg.message,
          msg.time,
          msg.from,
          msg.to
        )
      );
    });
  }, []);

  document.documentElement.style.setProperty("--background-color", "#526377");
  return (
    <div className="chatroom">
      <SocketContext.Provider value={socket}>
        <NavBar />
        <Chat />
      </SocketContext.Provider>
    </div>
  );
}
