import { createContext, useState } from "react";
import useGetProfile from "../hooks/getProfile";

export const profileContext=createContext();
export const ProfileContenxtProvider=({children})=>{
    const profile=useGetProfile();
    const [bg,setBg]=useState(profile);
    return (
        <profileContext.Provider value={{bg,setBg}}>
            {children}
        </profileContext.Provider>
    )
}