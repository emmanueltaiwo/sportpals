import React, { useEffect, useState } from "react";
import "firebase/firestore";
import { collection, addDoc, doc, getDoc, query } from "firebase/firestore";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import Image from "next/image";
import Modal from "react-modal";

Modal.setAppElement("#__next");

const CreatePost = () => {
  const [user] = useAuthState(auth);
  const [post, setPost] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [hasPremium, setHasPremium] = useState(false);

  useEffect(() => {}, []);

  const createNewPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const now = firebase.firestore.Timestamp.now();

    const userId = user?.uid;

    const hasPremiumRef = doc(collection(db, "globalUserData"), userId);

    getDoc(hasPremiumRef)
      .then((doc) => {
        if (doc.exists()) {
          setHasPremium(doc.data().hasPremium);
          console.log("Create post", userId, hasPremium);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error: any) => {
        console.log("Error getting document:", error);
      });

    const userPostData = {
      post: post,
      createdTime: now,
      userName: user?.displayName?.toUpperCase(),
      profilePic: user?.photoURL,
      hasPremium: hasPremium,
    };

    const docRef = await addDoc(collection(db, "posts"), userPostData);
    console.log("Document written with ID: ", docRef.id);
    setPost("");
    setModalIsOpen(false);
  };

  return (
    <>
      <form
        className="flex items-center justify-left mt-5 gap-2  border-b-[0.2px] border-gray-400 pb-5"
        onClick={() => setModalIsOpen(true)}
      >
        <Image
          src={user?.photoURL || ""}
          className="rounded-xl h-[50px] w-[50px] ml-5"
          height={50}
          width={50}
          alt=""
        />
        <input
          type="text"
          className="h-[50px] rounded-xl w-full mr-5 text-sm pl-5 border-none outline-none text-gray-700 bg-gray-800 active:bg-gray-700 active:text-gray-800"
          placeholder="Share what's on your mind."
          disabled
        />
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-slate-700 p-5 w-[95%] rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        overlayClassName="bg-black bg-opacity-50 fixed inset-0"
      >
        <form onSubmit={createNewPost}>
          <textarea
            className="w-full h-[15vh] p-2 border border-gray-300 rounded-2xl bg-inherit resize-none focus:outline-none outline-none focus:ring focus:border-gray-500 text-white text-sm mb-5"
            placeholder="What's on your mind?"
            value={post}
            required
            onChange={(e) => setPost(e.target.value)}
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 font-bold px-4 py-2 text-white rounded-lg text-sm"
          >
            Post
          </button>
        </form>
      </Modal>
    </>
  );
};

export default CreatePost;

{
  /* <textarea
        className="w-[90%] h-[15vh] p-2 border border-gray-300 rounded-2xl bg-inherit resize-none focus:outline-none outline-none focus:ring focus:border-gray-500 text-white text-sm"
        placeholder="What's on your mind?"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      /> */
}
{
  /* <button
        type="submit"
        className="bg-white px-2 py-2 w-fit text-black rounded-lg text-sm"
      >
        Post
      </button> */
}
