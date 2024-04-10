import { useContext } from "react";
import {BgContext} from "../context/bgContext";

const UseBgContext = () => {
    const {bg,setBg}=useContext(BgContext)
    return {bg,setBg}
}

export default UseBgContext;