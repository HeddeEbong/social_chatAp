import { Link } from "react-router-dom";
import Contacts from "../components/Contacts";
import DropDown from "../components/DropDown/DropDown";
import { EllipsisVerticalIcon, GlobeAltIcon } from "../components/Icons";
import ProfileImage from "../components/ProfileImage";
import ItemWithTooltip from "../components/Tooltip/ItemWithTooltip";
import useGetProfile from "../hooks/getProfile";
import useAuthContext from "../hooks/useAuthContext";

function SideContactList({ navLinks }) {
  const { user } = useAuthContext();
  const profilePic = user.profilePic;

  const options = ["archieved contacts", "contacts"];
  const navItems = [
    // {
    //   comp: (
    //     <button>
    //       <ItemWithTooltip toolTipContent={"new messgae"}>
    //         <ChatBubbleOvalLeftEllipsisIcon className={"icons"} />
    //       </ItemWithTooltip>
    //     </button>
    //   ),
    // },
    {
      comp: (
        <ItemWithTooltip toolTipContent="UB social@hot">
          <Link to={"/"}>
            <GlobeAltIcon className={"h-6 w-6"} />
          </Link>
        </ItemWithTooltip>
      ),
    },
    {
      comp: (
        <DropDown
          DropDownToggler={<EllipsisVerticalIcon className={"h-6 w-6"} />}
        >
          {options.map((opt, index) => {
            return <li key={index}>{opt}</li>;
          })}
        </DropDown>
      ),
    },
  ];
  return (
    <div className={`border-l `}>
      {/* profile image and nav links */}
      <div className="nav w-full flex bg-primary py-4 px-2 justify-between items-center">
        <div className="flex  items-center gap-2">
          <div>
            <Link to={"/profile"}>
              <ProfileImage image={profilePic} />
            </Link>
          </div>

          {user && <p className="capitalize text-white">{user.username}</p>}
        </div>

        {/* nav links */}
        <div>
          <div className={navLinks ? `hidden` : `lg:hidden md:hidden`}>
            <DropDown
              DropDownToggler={<EllipsisVerticalIcon className={"h-6 w-6"} />}
            >
              {navItems.map((item, index) => {
                return <div key={index}>{item.comp}</div>;
              })}
            </DropDown>
          </div>
          <div
            className={
              navLinks
                ? `${navLinks}  mr-10 space-x-4 items-center`
                : "lg:flex md:flex hidden  space-x-4 items-center"
            }
          >
            {navItems.map((item, index) => {
              return <div key={index}>{item.comp}</div>;
            })}
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <Contacts />
      </div>
    </div>
  );
}

export default SideContactList;
