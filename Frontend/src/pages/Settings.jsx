import { useState, useContext } from "react";
import { authContext } from "../context/AuthContext";
import ProfileImage from "../components/ProfileImage";
import { Tab } from "@headlessui/react";
import Info from "../components/settings/info";
import LogoutModal from "../components/logoutModal";
import Button from "../components/button";
import Notification from "../components/settings/notification";
function Settings() {
  const { user, dispatch } = useContext(authContext);
  const [image, setImage] = useState(null);
  const url = user.profilePic;
  const [tabIndex, setTabIndex] = useState(0);

  const options = ["user profile", "notification", "general", "security"];

  const changeImage = async (e) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("profile-picture", image);

      const response = await fetch(
        "http://localhost:3000/api/profilePic/upload",
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${user.token}`,
          },
          body: formData,
        }
      );
    }
  };
  return (
    <div className="bg-gradient-to-br h-screen from-blue-300/95 to-teal-100/95 dark:bg-gray-900 grid grid-cols-1 ">
      <div className="p-2 overflow-x-hidden space-y-4">
        {/* top nav goes here */}
        <div className="rounded-xl h-fit flex p-2 flex-wrap items-center justify-around bg-white dark:bg-gray-800 dark:text-white">
          {/* profile image */}
          <div className="flex  items-center  space-x-2">
            <ProfileImage
              modalEnabled={(image && true) || (url && true)}
              style={" h-12  w-12"}
              image={image ? URL.createObjectURL(image) : url}
            />

            <h2 className="font-semibold text-lg capitalize">
              {user.username}
            </h2>
          </div>
          <div className="flex space-x-2">
            <Button role="tertiary">edit</Button>
            <LogoutModal btn={true} />
          </div>
        </div>
        {/* the main settings goes here */}
        <Tab.Group
          selectedIndex={tabIndex}
          onChange={setTabIndex}
          as={"div"}
          className="flex flex-col md:flex-row min-h-screen rounded-xl dark:bg-gray-800 bg-white shadow gap-x-1  grid-cols-6 p-2"
        >
          {/* settings navigation here */}
          <div>
            <Tab.List
              as="ul"
              className="flex space-x-4 items-center overflow-x-scroll no-scrollbar p-2 sm:justify-center  md:flex-col md:h-full md:space-y-10 md:justify-start md:w-[200px] md:space-x-0 dark:bg-gray-700/40 rounded-xl overflow-hidden"
            >
              {options.map((option, index) => (
                <Tab key={index} as={"div"} className={"w-full"}>
                  {({ selected }) => (
                    <li
                      className={`p-2  w-full shadow sm:shadow-none rounded-lg  bg-white dark:bg-gray-700 dark:text-white text-center  capitalize  cursor-pointer ${
                        selected &&
                        "!bg-blue-400 text-black lg:border-r-4 lg:border-blue-600 "
                      }   `}
                    >
                      {option}
                    </li>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>

          {/* settings options or swiching options here */}
          <Tab.Panels as="div" className="col-span-5 rounded-r-lg  w-full ">
            <Tab.Panel>
              <Info />
            </Tab.Panel>
            <Tab.Panel className={"h-full"}>
              <Notification />
            </Tab.Panel>
            <Tab.Panel>Tab 3</Tab.Panel>
            <Tab.Panel>Tab 4</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}

export default Settings;
