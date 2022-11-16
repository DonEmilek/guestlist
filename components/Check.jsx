import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { toogleGuest } from "../api/addguest";
import { useRouter } from "next/router";
function Check() {
  const [guests, setGuests] = useState([]);
  const [activeGuests, setActiveGuests] = useState();
  const [userLoggedIn] = useAuthState(auth);
  const [filter, setFilter] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      const q = query(
        collection(db, "guest"),
        where("userId", "==", userLoggedIn.uid)
      );
      onSnapshot(q, (querySnapchot) => {
        let ar = [];
        querySnapchot.docs.forEach((doc) => {
          ar.push({ id: doc.id, ...doc.data() });
        });
        setGuests(ar);
      });
      const actives = query(
        collection(db, "guest"),
        where("status", "==", true),
        where("userId", "==", userLoggedIn.uid)
      );
      onSnapshot(actives, (querySnapchot) => {
        let ar = [];
        querySnapchot.docs.forEach((doc) => {
          ar.push({ ...doc });
        });
        setActiveGuests(ar.length);
      });
    }, 100);
  });

  const handleToggle = async (docId) => {
    await toogleGuest(docId);
  };

  return (
    <div className="bg-gradient-to-b from-black to-violet-900 min-h-screen">
      <button
        className="text-xl text-violet-500 m-16 p-4 underline underline-offset-8"
        onClick={() => router.back()}
      >
        Back to home page
      </button>

      <div className="text-2xl text-white text-center p-10">
        <p>
          Active Guests: {activeGuests}/{guests.length}
        </p>
      </div>
      <div className="space-y-5 m-10 border text-sm rounded-md">
        <h3 className="text-white text-center">Filter</h3>
        <div className="text-white flex justify-between max-w-xs m-auto">
          <button onClick={() => setFilter(null)}>Show All</button>
          <button onClick={() => setFilter(false)}>Show Active</button>
          <button onClick={() => setFilter(true)}>Show Inactive</button>
        </div>
      </div>

      {guests
        .filter((val) => val.status !== filter)
        .sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
          if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
          return 0;
        })
        .map((guest) => (
          <div
            key={guest.id}
            className="grid grid-cols-3 justify-items-center items-center text-white text-xl p-3  odd:text-blue-300"
          >
            <span>{guest.name}</span>
            <span>{guest.surname}</span>
            <button onClick={() => handleToggle(guest.id)}>
              {guest.status ? (
                <p className="text-white border-2 p-2 rounded-xl bg-green-500">
                  Active
                </p>
              ) : (
                <p className="text-white border-2 p-2 rounded-xl bg-red-500">
                  Inactive
                </p>
              )}
            </button>
          </div>
        ))}
    </div>
  );
}

export default Check;
