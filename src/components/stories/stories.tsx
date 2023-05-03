import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Story from "./story";

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
    <section className="flex overflow-x-auto hide-scroll-bar py-3">
      <div className="w-fit flex-shrink-0 px-1 flex gap-[2px] flex-col ml-3">
        <div className="rounded-full w-fit bg-gray-700 px-[10px] border-[1px] py-[10px] text-white">
          <AddOutlinedIcon />
        </div>

        <p className="text-center text-sm font-md text-gray-200">Add Story</p>
      </div>
      <div className="w-full ml-[5%] my-auto flex gap-3">
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
