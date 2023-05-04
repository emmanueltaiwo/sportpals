import React from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import FeedOption from "./feedOption";

interface Props {
  profilePic: string;
  displayName: string;
  displayTime: string;
  post: string;
  hasPremium: boolean;
}

const Feed = (props: Props) => {
  return (
    <section className="flex flex-col w-[95%] mx-auto  rounded-2xl pb-5 pt-2 bg-slate-800">
      <div className="flex justify-between mx-3 items-center mt-2">
        <div className="flex gap-[5px] ml-3 my-auto">
          <Image
            src={props.profilePic}
            loading="lazy"
            width={40}
            height={30}
            alt={"Logo"}
            className="rounded-full border-[1px]"
          />
          <div className="ml-2">
            <p className="font-semibold text-[15px]">{props.displayName}</p>
            <p className="font-light text-gray-400 text-[10px]">
              {props.displayTime}
            </p>
          </div>
        </div>
        <div className="my-auto">
          <StarIcon
            className={`${
              props.hasPremium ? "text-amber-500" : "text-gray-700"
            }`}
          />
        </div>
      </div>
      <div className="w-[90%] rounded-xl px-3 pt-2 pb-5 flex mx-auto bg-slate-700 mt-3">
        <p className="text-sm">{props.post}</p>
      </div>
      <div className="w-[90%]">
        <FeedOption />
      </div>
    </section>
  );
};

export default Feed;
