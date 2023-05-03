import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { useRouter } from "next/router";


const Footer = () => {
  const router = useRouter();
  return (
    <footer className="fixed bottom-0 bg-purple-900 w-full h-[70px] py-5 rounded-t-lg shadow-2xl shadow-white">
      <div className="w-full flex justify-around text-gray-400 text-lg">
        <HomeOutlinedIcon
          onClick={() => router.push("/admin")}
          className="hover:text-white cursor-pointer"
        />

        <SportsSoccerOutlinedIcon
          onClick={() => router.push("/")}
          className="hover:text-white cursor-pointer"
        />

        <ChatBubbleOutlineOutlinedIcon
          onClick={() => router.push("/")}
          className="hover:text-white cursor-pointer"
        />

        <PermIdentityOutlinedIcon
          onClick={() => router.push("/")}
          className="hover:text-white cursor-pointer"
        />
      </div>
    </footer>
  );
};

export default Footer;
