import React, { useState } from "react";
import Image from "next/image";
import Modal from "./modal";

interface Props {
  photoUrl: string;
  displayName: string;
}

const Story = (props: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleStoryClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="flex items-center flex-col" onClick={handleStoryClick}>
        <Image
          src={props.photoUrl}
          className="rounded-xl border-[1px] border-cyan-600"
          width={50}
          height={50}
          alt={""}
        />
        <p className="text-center text-[10px] text-gray-200 mt-2">
          {props.displayName}
        </p>
      </div>
      {showModal && (
        <Modal onClose={handleModalClose}>
          <img
            src={props.photoUrl}
            loading="lazy"
            width={300}
            height={300}
            alt=""
          />
        </Modal>
      )}
    </>
  );
};

export default Story;
