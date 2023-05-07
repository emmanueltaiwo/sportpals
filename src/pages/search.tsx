import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase";
import PageAnimation from "@/components/page-animation";
import { DocumentData } from "@firebase/firestore-types";
import Layout from "@/components/Layout";
import {
  collection,
  addDoc,
  doc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Image from "next/image";
import AddIcon from "@mui/icons-material/Add";

type AddUserData = {
  name: string;
  photoURL: string;
  hasPremium: boolean;
};

const Search = () => {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<AddUserData>({
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
    const userId = user?.uid;

    if (userId) {
      const userRef = collection(db, "globalUserData");

      getDocs(userRef)
        .then((querySnapshot) => {
          const usersData = querySnapshot.docs
            .filter((doc) => doc.id !== user?.uid)
            .map((doc) => doc.data());
          setUserList(usersData);
          console.log("User List", userList);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  }, [userList, user]);

  const handleSearch = (e: {
    preventDefault: () => void;
    target: { value: React.SetStateAction<string> };
  }) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handleAddAccept = async (userId: string) => {
    try {
      const selectedUser = userList.find((user) => user.userId === userId);
      if (selectedUser) {
        const currentUserRef = collection(
          db,
          `friends/${user?.uid}/friend${user?.uid}`
        );
        const selectedUserRef = collection(
          db,
          `friends/${selectedUser.userId}/friend${selectedUser.userId}`
        );

        // Check if the selected user already exists in the current user's collection
        const currentUserQuerySnapshot = await getDocs(currentUserRef);
        const currentUserExists = currentUserQuerySnapshot.docs.some(
          (doc) => doc.data().id === selectedUser.userId
        );

        // Check if the current user already exists in the selected user's collection
        const selectedUserQuerySnapshot = await getDocs(selectedUserRef);
        const selectedUserExists = selectedUserQuerySnapshot.docs.some(
          (doc) => doc.data().id === user?.uid
        );

        if (currentUserExists) {
          alert(
            `User ${selectedUser.displayName} is already in your friends list`
          );
        } else {
          const currentUserData = {
            id: selectedUser.userId,
            name: selectedUser.displayName,
            photoURL: selectedUser.photoUrl,
            hasPremium: selectedUser.hasPremium,
          };
          await addDoc(currentUserRef, currentUserData);
          alert(`${selectedUser.displayName} is added to your friends list`);
          console.log(`User ${userId} added to your friends list`);
        }

        if (selectedUserExists) {
        } else {
          const selectedUserData = {
            id: user?.uid,
            name: user?.displayName,
            photoURL: user?.photoURL,
          };
          await addDoc(selectedUserRef, selectedUserData);
          console.log(
            `User ${user?.uid} added to ${selectedUser.displayName}'s friends list`
          );
        }
      }
    } catch (error) {
      console.error("Error adding user to friends list: ", error);
    }
  };

  return (
    <div>
      <Layout>
        <h1 className="text-center mt-3 font-bold text-[20px]">
          Search for your SportPal😊
        </h1>

        <div className="mt-5 flex justify-center">
          <input
            type="search"
            className="h-[50px] rounded-xl w-[80%] pl-5 border-none outline-none font-medium text-md text-gray-200 bg-gray-800 active:bg-gray-700 active:text-gray-800"
            placeholder="Search ..."
            value={search}
            onChange={handleSearch}
          />
        </div>

        <div className="w-full flex flex-col gap-10 h-fit pb-[50%] py-3 mt-10">
          {isLoading ? (
            <p>Loading...</p>
          ) : search.trim() === "" ? (
            userList.map((data) => (
              <div
                key={data.userId}
                className="flex w-[90%] gap-2 justify-between mx-3"
              >
                <div>
                  <Image
                    src={data.photoUrl || ""}
                    width={50}
                    height={50}
                    alt={""}
                    className="w-[15vh] h-[15vh] rounded-xl"
                  />
                </div>
                <div className="flex flex-col my-auto">
                  <h2 className="text-cyan-300 font-bold text-[17px]">
                    {data.displayName}
                  </h2>
                  <p
                    className={`${
                      data.hasPremium
                        ? "text-sm text-amber-400 font-bold"
                        : "text-sm text-gray-400"
                    }`}
                  >
                    {data.hasPremium ? "Premium User" : "Not a Premium User"}
                  </p>
                </div>
                <div
                  className="my-auto bg-cyan-700 px-3 py-2 rounded-xl"
                  onClick={() => handleAddAccept(data.userId)}
                >
                  <AddIcon />
                </div>
              </div>
            ))
          ) : userList.filter((data) =>
              data.displayName.toLowerCase().includes(search.toLowerCase())
            ).length === 0 ? (
            <p className="text-center">User not found</p>
          ) : (
            userList
              .filter((data) =>
                data.displayName.toLowerCase().includes(search.toLowerCase())
              )
              .map((data) => (
                <div
                  key={data.userId}
                  className="flex w-[90%] gap-2 justify-between mx-3"
                >
                  <div>
                    <Image
                      src={data.photoUrl || ""}
                      width={50}
                      height={50}
                      alt={""}
                      className="w-[15vh] h-[15vh] rounded-xl"
                    />
                  </div>
                  <div className="flex flex-col my-auto">
                    <h2 className="text-cyan-300 font-bold text-[17px]">
                      {data.displayName}
                    </h2>
                    <p
                      className={`${
                        data.hasPremium
                          ? "text-sm text-amber-400 font-bold"
                          : "text-sm text-gray-400"
                      }`}
                    >
                      {data.hasPremium ? "Premium User" : "Not a Premium User"}
                    </p>
                  </div>
                  <div
                    className="my-auto bg-cyan-700 px-3 py-2 rounded-xl"
                    onClick={() => handleAddAccept(data.userId)}
                  >
                    <AddIcon />
                  </div>
                </div>
              ))
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Search;
