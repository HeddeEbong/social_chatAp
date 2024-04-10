import SideContactList from "../components/SideContactList";
import image from "../images/eat breakfast-amico.svg";
import { Outlet, NavLink, Link } from "react-router-dom";

export default function GuestLayout() {
  return (
    // <div className={"h-full grid"}>
    <div className="bg-gradient-to-tr  from-gray-100 to-sky-50  h-screen flex flex-col  ">
      {/* nav bar stays here */}
      <header className="flex justify-around items-center border-b-2 mb-4 bg-blue-600 text-white w-full">
        <Link to={"/"} className="font-semibold ">
          Chat Me
        </Link>
        <nav className="flex space-x-11">
          <NavLink
            className="uppercase tracking-wider px-4 py-2 active:bg-sky-200 shadow-sm  active:scale-100 transition active:border-b-4 active:rounded-r-none border-red-500 rounded-md"
            to="/login"
          >
            login
          </NavLink>
          <NavLink
            to="/signup"
            className="uppercase tracking-wider px-4 py-2 active:bg-sky-200 shadow-sm  active:scale-100 transition active:border-b-4 active:rounded-r-none border-red-500 rounded-md [.active]:border-b-2"
          >
            signUp
          </NavLink>
        </nav>
      </header>

      <div className="flex h-full flex-col ">
        {/* logo and brand stays here */}

        <div className={"text-center text-sm  space-y-2"}>
          <Link to={"/"} className="text-4xl font-semibold  text-blue-600">
            Chat Me
          </Link>
          <p className={"text-lg leading-normal capitalize"}>
            where you converse and make new relationships
          </p>
        </div>
        {/* outlet components stays here */}

        <div className="h-full grid w-full">
          <Outlet />
        </div>
      </div>

      {/* copy rigth goes here */}
      <div className="text-center mb-4  text-sm bg-inherit text-slate-500">
        &copy;copyRight 2022 Chatme.com
      </div>
    </div>

    //   {/*  <SideContactList mainStyle={"w-full lg:hidden md:hidden"} navLinks={"flex"}/>*/}
    //   {/*<div className="hidden sm:hidden md:block lg:grid lg:grid-cols-2 h-full border-l-2  bg-sky-100">*/}

    //   {/*  <div className="h-full object-cover sm:hidden lg:block object-center self-center hidden "><img src={image} alt="" /></div>*/}
    //   {/*  <div className="p-2 flex flex-col space-y-4 justify-center col-span-full lg:col-span-1  items-center">*/}
    //   {/*    <h1 className="text-4xl font-bold text-gray-800 capitalize text-center">chat with all freinds and family  <span className="text-sky-300">Chat me.com</span></h1>*/}
    //   {/*    <p className="text-lg max-w-md">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ex, commodi.</p>*/}
    //   {/*    <div className="flex space-x-4">*/}
    //   {/*      <Link to="/status" className="btn rounded-md bg-teal-400 p-3">Status</Link>*/}
    //   {/*      <Link className="btn rounded-md bg-teal-400 p-3">Info</Link>*/}
    //   {/*    </div>*/}
    //   {/*    <div className="">@copyRight 2022 Chatme.com</div> */}
    //   {/*  </div>*/}
    //   {/*  */}
    //   {/*</div>*/}
    // </div>
  );
}
