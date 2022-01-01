const initialState = {
  username: "",
  id: "",
  connectedUsers: [], // {name: string, id: string}
  messages: [], // {name: string, id: string , message: string, time: Date}
  personalMessages: [],
  messageTo_socketId: "global", // should contain socketId
  chatState: { sendTo: "everyone", currentState: "global" }, // contain the chat state (what should be displayed)
};
export default function MainReducer(state = initialState, action = "") {
  switch (action.type) {
    case "SET_CHAT_STATE":
      return {
        ...state,
        chatState: {
          sendTo: action.payload.sendTo,
          currentState: action.payload.currentState,
        },
      };
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
    case "ADD_TO_PERSONAL_MESSAGES":
      return {
        ...state,
        personalMessages: [
          ...state.personalMessages,
          {
            from: action.payload.from,
            to: action.payload.to,
            name: action.payload.name,
            id: action.payload.id,
            message: action.payload.message,
            time: action.payload.time,
          },
        ],
      };
    case "SET_MESSAGE_TO_SOCKET_ID":
      return {
        ...state,
        messageTo_socketId: action.payload.messageTo_socketId,
      };
    default:
      return state;
  }
}
