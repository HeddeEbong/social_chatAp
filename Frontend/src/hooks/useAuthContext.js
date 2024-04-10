import { useContext } from "react";
import {authContext} from "../context/AuthContext";

const useAuthContext = () => {
    const {user,dispatch}=useContext(authContext);
    return {user,dispatch}
}

export default useAuthContext;