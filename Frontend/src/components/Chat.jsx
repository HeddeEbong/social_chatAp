import { useParams, Link } from "react-router-dom";
// import bg from "../images/eat breakfast-rafiki.svg"
import { ArrowSmallLeftIcon, ChevronLeftIcon, EllipsisVerticalIcon, MagnifyingGlassIcon } from "./Icons";
import useSelectedUser from "../hooks/useSelectedUserContext";
import Messages from "../components/Messages";
import ProfileImage from "../components/ProfileImage";
import ChatForm from "./ChatForm";
import UseBgContext from "../hooks/useBgContext";
function Chat() {
  const { id } = useParams();
  const { bg } = UseBgContext();
  
  return (
    <div className="h-screen overflow-hidden flex flex-col">
      {/* chat nav bar */}
      <div className=" p-4 flex  justify-between items-center pl-4  bg-primary text-white  border-l w-full">
        <div className="flex items-center space-x-2">
          <Link className="md:hidden" to={"/chat"}>
            <ArrowSmallLeftIcon className={'h-8 w-5'}/>
          </Link>
          <ProfileImage image={{ username: id }} />
          <p className="text-lg capitalize font-medium">{id}</p>
        </div>
        <div className="flex space-x-4">
          <MagnifyingGlassIcon className={"h-6 w-8 cursor-pointer"} />
          <EllipsisVerticalIcon className={"h-6 w-8 cursor-pointer"} />
        </div>
      </div>
      {/* chat messages */}
      <div className="relative overflow-y-scroll h-full">
        <img
          className=" w-full absolute object-cover object-center"
          src={bg}
          alt="userWallpaper"
        />
        <Messages ID={id} />
      </div>
      {/* chat form */}
      <div className=" w-full bottom-0 bg-white">
        <ChatForm />
      </div>
    </div>
  );
}

export default Chat;
