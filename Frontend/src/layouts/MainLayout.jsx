import { Outlet, Link } from "react-router-dom";
import SideBar from "../components/SideBar";

function MainLayout() {
  return (
    <div className="flex h-full">
      <div className="w-12 sm:w-20  fixed font-semibold bg-gray-900 text-white">
        <SideBar />
      </div>
      <div className=" ml-12 sm:ml-20 w-full">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;