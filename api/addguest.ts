import { db } from "../firebase";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";

const addGuest = async (
  userId: string,
  fname: string,
  lname: string,
  status: boolean
) => {
  try {
    await addDoc(collection(db, "guest"), {
      userId: userId,
      name: fname,
      surname: lname,
      status: status,
    });
  } catch (error) {
    throw new Error("" + error);
  }
};

const addGuestPending = async (
  userId: string,
  fname: string,
  lname: string,
  status: boolean
) => {
  try {
    await addDoc(collection(db, "guestPending"), {
      userId: userId,
      name: fname,
      surname: lname,
      status: status,
    });
  } catch (error) {
    throw new Error("" + error);
  }
};

const toogleGuest = async (docId: string) => {
  try {
    const guestRef = doc(db, "guest", docId);
    await updateDoc(guestRef, {
      status: true,
    });
  } catch (error) {
    throw new Error("error" + error);
  }
};

const acceptGuest = async (
  docId: string,
  userId: string,
  fname: string,
  lname: string,
  status: boolean
) => {
  try {
    const guestRef = doc(db, "guestPending", docId);
    await updateDoc(guestRef, {
      status: true,
    });
    await addDoc(collection(db, "guest"), {
      userId: process.env.USER_ID_FB, //target id account
      name: fname,
      surname: lname,
      status: status,
    });
  } catch (error) {
    throw new Error("error" + error);
  }
};

export { addGuest, toogleGuest, addGuestPending, acceptGuest };
