import { useState } from 'react';
import UseSelectedUser from './useSelectedUserContext'

const  useStartConversation=(user)=> {
    const {setSelectedUser}=UseSelectedUser();
    const [nextStep,setNextStep]=useState();
    if(!user){
        throw Error("no user to start conversation with")
    }
  setSelectedUser(user.userID); 

  if(nextStep){

  }
  
  return {setNextStep}
}

export default useStartConversation
