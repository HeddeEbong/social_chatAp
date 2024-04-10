import { useState } from "react";
import UseBgContext from "../hooks/useBgContext";
import image from "../images/hero.jpg";

export default function Profile() {
  const { setBg, bg } = UseBgContext();
  const handlesubmit = (e) => {
    e.preventDefault();
    console.log(bg);
  };
  return (
    <div className="mt-4 mx-10 relative">
      <h1 className="uppercase text-2xl font-semibold">profile</h1>

      <div className="flex items-end gap-4">
        <div className="h-[500px] w-[700px] bg-slate-600">
          <img src={bg || image} alt="profile image" className="w-full h-full object-cover" />
        </div>
        <div className="p-4 space-y-4 [&>div>h2]:font-semibold [&>div>h2]:text-xl [&>div>p]:text-slate-500">
          <div>
            <h2>UserName:</h2>
            <p>Hedde Ebong</p>
          </div>
          <div>
            <h2>UserEmail:</h2>
            <p>heddeebong@gmail.com</p>
          </div>
          <div>
            <h2>Phone number:</h2>
            <p>+237 67728790</p>
          </div>
          <div>
            <h2>Last Seen:</h2>
            <p>two weeks ago</p>
          </div>
          <div>
            <h2>Status:</h2>
            <p className="!text-green-500">active</p>
          </div>
        </div>
      </div>
      <form
        onSubmit={handlesubmit}
        className="py-6 first-letter:grid space-y-2"
      >
        <h1 className="text-blue-500">Edit profile</h1>
        <input
          className="my-3 file:bg-blue-400 file:text-white file:px-2 file:py-1 file:border-0"
          type="file"
          onChange={(e) => {
            setBg(URL.createObjectURL(e.target.files[0]));
            console.log(bg);
          }}
          name="bg"
          id="bg"
        />
        <div className={"grid gap-2"}>
          <label htmlFor="userName">User Name:</label>
          <input
            required
            className="focus:ring-blue-300 border-slate-300 px-1 py-2 focus:outline-none focus:border focus:border-blue-300 placeholder:text-sm placeholder:px-1"
            type="text"
            name="userName"
            id="userName"
            placeholder={"Change username"}
          />
        </div>
        <div className={"grid gap-2"}>
          <label htmlFor="email">Email:</label>
          <input
            required
            className="focus:ring-blue-300 border-slate-300 px-1 py-2 focus:outline-none focus:border focus:border-blue-300 placeholder:text-sm placeholder:px-1"
            type="text"
            name="email"
            id="email"
            placeholder={"Change email"}
          />
        </div>
        <div className={"grid gap-2"}>
          <label htmlFor="password">User Name:</label>
          <input
            required
            className="focus:ring-blue-300 border-slate-300 px-1 py-2 focus:outline-none focus:border focus:border-blue-300 placeholder:text-sm placeholder:px-1"
            type="text"
            name="password"
            id="password"
            placeholder={"Change password"}
          />
        </div>
        <button className="bg-slate-600 py-2 px-4  text-white ">
          save changes
        </button>
      </form>
    </div>
  );
}
