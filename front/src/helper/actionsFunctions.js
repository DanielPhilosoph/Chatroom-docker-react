import {
  ADD_CONNECTED_USER,
  ADD_TO_MESSAGES,
  ADD_TO_PERSONAL_MESSAGES,
  REMOVE_CONNECTED_USER,
  SET_CHAT_STATE,
  SET_CONNECTED_USERS,
  SET_MESSAGE_TO_SOCKET_ID,
  SET_USERNAME_AND_ID,
} from "../Actions";

export function setUserNameAndId(id, username) {
  return {
    type: SET_USERNAME_AND_ID,
    payload: { username, id },
  };
}

export function removeConnectedUser(id) {
  return {
    type: REMOVE_CONNECTED_USER,
    payload: { id },
  };
}

export function addConnectedUser(id, name) {
  return {
    type: ADD_CONNECTED_USER,
    payload: { name, id },
  };
}

export function setConnectedUsers(connectedUsers) {
  return {
    type: SET_CONNECTED_USERS,
    payload: { connectedUsers },
  };
}

export function setChatState(sendTo, currentState) {
  return {
    type: SET_CHAT_STATE,
    payload: { currentState, sendTo },
  };
}

export function addToMessages(id, name, message, time, type) {
  return {
    type: ADD_TO_MESSAGES,
    payload: {
      type,
      name,
      id,
      message,
      time,
    },
  };
}

export function addToPersonalMessages(id, name, message, time, from, to) {
  return {
    type: ADD_TO_PERSONAL_MESSAGES,
    payload: {
      from,
      to,
      name,
      id,
      message,
      time,
    },
  };
}

export function setMessageToSocketId(socketId) {
  return {
    type: SET_MESSAGE_TO_SOCKET_ID,
    payload: { messageTo_socketId: socketId },
  };
}
