import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db } from "../../../firebase";
import Layout from "@/components/Layout";
import Image from "next/image";
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

type UserData = {
  name: string;
  photoURL: string;
  hasPremium: boolean;
};

type FriendData = {
  name: string;
  photoURL: string;
  hasPremium: boolean;
  id: string;
  message: string;
};

const Index = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [friends, setFriends] = useState<FriendData[]>([]);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    photoURL: "",
    hasPremium: false,
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (user) {
      // Fetch a random document from the 'globalUserData' collection

      const getRandomDocument = async () => {
        const collectionRef = collection(db, "globalUserData");
        const snapshot = await getDocs(collectionRef);
        const docs = snapshot.docs.filter((doc) => doc.id !== user?.uid); // filter out the current user's document

        // get the user's friends collection
        const friendsCollectionRef = collection(
          db,
          `friends/${user?.uid}/friend${user?.uid}`
        );
        const friendsSnapshot = await getDocs(friendsCollectionRef);
        const friendIds = friendsSnapshot.docs.map((doc) => doc.id); // get an array of the friend ids

        // filter out any documents that are already in the friends collection
        const filteredDocs = docs.filter((doc) => !friendIds.includes(doc.id));

        const randomIndex = Math.floor(Math.random() * filteredDocs.length);
        return filteredDocs[randomIndex];
      };

      // Set the userData state once a random document is fetched
      const fetchRandomDocument = async () => {
        const doc = await getRandomDocument();
        setUserData({
          name: doc.data().displayName,
          photoURL: doc.data().photoUrl,
          hasPremium: doc.data().hasPremium,
        });
      };

      // Fetch a new random document every 24 hours
      const interval = setInterval(fetchRandomDocument, 24 * 60 * 60 * 1000);

      // Fetch a random document once the component mounts
      fetchRandomDocument();

      // Clean up the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const unsubscribe = onSnapshot(
        collection(db, `friends/${user?.uid}/friend${user?.uid}`),
        (snapshot) => {
          const friendData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as FriendData[];
          setFriends(friendData);
        }
      );

      return unsubscribe;
    }
  }, [friends, user]);

  return (
    <Layout>
      <div className="flex flex-col w-full mt-5 pb-[20vh]">
        <section className="mt-[3vh]">
          <h1 className="mx-5 text-[40px] font-bold tracking-wider">Chats</h1>
          <div className="flex flex-col gap-5">
            {friends.length === 0
              ? "You have 0 Friends, Add Some Friends"
              : friends.map((friend) => (
                  <div
                    className="mx-5 flex justify-between gap-2 mt-4"
                    key={friend.id}
                  >
                    <div className="flex gap-3">
                      <Image
                        src={friend.photoURL || ""}
                        width={50}
                        height={50}
                        alt={""}
                        className="rounded-full border-2 border-cyan-300"
                      />

                      <div className="my-auto flex flex-col">
                        <p className="font-bold text-lg">{friend.name}</p>
                        <span className="text-[13px] text-gray-500">
                          {friend.message || "No message"}
                        </span>
                      </div>
                    </div>

                    <div className="my-auto bg-cyan-700 px-3 py-2 rounded-xl">
                      <ChatBubbleOutlineOutlinedIcon />
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
