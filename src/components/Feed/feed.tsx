import React from "react";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";

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
          <StarIcon className={`${props.hasPremium ? "text-amber-500" : "text-gray-700"}`} />
        </div>
      </div>
      <div className="w-[90%] rounded-xl px-3 pt-2 pb-5 flex mx-auto bg-slate-700 mt-3">
        <p className="text-sm">{props.post}</p>
      </div>
      <div></div>
    </section>
  );
};

export default Feed;

{
  /* <div className="flex justify-between mx-3 items-center">
        <div className="flex gap-[5px] ml-3 my-auto">
          <Image
            src={props.profilePic}
            loading="lazy"
            width={50}
            height={50}
            alt={"Logo"}
            className="rounded-full border-[1px]"
          />
          <div>
            <p className="font-semibold text-[15px]">{props.displayName}</p>
            <p className="font-light text-gray-400 text-[10px]">
              {props.displayTime}
            </p>
          </div>
        </div>
        {/* <div className="my-auto"><SportsScoreIcon /></div> 
      </div>
      <div className="flex mx-5 rounded-2xl h-fit pt-3 px-3 pb-3">
        <p className="text-white font-md tracking-wide text-[15px]">
          {props.post}
        </p>
      </div> */
}
