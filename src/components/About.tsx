import React, { useState } from "react";
import { motion } from "framer-motion";

// Variants for the parent container to control staggered children animations
const containerVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeInOut",
      staggerChildren: 0.3, // Stagger the animation of each child by 0.3s
    },
  },
};

// Variants for each child element (e.g., paragraph)
const childVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const AboutUs: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isSmall = window.innerWidth < 768;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const paragraphs = [
    "We are a software development company with a passion for creating modern, responsive, and high-performance applications, interfaces, and websites.",
    "As an emerging company, Rusty's Web Services is dedicated to making a difference in the digital space. We understand the challenges that businesses face in an ever-evolving online world, and we are here to help bridge the gap between ideas and a successful online presence.",
    "Our team is small but highly motivated, driven by a commitment to quality and excellence in every project we undertake. We believe that our clients are at the heart of everything we do, and we go the extra mile to ensure complete customer satisfaction. Your success is our success, and we are here to listen, adapt, and deliver exactly what you need.",
    "At Rusty's Web Services, we are not just building software solutions; we are building relationships. We believe in open communication, transparency, and a partnership approach where we work alongside you every step of the way. Our goal is to create a positive and personalised experience that leaves you completely satisfied.",
    "Whether you are a start-up looking for a new website, a business wanting to optimise your digital presence, or someone with an idea that needs to come to life, we are here to help. Let us work together to turn your vision into reality.",
  ];

  return (
    <motion.div
      className="min-h-[20vh] mt-10 md:min-h-[50vh] w-screen text-white flex justify-center items-center my-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div className="max-w-[80vw] sm:max-w-[60vw] mx-auto text-center flex flex-col justify-center items-center">
        <motion.h2
          className="text-3xl font-bold mb-6 cursor-pointer sm:cursor-default"
          onClick={toggleDropdown}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {isSmall ? (isOpen ? "v " : "> ") : ""} About Us
        </motion.h2>
        <div
          className={`about-scroll transition-all duration-500 ease-in-out overflow-x-hidden overflow-scroll sm:overflow-hidden px-4 sm:px-0 ${
            isOpen ? "max-h-[60vh] rounded-md border-2 border-green-700 py-4" : "max-h-0"
          } sm:max-h-screen`}
        >
          <motion.div
            className="flex flex-col justify-center items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            
          >
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-base sm:text-lg"
                variants={childVariants}
              >
                {paragraph}
                <br/>
                <br/>
              </motion.p>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const OurMission: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isSmall = window.innerWidth < 768;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const missionParagraphs = [
    "Our mission is to deliver the best solutions possible by putting your requirements first, ensuring full satisfaction. We are passionate about helping both individuals and businesses succeed online, offering fully customisable solutions to make your ideas stand out.",
    "We strive to create digital experiences that not only meet your business needs but also inspire and engage your target audience. By combining cutting-edge technology with our dedication to customer care, we ensure that our services are tailor-made to drive results and maximise your success.",
    "Our goal is to empower businesses and individuals by giving them the tools and solutions they need to thrive in the digital world. We believe in innovation, collaboration, and a deep understanding of our clients' goals, enabling us to deliver products that are both functional and transformative.",
  ];

  return (
    <motion.div
      className="min-h-[20vh] mt-10 md:mt-0 md:min-h-[50vh] w-screen text-white flex justify-center items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      <motion.div className="max-w-[80vw] sm:max-w-[60vw] mx-auto text-center flex flex-col justify-center items-center">
        <motion.h3
          className="text-3xl font-semibold mb-6 cursor-pointer sm:cursor-default"
          onClick={toggleDropdown}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {isSmall ? (isOpen ? "v " : "> ") : ""} Our Mission
        </motion.h3>
        <div
          className={`about-scroll transition-all duration-500 ease-in-out overflow-x-hidden overflow-scroll sm:overflow-hidden px-4 sm:px-0 ${
            isOpen ? "max-h-[60vh] rounded-md border-2 border-green-700 py-4" : "max-h-0"
          } sm:max-h-screen`}
        >
          <motion.div
            className="flex flex-col justify-center items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {missionParagraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-base sm:text-lg"
                variants={childVariants}
              >
                {paragraph}
                <br/>
                <br/>
              </motion.p>
            ))}
          </motion.div>
        </div>
      </motion.div>
      <p id="services" className="transparent relative top-24" />
    </motion.div>
  );
};

export { AboutUs, OurMission };
