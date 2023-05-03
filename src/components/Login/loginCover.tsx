import Image from "next/image";
import React from "react";

const LoginCover = () => {
  const generateLoginCover = () => {
    const imageCovers = [
      "/assets/images/ronaldo.png",
      "/assets/images/neymar.png",
      "/assets/images/ronaldo_2.png",
      "/assets/images/messi.png",
      "/assets/images/lewandowski.png",
      "/assets/images/ronaldo_3.png",
      "/assets/images/bale.png",
      "/assets/images/martial.png",
      "/assets/images/david-villa.png",
      "/assets/images/neymar_2.png",
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
        className="h-[30vh] w-[25vh]"
        height={200}
        alt={"Cover"}
      />
    </div>
  );
};

export default LoginCover;
