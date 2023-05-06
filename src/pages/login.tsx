import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import LoginCover from "@/components/Login/loginCover";
import Link from "next/link";
import Image from "next/image";
import { collection, addDoc, updateDoc, doc, setDoc } from "firebase/firestore";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useAuthState(auth);
  const [hasPremium, setHasPremium] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const googleAuth = new GoogleAuthProvider();

  const createUserAccount = async () => {
    const result = await signInWithPopup(auth, googleAuth);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (user) {
      router.push("/");
      const addUserToDatabase = async () => {
        if (user) {
          const globalUserData = await setDoc(
            doc(db, "globalUserData", user.uid),
            {
              creationTime: user.metadata.creationTime,
              displayName: user.displayName,
              email: user.email,
              emailIsVerified: user.emailVerified,
              hasPremium: hasPremium,
              lastSignIn: user.metadata.lastSignInTime,
              phoneNumber: user.phoneNumber,
              photoUrl: user.photoURL,
              userId: user.uid,
            }
          );
          const userData = await setDoc(doc(db, "userdata", user.uid), {
            creationTime: user.metadata.creationTime,
            displayName: user.displayName,
            email: user.email,
            emailIsVerified: user.emailVerified,
            hasPremium: hasPremium,
            lastSignIn: user.metadata.lastSignInTime,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            userId: user.uid,
          });

          const friendDocRef = doc(db, "friends", user.uid);
          setDoc(friendDocRef, { userId: user.uid });
        }
      };
      addUserToDatabase();
    }
  }, [user]);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="w-full h-full absolute bottom-0 flex flex-col">
      <LoginCover />
      <div className="relatiove bottom-[90px]">
        <div className="text-center text-white mt-10">
          <h1 className="font-bold text-3xl">Welcome!</h1>
          <p className="text-gray-400 tracking-5 text-md mt-2">
            SportPals Bring Sports Fan Together!!
          </p>
        </div>
        <button
          onClick={createUserAccount}
          className="bg-gradient-to-r from-cyan-500 to-blue-500 py-2 w-fit text-white px-5 mt-5 rounded-lg flex items-center mx-auto justify-around gap-5 shadow-sm shadow-gray-600"
        >
          <Image
            src="/assets/images/google.png"
            width={30}
            height={30}
            alt={"Google"}
          />
          <p className="my-auto text-cyan-900 font-semibold">
            Sign In With Google
          </p>
        </button>
        <div className="absolute bottom-0 m-auto left-0 right-0 mb-5 w-fit">
          <p className="text-gray-400 text-sm mx-3 text-center">
            By Signing In, You Agree With Our{" "}
            <Link href="/" className="text-white underline font-bold">
              Terms and Conditions
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
