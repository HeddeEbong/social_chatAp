import { useContext } from "react";
import { SelectedUserContext } from "../context/selectedUser";

const useSelectedUser = () => {
    const {selectedUser,setSelectedUser}=useContext(SelectedUserContext)
    return {selectedUser,setSelectedUser}
}

export default useSelectedUser;