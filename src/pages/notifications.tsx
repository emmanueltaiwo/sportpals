import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import CheckIcon from "@mui/icons-material/Check";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Notification 1",
    description: "Welcome to SportPals",
    time: "Just Now",
  },
  {
    id: 2,
    title: "Notification 2",
    description: "This is the second notification.",
    time: "Just Now",
  },
  {
    id: 3,
    title: "Notification 3",
    description: "This is the third notification.",
    time: "Just Now",
  },
];

const Notifications = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
   const [notificationList, setNotificationList] = useState<Notification[]>([]);

   useEffect(() => {
     setNotificationList(notifications);
   }, []);

   const removeNotification = (id: number) => {
     setNotificationList((prevNotifications) =>
       prevNotifications.filter((notification) => notification.id !== id)
     );
   };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);
  return (
    <Layout>
      <div className="pb-[20vh]">
        <h1 className="mx-5 text-[35px] mt-5 font-bold tracking-wider">
          Notifications
        </h1>
        <p className="mx-5 text-sm mt-1 text-gray-400">
          You have{" "}
          <span className="text-white font-bold">{notifications.length}</span>{" "}
          Notifications
        </p>
        <div className="flex flex-col w-[95%] gap-8 h-fit mx-auto rounded-t-3xl mt-8 ">
          {notificationList.length > 0 ? (
            <ul className="space-y-4">
              {notificationList.map((notification) => (
                <li
                  key={notification.id}
                  className="bg-white p-4 rounded-md shadow-md flex space-x-4"
                >
                  <div className="flex-shrink-0">
                    <img
                      src="/assets/images/logo_1.png"
                      alt="User Avatar"
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-base font-semibold mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400">{notification.time}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="text-sm text-blue-500 focus:outline-none"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No notifications found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
