import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(`${window.location.hostname}:3000`, {
  autoConnect: false,
});




export default socket;
