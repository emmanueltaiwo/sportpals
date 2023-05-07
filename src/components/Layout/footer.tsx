import React from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();
  return (
    <footer className="fixed bottom-0 bg-gradient-to-r from-slate-800 to-sky-900 w-full h-[70px] py-5 rounded-t-lg shadow-2xl shadow-white">
      <div className="w-full flex justify-around text-white">
        <HomeOutlinedIcon
          onClick={() => router.push("/")}
          className="hover:text-white cursor-pointer bg-none"
        />

        <SearchOutlinedIcon
          onClick={() => router.push("/search")}
          className="hover:text-white cursor-pointer bg-none"
        />

        <SportsSoccerOutlinedIcon
          onClick={() => router.push("/sports")}
          style={{ fontSize: "3rem", marginTop: "-0.5rem" }}
          className="hover:text-white cursor-pointer text-amber-600 my-auto animate-spin slow"
        />

        <ChatBubbleOutlineOutlinedIcon
          onClick={() => router.push("/chat")}
          className="hover:text-white cursor-pointer"
        />

        <PermIdentityOutlinedIcon
          onClick={() => router.push("/profile")}
          className="hover:text-white cursor-pointer"
        />
      </div>
    </footer>
  );
};

export default Footer;
