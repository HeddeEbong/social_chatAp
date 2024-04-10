import { useState } from "react";
import { Link } from "react-router-dom";
import { UseLogin } from "../hooks/useLogin";
import Input from "../components/settings/Input";

function Login() {
  const { error, isPending, login } = UseLogin();
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = userInfo;
    login({ email, password });
  };

  return (
    <div className={`${
        error && "border-2 border-r-red-600"
      } place-self-center max-w-[32rem] bg-white p-5 shadow-lg rounded-lg`}>
      <h1 className="text-center text-slate-500 uppercase font-bold text-lg">
        Login
      </h1>
      <form className="grid bg-white gap-4 my-2" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Input
            required
            className="focus:ring-blue-600 border-slate-300 p-3 rounded-lg focus:outline-none focus:border focus:border-blue-600 placeholder:text-sm placeholder:px-1"
            type="email"
            value={userInfo.email}
            onChange={handleChange}
            name="email"
            label="email"
            placeholder="Enter email"
          />
        </div>
        <div className="grid gap-2">
          <Input
            className="focus:ring-blue-600 border-slate-300 p-3 rounded-lg focus:outline-none focus:border focus:border-blue-600 placeholder:text-sm placeholder:px-1"
            required
            name="password"
            label="password"
            type="password"
            onChange={handleChange}
            value={userInfo.password}
          />
        </div>
        <div className="flex gap-1 items-center">
          <input
            name="remember-me"
            id="remember-me"
            type="checkbox"
            className="focus:outline-blue-600 text-blue-400"
          />
          <label htmlFor="remember-me" className="text-sm">
            remember me next time
          </label>
        </div>
        <button
          className="rounded-lg active:ring-blue-600 active:ring-2 active:border-white bg-blue-600 py-2 mt-4 text-white"
          disabled={isPending}
        >
          sign in
        </button>
      </form>
      {error && (
        <div className="text-red-400 capitalize text-center">{error}</div>
      )}
      <div>
        <p className="text-sm px-4 py-3">
          dont have an accout?{" "}
          <Link to="/signup" className="text-blue-600 mx-1">
            signup
          </Link>{" "}
          here for free
        </p>
      </div>
    </div> )
    }
 
export default Login