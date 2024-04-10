import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BgContenxtProvider } from "./context/bgContext";
import { AuthContextProvider } from "./context/AuthContext";
import { OnlineChatsContenxtProvider } from "./context/onlineChatsContext";
import { SelectedUserContenxtProvider } from "./context/selectedUser";
import { MessageContextProvider } from "./context/messageContext";
import { RecentChatsContextProvider } from "./context/chatsContext";

if (!("Notification" in window)) {
  console.log("This browser does not support desktop notifications.");
}
const requestNotificationPermission = () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        console.log("Notification permission granted.");
      }
    });
  }
};

requestNotificationPermission();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <OnlineChatsContenxtProvider>
        <SelectedUserContenxtProvider>
          <BgContenxtProvider>
            <MessageContextProvider>
              <RecentChatsContextProvider>
                <div>
                  <App />
                </div>
              </RecentChatsContextProvider>
            </MessageContextProvider>
          </BgContenxtProvider>
        </SelectedUserContenxtProvider>
      </OnlineChatsContenxtProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
