import { useEffect } from "react"

const useGetMessage=async ()=>{
        if (user) {
            const response = await fetch(
              `http://${location.hostname}:3000/api/messages`,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
             messages = await response.json();
            console.log(messages);
            return messages;
          }
          return null;

}