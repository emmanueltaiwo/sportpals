import React from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};
const PageAnimation = (props: Props) => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      {props.children}
    </motion.div>
  );
};

export default PageAnimation;
