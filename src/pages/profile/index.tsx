import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { auth, db } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const Index = () => {
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);
  const [userName, setUserName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    const userId = user?.uid;
    const userRef = doc(db, `globalUserData/${userId}`);

    // Update the user document with the new displayName and photoUrl
    updateDoc(userRef, {
      displayName: newUsername,
    })
      .then(() => {
        console.log("Document successfully updated!");
        alert("Username Updated Succesfully, Refresh for changes to take place")
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });

    handleModalClose();
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const userId = user?.uid;
    if (userId) {
      const userRef = doc(db, "globalUserData", userId); // reference to the document with the user's id

      getDoc(userRef)
        .then((doc) => {
          if (doc.exists()) {
            const displayName = doc.data().displayName;
            setUserName(displayName);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document: ", error);
        });
    }
  }, [user]);

  useEffect(() => {
    const userId = user?.uid;
    if (userId) {
      const userRef = doc(db, "globalUserData", userId); // reference to the document with the user's id

      getDoc(userRef)
        .then((doc) => {
          if (doc.exists()) {
            const photoUrl = doc.data().photoUrl;
            setPhotoUrl(photoUrl);
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document: ", error);
        });
    }
  }, [user]);


  return (
    <Layout>
      <section className="w-[100%] mt-10">
        <div className="flex gap-3 w-full justify-start pb-[5vh]">
          <div className="ml-3">
            <Image
              src={photoUrl || "/assets/images/logo_1.png"}
              width={100}
              height={100}
              alt={"Profile Pic"}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col my-auto ml-3 mr-2 gap-3">
            <h1 className="text-[18px] font-bold">{userName}</h1>
            <div className="flex gap-3">
              <button
                className="bg-white text-slate-900 w-fit px-4 py-1 rounded-xl font-bold text-[15px]"
                onClick={handleModalOpen}
              >
                Edit Profile
              </button>
              <div
                onClick={(e) => {
                  e.preventDefault();
                  alert("OOps! Feature not added yet!");
                }}
                className="my-auto w-fit bg-slate-700 py-2 px-2 rounded-xl"
              >
                <DeleteIcon className="text-red-500" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-5 text-gray-600">
          <h1 className="w-[80%] text-center">
            Oops! Nothing to show here {"(Under Construction)"}
          </h1>
        </div>

        <Modal open={isModalOpen} onClose={handleModalClose}>
          <Box
            sx={{ p: 2 }}
            className="bg-gray-500 flex-col flex mt-[30%] mx-5 rounded-lg"
          >
            <Typography variant="h6">Edit Profile</Typography>
            <TextField
              label="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              fullWidth
              className="border-white border-2"
              sx={{ mt: 2 }}
              required
            />
            
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                variant="contained"
                className="bg-white text-slate-900"
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Modal>
      </section>
    </Layout>
  );
};

export default Index;
