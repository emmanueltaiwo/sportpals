import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";

const FeedOption = () => {
  return (
    <div className="flex w-[90%] mx-10 justify-between mt-5">
      <div className="bg-slate-500 px-3 py-2 rounded-xl">
        <ThumbUpIcon className="text-cyan-500 active:text-cyan-300" />
      </div>
      <div className="bg-slate-500 px-3 py-2 rounded-xl">
        <CommentIcon className="text-cyan-500 active:text-cyan-300" />
      </div>
      <div className="bg-slate-500 px-3 py-2 rounded-xl">
        <ShareIcon className="text-cyan-500 active:text-cyan-300" />
      </div>
    </div>
  );
};

export default FeedOption;
