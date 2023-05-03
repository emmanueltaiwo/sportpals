import React from "react";
import Image from "next/image";

interface Props {
  profilePic: string;
  displayName: string;
  displayTime: string;
  post: string;
}

const Feed = (props: Props) => {
  return (
    <div className="flex flex-col w-full mx-auto  rounded-2xl pb-5 pt-2">
      <div className="flex justify-between mx-3 items-center">
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
        <div className="my-auto">{/* <SportsScoreIcon /> */}</div>
      </div>
      <div className="flex mx-5 rounded-2xl h-fit pt-3 px-3 pb-3">
        <p className="text-white font-md tracking-wide text-[15px]">
          {props.post}
        </p>
      </div>
    </div>
  );
};

export default Feed;
