import { Form, NavLink, useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";
import UseOnlineChatsContext from "../hooks/useonlineChats";
import Active from "./active";
import useRecentChatsContext from "../hooks/useRecentChats";
import useAuthContext from "../hooks/useAuthContext";

function Contacts() { 
  const { chats } = UseOnlineChatsContext();
  const { user } = useAuthContext();
  const { recentChats } = useRecentChatsContext();
  const enterChat = ({ chat, e }) => {
    // clear new message
    
  };
  
  return (
    <div className="contacts m-2 flex flex-col  h-full space-y-4">
      <Form className="flex mt-2">
        <input
          placeholder="search your contacts"
          type="search"
          name="search"
          className="focus:ring-blue-600 w-full border-slate-300 px-1 py-2 focus:outline-none focus:border focus:border-blue-600 placeholder:text-sm placeholder:px-1"
        />
        <button className="bg-blue-600  py-2 px-4 text-white">Search</button>
      </Form>
      {/* online users */}
      <div className="">
        <h1 className="my-2 capitalize text-lg ">online chats</h1>
        {chats.length > 0 ? (
          <div className="border-b-2">
            <div className="flex overflow-auto">
              {chats.map((c, index) => {
                return (
                  <NavLink
                    key={index}
                    to={c.username}
                    className="flex items-center flex-col space-x-2 justify-center"
                  >
                    <div className="relative">
                      <Active />
                      <ProfileImage image={{ username: c.username }} />
                    </div>
                    <h1 className="text-sm">{c.username}</h1>
                  </NavLink>
                );
              })}
            </div>
          </div>
        ) : (
          <div>no people online now</div>
        )}
      </div>
      {/* chats */}
      <h1 className="text-lg my-4 uppercase">Chats</h1>
      <div
        id="contacts"
        className="flex h-full max-w-md  overflow-y-auto space-y-2 flex-col "
      >
        {recentChats.map((c, index) => {
          let time = new Date(c.lastmss.at);
          return (
            <NavLink
              onClick={(e) => enterChat({ chat: c, e })}
              to={c.username}
              className="bg-white shadow relative overflow-hidden truncate items-start   space-x-2  flex rounded-md p-2"
              key={index}
            >
              <ProfileImage
                style={"h-[70px] w-[70px] ring-1 p-[0.1rem] ring-blue-500"}
                modalEnabled={true}
                image={{ username: c.username }}
              />
              <div className="flex flex-col ">
                <p className="text-lg capitalize">{c.username}</p>
                <div className="text-gray-500 self-start  flex flex-col ">
                  <div className="text-xs">{c.lastmss.from == user.username && "you"}</div>
                  <div className="[overflow-wrap:everywhere] text-sm">
                    {c.lastmss.content}
                  </div>
                </div>
              </div>

              <div className="self-end right-1 top-2 space-x-2 absolute flex">
                {c.newMessages > 0 && (
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                    {` ${c.newMessages}`}
                  </div>
                )}

                <span>
                  <span>{time.getHours()}</span>:{time.getMinutes() < 10 && "0"}
                  {time.getMinutes()}
                </span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Contacts;
