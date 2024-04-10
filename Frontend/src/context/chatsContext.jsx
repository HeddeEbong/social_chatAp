import { createContext, useEffect, useReducer } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";
import { getMyMessage } from "../hooks/getMyMessage";
import useSelectedUser from "../hooks/useSelectedUserContext";

export const recentChatsContext = createContext();
const chatsReducer = (state, action) => {
  switch (action.type) {
    case "NEW CHAT":
      return { recentChats: [...state.recentChats, ...action.payload] };
    case "SET CHATS":
      return { recentChats: action.payload };
    case "DELETE CHATS":
      return {
        chats: state.recentChats.filter((rchat) => {
          return rchat.username !== action.payload;
        }),
      };
    case "ADD_NEW_MESSAGE":
      const { from } = action.payload;
      const index = state.recentChats.findIndex(
        (chat) => chat.username === from
      );
      if (index !== -1) {
        const updatedChat = {
          ...state.recentChats[index],
          newMessages: state.recentChats[index].newMessages + 1,
          lastmss: { ...state.recentChats[index].lastmss },
        };
        const updatedRecentChats = [
          ...state.recentChats.slice(0, index),
          updatedChat,
          ...state.recentChats.slice(index + 1),
        ];
        console.log("updated chat", updatedRecentChats);
        return { ...state, recentChats: updatedRecentChats };
      }
      return state;
    default:
      return state;
  }
};
export const RecentChatsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatsReducer, { recentChats: [] });
  const { user } = useAuthContext();
  const { messages } = useMessageContext();
  const {selectedUser}=useSelectedUser()

  useEffect(() => {
    let users = [];
    let recentChats = [];
    if (user) {
      messages.forEach((m) => {
        // getting users
        users.push(
          user.username.toLowerCase() === m.from.toLowerCase()
            ? !users.includes(m.to) && m.to
            : !users.includes(m.from) && m.from
        );
      });

      // removing false
      users = users.filter((u) => u != false);
      // populating the recent chats array
      users.forEach((u) => {
        const index = state.recentChats.findIndex(
          (chat) => chat.username === u
        );
        let newMessages = 0;
        if (index !== -1) {
          const chatObj = state.recentChats[index];
          let selected=false
          if(selectedUser){
            selected=chatObj.username.toLowerCase().includes(selectedUser&&selectedUser.toLowerCase());
          }
          
          newMessages = selected?0:chatObj.hasOwnProperty("newMessages")
            ? chatObj.newMessages
            : 0;
        }
        let userMss = getMyMessage(messages, u);
        recentChats.push({
          username: u,
          lastmss: userMss.at(-1),
          newMessages: newMessages,
        });
      });
      // updating the recentChats state
      dispatch({ type: "SET CHATS", payload: recentChats });
    }
  }, [messages, user,selectedUser]);

  return (
    <recentChatsContext.Provider
      value={{ recentChats: [...state.recentChats], setRecentChats: dispatch }}
    >
      {children}
    </recentChatsContext.Provider>
  );
};
