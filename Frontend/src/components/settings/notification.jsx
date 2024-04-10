// settings on desktop notification and stuff

import { Switch } from "@headlessui/react";
import { useEffect, useState } from "react";

function NotificationSettings() {
  const [enabled, setEnabled] = useState(false);
  useEffect(()=>{
    if(Notification.permission === 'granted'){
      setEnabled(true);
    }
  },[])
  
  
  return (
    <div className="h-full w-full space-y-4 bg-white dark:bg-gray-700/40 dark:text-white rounded-xl p-4">
      <h1 className="text-center capitalize font-semibold text-lg ">
        Notificaton settings
      </h1>
      <div className="flex items-center w-full justify-between px-12">
        <p className="capitalize">allow notification?</p>
        <Switch
          checked={enabled}
          onChange={()=>{
            if(Notification.permission !== 'granted'){
              Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                  // Permission granted, do something if needed
                  setEnabled(true);
                } else if (permission === 'denied') {
                  setEnabled(false);
                  // Permission denied, handle accordingly
                }
              });
            }
            else{setEnabled(!enabled)}
          }}
          className={`${enabled ? "bg-blue-600" : "bg-blue-200"}
          relative inline-flex h-[28px] w-[65px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={`${enabled ? "translate-x-9" : "translate-x-0"}
            pointer-events-none inline-block h-[25px] w-[25px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
          />
        </Switch>
      </div>
    </div>
  );
}

export default NotificationSettings;
