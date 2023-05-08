import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Image from "next/image";

const Notifications = () => {
  const router = useRouter();
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

  const [user, loading, error] = useAuthState(auth);

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
        <div className="flex flex-col w-[100%] gap-8 h-fit bg-slate-800 py-10 rounded-t-3xl mt-8 ">
          {notifications.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 bg-gray-600 w-[95%] px-2 py-2 mx-3 rounded-3xl transition-all duration-200"
            >
              <div className="w-[30%]">
                <Image
                  src={user?.photoURL || ""}
                  width={60}
                  height={60}
                  className="rounded-lg"
                  alt={""}
                />
              </div>
              <div className="my-auto w-full">
                <p className="text-sm text-gray-300">{item.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;
