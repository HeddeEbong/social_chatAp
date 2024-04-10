import { createContext, useEffect, useReducer } from "react";
import useAuthContext from "../hooks/useAuthContext";
import useFetchMessages from "../hooks/useFetchMessages";

export const messageContext = createContext();

export const messageReducer = (state, action) => {
  switch (action.type) {
    case "NEW MESSAGE":
      return {
        mss: [...state.mss, action.payload],
      };
    case "MESSAGES":
      return {
        mss: [...action.payload],
      };
    default:
      return state;
  }
};
export const MessageContextProvider = ({ children }) => {
  const { user } = useAuthContext();

  const [state, dispatch] = useReducer(messageReducer, {
    mss: [],
  });

  // useeffect for getting messages
  const fetchMessage = useFetchMessages(dispatch);
  useEffect(() => {
    const get = async () => {
      await fetchMessage();
    };
    if (user) {
      get();
    }
  }, [user]);
  

  return (
    <messageContext.Provider
      value={{ messages: [...state.mss], setMessages: dispatch }}
    >
      {children}
    </messageContext.Provider>
  );
};
