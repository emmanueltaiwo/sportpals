import React from "react";

interface Props {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = (props: Props) => {
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
      onClick={props.onClose}
    >
      <div className="bg-white p-4 rounded-md">{props.children}</div>
    </div>
  );
};

export default Modal;
