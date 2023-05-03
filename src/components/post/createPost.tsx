import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { collection, addDoc, doc } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import moment from "moment";

const CreatePost = () => {
  const [user] = useAuthState(auth);
  const [post, setPost] = useState("");

  const createNewPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const now = firebase.firestore.Timestamp.now();

    const userPostData = {
      post: post,
      createdTime: now,
      userName: user?.displayName?.toUpperCase(),
      profilePic: user?.photoURL,
    };

    const docRef = await addDoc(collection(db, "posts"), userPostData);
    console.log("Document written with ID: ", docRef.id);
    setPost("");
  };

  return (
    <form
      className="flex items-center justify-center mt-3 mx-3 gap-2"
      onSubmit={createNewPost}
    >
      <textarea
        className="w-[90%] h-[15vh] p-2 border border-gray-300 rounded-2xl bg-inherit resize-none focus:outline-none outline-none focus:ring focus:border-gray-500 text-white text-sm"
        placeholder="What's on your mind?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <button
        type="submit"
        className="bg-white px-2 py-2 w-fit text-black rounded-lg text-sm"
      >
        Post
      </button>
    </form>
  );
};

export default CreatePost;
