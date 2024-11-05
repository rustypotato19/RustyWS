import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillsData = [
  {
    name: "C++",
    img: "/images/logos/cpp.png",
    description:
      "C++ is a high-performance programming language used in systems programming, game development, and applications.",
    link: "https://en.wikipedia.org/wiki/C%2B%2B",
  },
  {
    name: "C#",
    img: "/images/logos/csharp.png",
    description:
      "C# is a modern object-oriented programming language developed by Microsoft.",
    link: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  },
  {
    name: "CSS",
    img: "/images/logos/css.svg",
    description:
      "CSS (Cascading Style Sheets) is used for describing the look and formatting of a document written in HTML.",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "Git",
    img: "/images/logos/git.svg",
    description:
      "Git is a distributed version-control system for tracking changes in source code during software development.",
    link: "https://git-scm.com/",
  },
  {
    name: "HTML",
    img: "/images/logos/html.svg",
    description:
      "HTML (HyperText Markup Language) is the standard language for creating web pages.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "Java",
    img: "/images/logos/java.png",
    description:
      "Java is a popular programming language, particularly for building server-side applications.",
    link: "https://www.oracle.com/java/",
  },
  {
    name: "JavaScript",
    img: "/images/logos/js.svg",
    description:
      "JavaScript is a versatile programming language primarily used for web development.",
    link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "Linux",
    img: "/images/logos/linux.png",
    description:
      "Linux is an open-source Unix-like operating system widely used for server environments and development.",
    link: "https://www.linux.org/",
  },
  {
    name: "PHP",
    img: "/images/logos/php.png",
    description:
      "PHP is a widely-used open-source scripting language especially suited for web development.",
    link: "https://www.php.net/",
  },
  {
    name: "Python",
    img: "/images/logos/py.png",
    description:
      "Python is a high-level programming language used for general-purpose programming.",
    link: "https://www.python.org/",
  },
  {
    name: "React",
    img: "/images/logos/react.png",
    description:
      "React is a JavaScript library for building user interfaces, especially single-page applications.",
    link: "https://reactjs.org/",
  },
  {
    name: "SQL",
    img: "/images/logos/sql.png",
    description:
      "SQL (Structured Query Language) is used for managing data in relational databases.",
    link: "https://en.wikipedia.org/wiki/SQL",
  },
  {
    name: "Windows",
    img: "/images/logos/win.png",
    description:
      "Windows is a popular operating system developed by Microsoft.",
    link: "https://www.microsoft.com/windows/",
  },
];

const Skills: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<number | null>(null); // State to store timeout ID
  const [isAutoCloseEnabled, setIsAutoCloseEnabled] = useState<boolean>(true); // State to control auto-close

  const handleIconClick = (name: string) => {
    // Set selected skill
    setSelectedSkill(selectedSkill === name ? null : name);

    // Clear existing timeouts if any
    if (closeTimeout) {
      clearTimeout(closeTimeout);
    }

    // Set a new timeout to close the modal after 5 seconds if auto-close is enabled
    if (isAutoCloseEnabled && selectedSkill !== name) {
      const newTimeout = window.setTimeout(closeModal, 5000);
      setCloseTimeout(newTimeout);
    }
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedSkill(null);
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  // Function to toggle auto-close feature
  const toggleAutoClose = () => {
    setIsAutoCloseEnabled(!isAutoCloseEnabled);
  };

  const selectedSkillData = skillsData.find(
    (skill) => skill.name === selectedSkill
  );

  return (
    <div className="h-full w-3/4 mx-auto skills-container text-white px-10 py-24 transition-all duration-500 relative">
      <motion.h2
        className="text-3xl font-bold mb-16 text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        Our Skills
      </motion.h2>
      <motion.div
        className="skills-grid grid grid-cols-3 md:grid-cols-5 gap-6 transition-all duration-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.075,
            },
          },
        }}
      >
        {skillsData.map((skill) => (
          <motion.div
            key={skill.name}
            className="skill-icon flex flex-col items-center cursor-pointer relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            onClick={() => handleIconClick(skill.name)}
          >
            <motion.img
              src={skill.img}
              alt={skill.name}
              className="h-20 w-20 object-contain transition-all duration-300"
              whileHover={{ rotate: 5 }}
            />
            <p className="mt-2 text-center font-semibold">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Skill Information Modal */}
      <AnimatePresence>
        {selectedSkillData && (
          <motion.div
            key={selectedSkillData.name}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="skill-modal fixed top-[5vh] right-0 z-30 w-[350px] max-w-full h-[90vh] flex items-center justify-center p-6 text-white border-l-[6px] border-y-[1px] border-green-700 rounded-l-lg shadow-lg overflow-y-auto bg-neutral-800"
            style={{ transform: "translateY(-50%)" }}
          >
            <div className="relative w-full">
              <button
                className="absolute -top-10 -left-1 text-3xl text-gray-400 hover:text-white"
                onClick={closeModal}
              >
                &times;
              </button>
              <h3 className="text-xl font-semibold mb-4">
                {selectedSkillData.name}
              </h3>
              <p className="mb-4">{selectedSkillData.description}</p>
              <a
                href={selectedSkillData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 underline hover:text-green-600"
              >
                Learn More
              </a>
              <button
                onClick={toggleAutoClose}
                className="block mt-4 text-sm text-green-400 underline hover:text-green-600"
              >
                {isAutoCloseEnabled
                  ? "Disable Auto Close"
                  : "Enable Auto Close"}
              </button>
              <p className="text-xs opacity-70">Applies to next open</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Skills;
