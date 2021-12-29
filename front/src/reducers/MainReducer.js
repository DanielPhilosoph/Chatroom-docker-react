const initialState = {
  username: "",
  id: "",
  connectedUsers: [], // {name: string, id: string}
  messages: [], // {name: string, id: string , message: string, time: Date}
};
export default function MainReducer(state = initialState, action = "") {
  switch (action.type) {
    case "SET_USERNAME_AND_ID":
      return {
        ...state,
        username: action.payload.username,
        id: action.payload.id,
      };
    case "REMOVE_CONNECTED_USER":
      return {
        ...state,
        connectedUsers: state.connectedUsers.filter(
          (connectedUser) => connectedUser.id !== action.payload.id
        ),
      };
    case "ADD_CONNECTED_USER":
      return {
        ...state,
        connectedUsers: [
          ...state.connectedUsers,
          { name: action.payload.name, id: action.payload.id },
        ],
      };
    case "SET_CONNECTED_USERS":
      return {
        ...state,
        connectedUsers: action.payload.connectedUsers,
      };
    case "ADD_TO_MESSAGES":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            type: action.payload.type,
            name: action.payload.name,
            id: action.payload.id,
            message: action.payload.message,
            time: action.payload.time,
          },
        ],
      };
    default:
      return state;
  }
}
