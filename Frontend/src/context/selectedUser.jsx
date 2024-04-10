import { createContext, useState } from "react";

export const SelectedUserContext=createContext();
export const SelectedUserContenxtProvider=({children})=>{
    const [selectedUser,setSelectedUser]=useState();
    return (
        <SelectedUserContext.Provider value={{selectedUser,setSelectedUser}}>
            {children}
        </SelectedUserContext.Provider>
    )
}