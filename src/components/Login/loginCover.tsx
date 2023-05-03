import Image from "next/image";
import React from "react";

const LoginCover = () => {
  const generateLoginCover = () => {
    const imageCovers = [
      "/assets/images/messi.png",
      "/assets/images/ronaldo.png",
      "/assets/images/neymar.png",
    ];
    const randomImageCover = Math.floor(Math.random() * imageCovers.length);
    return imageCovers[randomImageCover];
  };
  return (
    <div className="flex items-center mx-auto">
      <Image
        src={generateLoginCover()}
        loading="lazy"
        width={200}
        className="h-fit w-[25vh]"
        height={200}
        alt={"Cover"}
      />
    </div>
  );
};

export default LoginCover;
