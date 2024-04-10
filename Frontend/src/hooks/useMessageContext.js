import { messageContext } from "../context/messageContext";
import { useContext } from "react";

export const  useMessageContext=()=>{
    const {messages,setMessages}=useContext(messageContext);
    return {messages,setMessages}
}