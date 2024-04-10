import { Link, NavLink } from "react-router-dom";
import icon from "../favicon.ico";
import useAuthContext from "../hooks/useAuthContext";
import socket from "../hooks/socket/Socket";
import { useState } from "react";
import Modal from "./Modal";
import LogoutModal from "./logoutModal";
import { ChatBubbleOvalLeftEllipsisIcon, Cog6ToothIcon, UserIcon } from "./Icons";
export default function SideBar() {
  const { dispatch } = useAuthContext();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    socket.disconnect();
    localStorage.removeItem("user");
  };
  const [askLogout,setAskLogout]=useState(false)
  

  return (
    <div className="overflow-hidden w-full  px-2  ">
      <div className=" h-screen rounded-md  flex flex-col items-center py-2  justify-between">
        <Link to="/">
          <img
            src={icon}
            alt="image"
            className="transform -rotate-[20deg] h-5 w-5 origin-bottom-right"
          />
        </Link>
        <ul className="grid gap-4 justify-items-center text-center">
          <Link title="chat" to={"/chat"}><span className="hidden sm:block">chats</span><ChatBubbleOvalLeftEllipsisIcon className={'h-5 w-5 sm:hidden'}/></Link>
          <Link title="settngs" to={"/settings"}><span className="hidden sm:block">settings</span><Cog6ToothIcon className={'h-5 w-5 sm:hidden'}/></Link>
          <Link to={"/profile"}><span className="hidden sm:block">profile</span><UserIcon className={'h-5 w-5 sm:hidden'}/> </Link>
        </ul>
        <div>
        <LogoutModal/>
        </div>
      </div>
    </div>
    // <div className="SideBar w-full bg-slate-200/90 lg:border-r-2 overflow-hidden  items-center px-2 flex justify-between lg:flex-col lg:space-y-4 h-full  ">
    //   <div className="flex space-x-2 mb-8 flex-wrap">
    //     <p></p>
    //     <div className="">
    //       <img src={icon} />
    //     </div>
    //   </div>
    //   {/* links */}
    //   <ul className="lg:flex-col flex  items-center justify-center lg:items-start lg:space-y-4 lg:space-x-0 space-x-4  h-full">
    //     <li className="w-full">
    //       <NavLink className="flex items-center rounded-md  p-1 space-x-1" to="/">
    //         <HomeModernIcon className={"icons"} />
    //         <p className="sm:hidden hidden lg:block md:hidden">home</p>
    //       </NavLink>
    //     </li>
    //     <li className="w-full">

    //       <NavLink className="flex items-center rounded-md  p-1 space-x-1" to="/chat">
    //         <ChatBubbleLeftRightIcon className={"icons"} />
    //         <p className="sm:hidden hidden lg:block md:hidden">messages</p>
    //       </NavLink>
    //     </li>
    //     <li className="w-full">

    //       <NavLink className="flex items-center rounded-md  p-1 space-x-1" to="/settings">
    //         <Cog6ToothIcon className={"icons"} />
    //         <p className="sm:hidden hidden lg:block md:hidden">Settings</p>
    //       </NavLink>
    //     </li>
    //     <li className="w-full">

    //       <NavLink className="flex items-center rounded-md  p-1 space-x-1" to="/profile">
    //         <UserIcon className={" text-white bg-black icons"} />
    //         <p className="sm:hidden hidden lg:block md:hidden">Profile</p>
    //       </NavLink>
    //     </li>
    //   </ul>
    //   {/* logout btn */}
    //   <div className="mb-4 self-baseline">

    //   </div>
    // </div>
  );
}
