import { Outlet, useMatch } from "react-router-dom";
import SideContactList from "../components/SideContactList";
import useSelectedUser from "../hooks/useSelectedUserContext";
import { useEffect } from "react";


const ChatLayout = () => {
  const { selectedUser, setSelectedUser } = useSelectedUser();

  const match = useMatch("/chat/:id");
  useEffect(() => {
    if (match) {
      setSelectedUser(match.params.id);
    }
    else{
      setSelectedUser("");
    }
    
  }, [match,selectedUser,setSelectedUser]);

  return (
    <div className="h-full md:grid grid-cols-8">
      <div
        className={`${
          match && "hidden md:block"
        } h-screen md:col-span-3 lg:col-span-2 w-full`}
      >
        <SideContactList />
      </div>
      <div className=" md:col-span-5 lg:col-span-6 bg-primary/10">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;
