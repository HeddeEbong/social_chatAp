export const getMyMessage=(messages,id)=>{
   
    const yourMessages=[];
    messages.forEach((m)=>{
        if(m.from.toLowerCase()==id.toLowerCase() || m.to.toLowerCase()==id.toLowerCase()){
            yourMessages.push(m);
        }
    });
    return yourMessages;
}