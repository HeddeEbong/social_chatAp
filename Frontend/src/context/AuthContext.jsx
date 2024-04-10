import { createContext, useEffect, useReducer, useState } from "react";
import socket from "../hooks/socket/Socket";

export const authContext = createContext();
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("token");
      localStorage.removeItem('user');
      return { user: null };
    case "UPDATE USER":
      const user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(user));
      return {
        user,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });
  const sessionID = localStorage.getItem("sessionID")?localStorage.getItem("sessionID"):undefined;
  const user = JSON.parse(localStorage.getItem("user"));

  // connecting my socket and doing stuff
  useEffect(() => {
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
      socket.auth = {
        user: {
          username: user.username,
          user: user._id,
          sessionID: sessionID,
        },
      };
      socket.connect();
    }
  }, []);
  useEffect(()=>{},[state]);
  return (
    <authContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </authContext.Provider>
  );
};
