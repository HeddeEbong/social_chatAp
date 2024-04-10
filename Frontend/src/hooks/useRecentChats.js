import { useContext } from "react";
import { recentChatsContext } from "../context/chatsContext";

const useRecentChatsContext = () => {
    const {recentChats,setRecentChats}=useContext(recentChatsContext)
    if(!recentChats || !setRecentChats){
        throw Error("chat context must be used within its scope");
    }
    return {recentChats,setRecentChats}
}

export default useRecentChatsContext;