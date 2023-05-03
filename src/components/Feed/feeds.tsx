import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import FlipMove from "react-flip-move";
import Feed from "./feed";

interface allPostData {
  displayName: string;
  createdTime: Timestamp;
  post: string;
  profilePic: string;
  displayTime: string;
}

const Feeds = () => {
  const [postData, setPostData] = useState<allPostData[]>([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdTime", "desc"));

    // Get initial data
    getDocs(q).then((querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => ({
        displayName: doc.data().userName,
        createdTime: doc.data().createdTime,
        post: doc.data().post,
        profilePic: doc.data().profilePic,
        displayTime: getTimeDiff(doc.data().createdTime.toDate()),
      }));
      setPostData(documents);
    });

    // Listen for changes
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => ({
        displayName: doc.data().userName,
        createdTime: doc.data().createdTime,
        post: doc.data().post,
        profilePic: doc.data().profilePic,
        displayTime: getTimeDiff(doc.data().createdTime.toDate()),
      }));
      setPostData(documents);
    });

    // Unsubscribe from updates when component unmounts
    return () => unsubscribe();
  }, []);

  const getTimeDiff = (dateTime: Date) => {
    const currentDateTime = new Date();
    const diffInMs = Math.abs(currentDateTime.getTime() - dateTime.getTime());

    const seconds = Math.floor(diffInMs / 1000);
    if (seconds < 60) {
      return `${seconds} seconds ago`;
    }

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    }

    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
      return `${hours} hours ago`;
    }

    const days = Math.floor(hours / 24);
    if (days < 7) {
      return `${days} days ago`;
    }

    return dateTime.toLocaleString();
  };

  return (
    <section className="pb-[30%] flex flex-col gap-2 mt-10">
      <FlipMove>
        {postData.map((item) => (
          <div
            key={`${item.displayName} ${item.post}`}
            className="w-full border-t-[1px] mt-5 border-b-[1px] border-gray-500 h-fit pb-5"
          >
            <Feed
              profilePic={item.profilePic}
              displayName={item.displayName}
              displayTime={item.displayTime}
              post={item.post}
            />
          </div>
        ))}
      </FlipMove>
    </section>
  );
};

export default Feeds;
