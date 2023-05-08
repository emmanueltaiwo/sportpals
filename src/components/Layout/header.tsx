import Image from "next/image";
import React, { useEffect, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, deleteDoc, collection, getDoc } from "firebase/firestore";

const Header = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState("");
  const [greeting, setGreeting] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const time = new Date().getHours();

    if (time >= 0 && time < 12) {
      setGreeting("Good morning 😊,");
    } else if (time >= 12 && time < 18) {
      setGreeting("Good afternoon 🌞,");
    } else {
      setGreeting("Good evening 🌃,");
    }
  }, []);

  useEffect(() => {
    const userId = user?.uid;
    if (userId) {
      const userRef = doc(db, "globalUserData", userId); // reference to the document with the user's id

      getDoc(userRef)
        .then((doc) => {
          if (doc.exists()) {
            const displayName = doc.data().displayName;
            setUserName(displayName);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document: ", error);
        });
    }
  }, [user]);


  const logout = async () => {
    auth.signOut();
    if (user) {
      await deleteDoc(doc(db, "userdata", user.uid));
    }
  };

  return (
    <header className="sticky w-full flex gap-2 py-3 justify-between border-b-[0.2px] border-gray-400">
      <div className="flex gap-[5px] ml-3 my-auto">
        <Image
          src="/assets/images/logo_1.png"
          loading="lazy"
          width={50}
          height={50}
          alt={"Logo"}
        />
        <div>
          <p className="font-medium text-[13px]">{greeting}</p>
          <p className="font-bold text-[15px]">{userName}</p>
        </div>
      </div>
      <div className="mr-3 my-auto flex gap-3 text-gray-400 relative">
        <SearchOutlinedIcon
          onClick={() => router.push("/search")}
          className="hover:text-white cursor-pointer"
        />

        <NotificationsNoneOutlinedIcon
          onClick={() => router.push("/notifications")}
          className="hover:text-white cursor-pointer"
        />

        <ExitToAppOutlinedIcon
          onClick={logout}
          className="hover:text-white cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
