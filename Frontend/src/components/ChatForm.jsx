import { Form } from "react-router-dom";
import { useState } from "react";
import {
  FaceSmileIcon,
  MicrophoneIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from "./Icons";
import socket from "../hooks/socket/Socket";
import UseSelectedUser from "../hooks/useSelectedUserContext";
import { useMessageContext } from "../hooks/useMessageContext";
import UseAuthContext from "../hooks/useAuthContext";

function ChatForm() {
  const { user } = UseAuthContext();
  const { setMessages } = useMessageContext();
  const { selectedUser } = UseSelectedUser();
  const [message, setMessage] = useState("");
  // sending message
  const sendMessage = (e) => {
    e.preventDefault();
    const time = new Date();
    if (message.trim()) {
      setMessages({
        type: "NEW MESSAGE",
        payload: {
          content: message.trim(),
          from: user.username,
          at: time,
          to: selectedUser,
        },
      });
      if (selectedUser !== user.username) {
        socket.connect();
        socket.emit("private message", {
          content: message.trim(),
          to: selectedUser,
          at: time,
        });
      }

      setMessage("");
    } else {
      console.log("cant send empty message");
    }
  };

  // sending other data
  const sendData = () => {};
  return (
    <div>
      <Form
        onSubmit={sendMessage}
        className="flex w-full space-x-2 items-center px-6 py-2"
      >
        <FaceSmileIcon className="h-8 w-8" />
        <PaperClipIcon className={"h-8 w-8"} />
        <input
          value={message}
          onChange={(i) => {
            setMessage(i.target.value);
          }}
          autoFocus={true}
          autoCorrect='true'
          autoSave='true'
          placeholder="Enter your message here..."
          className="rounded-lg flex shadow border p-3 items-center w-full max-h-[200px] focus:ring-blue-300 border-slate-300  focus:outline-none focus:border focus:border-blue-300 placeholder:text-sm placeholder:px-1"
        />

        <div className="">
          {message ? (
            <button type="submit">
              <PaperAirplaneIcon className={"h-8 text-blue-500  w-8"} />
            </button>
          ) : (
            <button onClick={sendData}>
              <MicrophoneIcon className={"h-8 text-blue-500 w-8"} />
            </button>
          )}
        </div>
      </Form>
    </div>
  );
}

export default ChatForm;
