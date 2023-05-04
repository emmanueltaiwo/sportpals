import React, { useEffect, useState } from "react";
import { db, auth } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Story from "./story";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";

interface allUserData {
  creationTime: string;
  displayName: string;
  email: string;
  emailIsVerified: boolean;
  hasPremium: boolean;
  lastSignIn: string;
  phoneNumber: number;
  photoUrl: string;
  userId: string;
}

const Stories = () => {
  const [user, loading, error] = useAuthState(auth);
  const [myUsers, setMyUsers] = useState<allUserData[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "userdata"));
      const documents = querySnapshot.docs.map((doc) => ({
        displayName: doc.data().displayName,
        creationTime: doc.data().creationTime,
        email: doc.data().email,
        emailIsVerified: doc.data().emailIsVerified,
        hasPremium: doc.data().hasPremium,
        lastSignIn: doc.data().lastSignIn,
        phoneNumber: doc.data().phoneNumber,
        photoUrl: doc.data().photoUrl,
        userId: doc.data().userId,
      }));
      setMyUsers(documents);
    };
    getAllUsers();
  });

  return (
    <section className="flex overflow-x-auto hide-scroll-bar py-3 pb-5">
      <div className="w-fit flex-shrink-0 px-1 flex gap-[2px] flex-col ml-3">
        <div className="rounded-xl w-fit mx-auto bg-gradient-to-r from-slate-800 to-slate-800 px-[5px] border-[1px] border-cyan-600 py-[5px] text-white">
          {user ? (
            <Image src={user?.photoURL || ""} className="rounded-xl" width={50} height={50} alt={""} />
          ) : (
            <AddOutlinedIcon className="shadow-xl" />
          )}
        </div>
        <p className="text-center text-sm font-md text-gray-200 mt-1">
          Add Story
        </p>
      </div>
      <div className="w-full ml-[5%] my-auto flex gap-2">
        {myUsers.map((item) => (
          <div
            key={item.userId}
            className="flex-shrink-0 px-1 flex items-center gap-[2px] flex-col"
          >
            <Story photoUrl={item.photoUrl} displayName={item.displayName} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stories;
