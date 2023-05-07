import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db } from "../../../firebase";
import Layout from "@/components/Layout";
import Image from "next/image";
import { collection, getDocs, addDoc, onSnapshot, query, where } from "firebase/firestore";
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
  const [show, setShow] = useState(true);
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
          console.log(friends);
        }
      );

      return unsubscribe;
    }
  }, [friends, user]);

  const handleAccept = async (userId: string, userData: any) => {
    try {
      const friendsRef = collection(db, `friends/${userId}/friend${userId}`);

      // Query for the user's document in the friends collection
      const querySnapshot = await getDocs(
        query(friendsRef, where("id", "==", user?.uid))
      );

      if (querySnapshot.docs.length === 0) {
        // User doesn't exist in the friends collection, create new collection
        const docRef = await addDoc(friendsRef, {
          name: userData.name,
          photoURL: userData.photoURL,
          hasPremium: userData.hasPremium,
          id: user?.uid,
        });
        console.log("Collection created with ID: ", docRef.id);
        alert(`new friend added`)
      } else {
        // User already exists in the friends collection, show alert message
        alert("User already exists in friends list");
      }
    } catch (error) {
      console.error("Error creating collection:", error);
    }
    setShow(false);
  };

  return (
    <Layout>
      <div className="flex flex-col w-full mt-5 pb-[20vh]">
        <div className={`${show ? "flex-flex-col w-ful" : "hidden"}`}>
          <div className="flex gap-3 justify-between mx-5">
            <p className="text-cyan-200">SUGGESTED FOR YOU</p>
            <p
              className="text-sm underline text-gray-500"
              onClick={() => router.push("/search")}
            >
              SEE ALL
            </p>
          </div>
          <div className="flex gap-3 justify-between mx-5 mt-5">
            <Image
              src={userData.photoURL || ""}
              className="rounded-full border-2 border-cyan-300"
              width={50}
              height={50}
              alt=""
            />
            <p className="my-auto text-gray-500 text-[12px]">
              Would you like to connect with{" "}
              <span className="text-white font-md">{userData.name}</span>
            </p>
          </div>
          <div className="flex justify-between gap-3 mr-5 ml-3 mt-5">
            <button
              onClick={() => {
                if (user?.uid) {
                  handleAccept(user.uid, userData);
                }
              }}
              className="w-fit bg-cyan-500 rounded-full px-14 py-2 text-slate-800 font-medium text-md"
            >
              Accept
            </button>
            <button
              className="w-fit bg-gray-500 rounded-full px-14 py-2 text-white font-medium text-md"
              onClick={() => setShow(false)}
            >
              Decline
            </button>
          </div>
        </div>

        <section className="mt-[3vh]">
          <h1 className="mx-5 text-[40px] font-bold tracking-wider">Chats</h1>
          <div className="flex flex-col gap-5">
            {friends.map((friend) => (
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
