import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { GiPartyPopper } from "react-icons/gi";
import { auth, db, provider } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { zamieszanie, metalcave } from "../public/images/index";
import { addGuest, addGuestPending } from "../api/addguest";
function Login() {
  const [authAdmin, setAuthAdmin] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const [password, setPassword] = useState("");
  const [submitForm, setSubmitForm] = useState(false);
  const [alertForm, setAlertForm] = useState(false);
  const [counter, setCounter] = useState(0);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [active, setActive] = useState(false);

  function validator(name, surname) {
    if (name.trim().length === 0 || surname.trim().length === 0) {
      setAlertForm(true);
      return false;
    } else {
      setAlertForm(false);
      return true;
    }
  }

  const registerSubmit = async (e) => {
    e.preventDefault();
    if (validator(name, surname)) {
      setSubmitForm(true);
      await addGuestPending(
        "QecI9CjXAEO7TyzrnZm4Z1yAtdM2", // set id acoount
        name,
        surname,
        active
      );
      //clean up
      setName("");
      setSurname("");
    }
  };

  const handleVisible = () => {
    if (counter === 2) setVisibleButton(true);
    setCounter(counter + 1);
  };

  const handleAdminPanel = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "password", "KW4JtThdRRw6CvWRrq0p");
    const docSnap = await getDoc(docRef);
    const firebasePassword = docSnap.data();
    if (password === firebasePassword.adminpass)
      auth.signInWithRedirect(provider).catch(alert);
    else {
      alert("Incorrect password");
    }
  };

  const signIn = () => {
    setAuthAdmin(true);
  };

  return (
    <div className="bg-gradient-to-b from-black to-violet-900 min-h-screen">
      <Head>
        <title>Register</title>
      </Head>
      <div className="flex justify-around items-center pt-12">
        <AiFillStar size={30} color={"white"} />
        <Image
          className="rounded-xl"
          src={zamieszanie}
          alt=""
          width={80}
          height={80}
        />
        <AiFillStar size={30} color={"white"} />
        <Image
          className="rounded-xl"
          src={metalcave}
          alt=""
          width={80}
          height={80}
        />
        <AiFillStar size={30} color={"white"} onClick={handleVisible} />
      </div>
      <p className="text-3xl text-amber-300 text-center pt-12">18.11</p>
      <p className="text-xl text-center text-amber-300 pt-12">
        Birthday party and TUNE - death is nothing more than leaving the party{" "}
      </p>

      {/* Register form */}
      <div className="flex items-center justify-center text-xl text-center font-thin text-amber-300 pt-20">
        <div className="w-1/4 h-1 rounded-2xl mx-5 bg-purple-500"></div>
        Register
        <div className="w-1/4 h-1 rounded-2xl mx-5 bg-purple-500"></div>
      </div>
      {!submitForm ? (
        <div>
          <form
            className="grid grid-cols-1 justify-items-center space-y-5 pt-10 text-white"
            onSubmit={registerSubmit}
          >
            <label>Name</label>
            <input
              value={name}
              className="rounded-sm text-black"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
            <label>Surname</label>
            <input
              value={surname}
              className="rounded-sm text-black"
              type="text"
              onChange={(e) => setSurname(e.target.value)}
            />
            <button
              className="p-3 m-5 border border-violet-800 w-32"
              type="submit"
            >
              Submit
            </button>
          </form>
          {alertForm && (
            <p className="text-xl text-center text-amber-300">
              Name and surname is required
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 justify-items-center pt-20 text-amber-300 font-extralight text-3xl">
          <h3>Success!</h3>
          <p>Thanks for register</p>
        </div>
      )}

      {/* Login Button */}
      <div className="grid grid-cols-1 pt-40 max-w-sm m-auto">
        {authAdmin ? (
          <form
            className="flex justify-between text-white"
            onSubmit={handleAdminPanel}
          >
            <input
              type="text"
              placeholder="password"
              className="text-black"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="border-2 border-violet-600 h-10 px-4"
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          visibleButton && (
            <button
              className="p-5 text-white text-3xl border-2 border-violet-400"
              onClick={signIn}
            >
              Login into admin panel
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Login;
