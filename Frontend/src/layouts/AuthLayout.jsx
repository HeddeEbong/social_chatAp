import { Link, Outlet } from "react-router-dom";
import hero from "../images/hero.jpg";
import ad from "../images/Online wishes-bro.svg";

function AuthLayout() {
  return (
    <div className="grid grid-cols-3  bg-gray-400/40 h-full w-full ">
      <div className="col-span-2 relative p-4 overflow-hidden bg-white space-y-2 flex flex-col  h-full  ">
        <div className="relative   h-[750px]">
          <img src={hero} className="h-full w-full rounded-md object-cover object-center" alt="" />
          <svg
            className=" absolute  bottom-[-0.1em] bg-black/0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,32L21.8,26.7C43.6,21,87,11,131,16C174.5,21,218,43,262,64C305.5,85,349,107,393,117.3C436.4,128,480,128,524,133.3C567.3,139,611,149,655,165.3C698.2,181,742,203,785,229.3C829.1,256,873,288,916,256C960,224,1004,128,1047,80C1090.9,32,1135,32,1178,80C1221.8,128,1265,224,1309,261.3C1352.7,299,1396,277,1418,266.7L1440,256L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="absolute h-[400px] bg-white rounded-full w-[400px] bottom-[25%] left-[5%]">
          <img src={ad} alt="" />
        </div>
        <div className="bg-white flex flex-col items-center p-3">
          <h1 className="text-3xl text-sky-500 font-bold">Chat with freinds and family</h1>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro at distinctio rerum vel fuga sit.</p>
          <div className="flex space-x-2">
            <Link className="btn bg-teal-400 rounded-md" to={"/info"}>More info</Link>
          </div>
        </div>
      </div>
      {<Outlet />}
    </div>
  );
}

export default AuthLayout;
