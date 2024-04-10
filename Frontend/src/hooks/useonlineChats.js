import { useContext } from "react";
import { onlineChatsContext } from "../context/onlineChatsContext";

const UseOnlineChatsContext = () => {
    const {chats,setChats}=useContext(onlineChatsContext)
    // if(!chats || !setChats){
    //     throw Error("chat context must be used within its scope");
    // }
    return {chats,setChats}
}

export default UseOnlineChatsContext;