import {
  ADD_CONNECTED_USER,
  ADD_TO_MESSAGES,
  REMOVE_CONNECTED_USER,
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

export function addToMessages(id, name, message, time) {
  return {
    type: ADD_TO_MESSAGES,
    payload: {
      name,
      id,
      message,
      time,
    },
  };
}
