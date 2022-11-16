import React from "react";
import { auth } from "../firebase";
import HomeButton from "./HomeButton";

function Dashboard() {
  return (
    <div className="bg-gradient-to-b from-black to-violet-900 h-screen">
      <button
        className="absolute text-white p-1 m-5 border-2 border-violet-300 rounded-lg  text-xl font-sans"
        onClick={() => auth.signOut()}
      >
        Logout
      </button>
      <div className="absolute top-10 text-purple-300 w-max left-0 right-0 ml-auto mr-auto">
        <h1 className="text-3xl mt-20">. Admin Panel</h1>
      </div>
      <div className="grid grid-cols-1 pt-72 w-full pb-[50%] text-white">
        <HomeButton name={"Add a guest"} href={"add"} />
        <HomeButton name={"List of guests"} href={"checking"} />
        <HomeButton name={"Lobby"} href={"pending"} />
      </div>
    </div>
  );
}

export default Dashboard;
