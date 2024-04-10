import { createContext, useReducer } from "react";
export const onlineChatsContext = createContext();
const chatsReducer = (state, action) => {
  switch (action.type) {
    case "NEW USER":
      return { users: [...state.users, ...action.payload] };
    case "USERS":
      return { users: action.payload };
    case "REMOVE USER":
      return {
        users: state.users.filter((u) => {
          return u.username.toLowerCase() !== action.payload.toLowerCase();
        }),
      };
    default:
      return state;
  }
};
export const OnlineChatsContenxtProvider = ({ children }) => {
  const [chats, reducer] = useReducer(chatsReducer, { users: [] });

  return (
    <onlineChatsContext.Provider
      value={{ chats: [...chats.users], setChats: reducer }}
    >
      {children}
    </onlineChatsContext.Provider>
  );
};
