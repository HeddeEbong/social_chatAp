import { createContext, useState } from "react";
import background from "../images/eat breakfast-rafiki.svg"

export const BgContext=createContext();
export const BgContenxtProvider=({children})=>{
    const [bg,setBg]=useState(background);
    return (
        <BgContext.Provider value={{bg,setBg}}>
            {children}
        </BgContext.Provider>
    )
}