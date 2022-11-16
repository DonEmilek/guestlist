import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { addGuest } from "../api/addguest";
import { auth } from "../firebase";
function Add() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [active, setActive] = useState(false);
  const router = useRouter();
  const [userLoggedIn] = useAuthState(auth);
  const handleAdd = async (e) => {
    e.preventDefault();
    await addGuest(userLoggedIn.uid, name, surname, active);
    //clean up
    setName("");
    setSurname("");
  };
  return (
    <div className="bg-gradient-to-b from-black to-violet-900 min-h-screen">
      <div>
        <button
          className="text-xl text-violet-500 m-16 p-4 underline underline-offset-8"
          onClick={() => router.back()}
        >
          Back to home page
        </button>
      </div>
      <form
        onSubmit={handleAdd}
        className="text-white text-2xl grid grid-cols-1 justify-items-center space-y-6 pt-24"
      >
        <label>Name</label>
        <input
          type="text"
          value={name}
          className="text-black"
          onChange={(e) => setName(e.target.value)}
        />
        <label>Surname</label>
        <input
          type="text"
          value={surname}
          className="text-black"
          onChange={(e) => setSurname(e.target.value)}
        />

        <button
          type="submit"
          className="px-5 py-2 text-2xl border-2 border-violet-400"
        >
          Add Guest
        </button>
      </form>
    </div>
  );
}

export default Add;
