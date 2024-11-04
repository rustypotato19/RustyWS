import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Separator: React.FC = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animation runs only once when the component comes into view
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  return (
    <motion.div
      ref={ref}
      className="mx-auto w-[80vw] sm:w-[60vw] h-6 border-[1px] rounded-full border-green-700 my-4"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    />
  );
};

export default Separator;
