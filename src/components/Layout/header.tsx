import Image from "next/image";
import React, { useEffect, useState } from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { doc, deleteDoc, collection } from "firebase/firestore";

const Header = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [greeting, setGreeting] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "Welcome to SportPals",
      date: "10:00 AM",
      read: false,
    },
    {
      id: 2,
      message: "Connect with your SportPal Today",
      date: "11:30 AM",
      read: true,
    },
    {
      id: 3,
      message: "Upgrade to Premium Today and enjoy all premium benefits",
      date: "2:45 PM",
      read: false,
    },
  ];

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

  const logout = async () => {
    auth.signOut();
    if (user) {
      await deleteDoc(doc(db, "userdata", user.uid));
    }
  };

  const handleNotificationsClick = () => {
    setShowNotifications(!showNotifications);
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
          <p className="font-medium">{greeting}</p>
          <p className="font-bold">{user?.displayName}</p>
        </div>
      </div>
      <div className="mr-3 my-auto flex gap-3 text-gray-400 relative">
        <SearchOutlinedIcon
          onClick={() => router.push("/search")}
          className="hover:text-white cursor-pointer"
        />
        <div className="flex">
          <NotificationsNoneOutlinedIcon
            onClick={handleNotificationsClick}
            className="hover:text-white cursor-pointer"
          />
          <span className="bg-cyan-300 px-1 h-fit w-fit rounded-full text-slate-900 text-[10px]">
            {notifications.length}
          </span>
        </div>
        {showNotifications && (
          <div className="absolute right-0 top-full mt-3 w-80 h-96 bg-cyan-700  rounded-lg shadow-lg z-10">
            <div className="p-3 border-b-2 border-slate-700">
              <p className="text-lg font-bold text-white">
                Notifications ({notifications.length})
              </p>
            </div>
            <div className="overflow-y-auto max-h-[60vh] p-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="mb-3 flex gap-2 justify-between bg-slate-700 py-2 px-2 rounded-xl"
                >
                  <Image src={user?.photoURL || ""} className="rounded-lg" width={50} height={50} alt={""} />
                  <div className="w-full flex flex-col gap-2 my-auto">
                    <p className="text-sm font-medium text-white">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-300">{notification.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <ExitToAppOutlinedIcon
          onClick={logout}
          className="hover:text-white cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Header;
