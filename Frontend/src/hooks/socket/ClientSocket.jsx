import socket from "./Socket";
import UseOnlineChatsContext from "../useonlineChats";
import { useMessageContext } from "../useMessageContext";
import { useState, useEffect } from "react";
import UseAuthContext from "../useAuthContext";
import useRecentChatsContext from "../useRecentChats";
import notification from "../../audio/notification.wav";
import showNotification from "../../components/showNotifications";
import newmessageIcon from "../../images/newMessageIcon.jpeg";
import replyIcon from "../../images/reply.png";

const UseCLientSocket = ({ children }) => {
  const { user } = UseAuthContext();
  const { setMessages } = useMessageContext();
  const { chats, setChats } = UseOnlineChatsContext();
  const { setRecentChats } = useRecentChatsContext();
  useEffect(() => {
    // getting and updating current users on socket
    // over-raw users
    socket.on("users", (users) => {
      setChats({ type: "USERS", payload: users });

      if (user) {
        setChats({ type: "REMOVE USER", payload: user.username });
      }
    });
    // a mew user connects to socket
    socket.on("user connected", ({ userID, username }) => {
      console.log("new user connected");

      setChats({ type: "NEW USER", payload: [{ username, userID }] });
      if (user) {
        setChats({ type: "REMOVE USER", payload: user.username });
      }
    });

    socket.on("user disconnected", ({ userID, username }) => {
      console.log(username, "removed");
      setChats({ type: "REMOVE USER", payload: username });
    });

    socket.on("private message", ({ content, from, at, to }) => {
      // play audio and send notification
      const audio = new Audio(notification);
      audio.play();
      console.log(replyIcon);
      
      showNotification(from, {
        body: content,
        icon: newmessageIcon,
        requireInteraction: true,
      });

      // update localstate
      setRecentChats({ type: "ADD_NEW_MESSAGE", payload: { from } });
      setMessages({ type: "NEW MESSAGE", payload: { content, to, from, at } });
    });

    // session to maintain device or session id
    socket.on("session", ({ sessionID, userID }) => {
      if (sessionID && user) {
        socket.auth = { user: { sessionID, username: user.username } };
        // store it in the localStorage
        localStorage.setItem("sessionID", sessionID);
        // save the ID of the user
        socket.userID = userID;
      }
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err}`);
    });

    return () => {
      socket.off("user connected");
      socket.off("private message");
      socket.off("users");
      socket.off("session");
    };
  }, [user, socket, chats, setRecentChats]);

  return <>{children}</>;
};

export default UseCLientSocket;
