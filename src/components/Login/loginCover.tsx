import Image from "next/image";
import React from "react";

const LoginCover = () => {
  const generateLoginCover = () => {
    const imageCovers = [
      "/assets/images/ronaldo.png",
      "/assets/images/messi.png",
    ];
    const randomImageCover = Math.floor(Math.random() * imageCovers.length);
    return imageCovers[randomImageCover];
  };
  return (
    <div className="flex items-center mx-auto mt-5">
      <Image
        src={generateLoginCover()}
        loading="lazy"
        width={200}
        className="h-fit max-h-[30vh] w-[20vh]"
        height={200}
        alt={"Cover"}
      />
    </div>
  );
};

export default LoginCover;
