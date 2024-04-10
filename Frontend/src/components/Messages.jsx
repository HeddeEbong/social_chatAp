import { useRef, useLayoutEffect } from "react";

import Message from "./message";
import { useMessageContext } from "../hooks/useMessageContext";
import { getMyMessage } from "../hooks/getMyMessage";
function Messages({ className, ID }) {
  const containerRef = useRef(null);

  const { messages } = useMessageContext();
  let myMessages = getMyMessage(messages, ID);
  // console.log("per user",perMessage);
  return (
    <div
      ref={containerRef}
      className={`flex flex-col space-y-2 p-4  ${className}`}
    >
      {myMessages.map((m, index) => (
        <Message m={m} key={index} ID={index} />
      ))}
    </div>
  );
}

export default Messages;
