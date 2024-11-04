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

  const handleIconClick = (name: string) => {
    setSelectedSkill(selectedSkill === name ? null : name);
  };

  return (
    <div className="h-full w-3/4 mx-auto skills-container text-white px-10 py-24">
      <motion.h2
        className="text-3xl font-bold mb-16 text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        Our Skills
      </motion.h2>
      <motion.div
        className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1, // Control how fast the items slide in after each other
            },
          },
        }}
      >
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skill-icon flex flex-col items-center cursor-pointer"
            whileHover={{ scale: 1.1 }} // Slight scale-up when hovering over the icon
            transition={{ type: "spring", stiffness: 300, damping: 20 }} // Smooth transition on hover
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }} // Animation for each individual skill icon
          >
            <motion.img
              src={skill.img}
              alt={skill.name}
              className="h-20 w-20 object-contain transition-all duration-300"
              onClick={() => handleIconClick(skill.name)}
              whileHover={{ rotate: 5 }} // Add a little rotation effect on hover for fun
            />
            <p className="mt-2 text-center font-semibold">{skill.name}</p>
            <AnimatePresence>
              {selectedSkill === skill.name && (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }} // Smooth entrance/exit animations for the details
                  className="skill-description mt-4 p-4 border-t border-green-700 bg-neutral-800 rounded-lg text-sm"
                >
                  <p className="mb-2">{skill.description}</p>
                  <a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-400 underline hover:text-green-600"
                  >
                    Learn More
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    <p id="request" className="transparent absolute" />
    </div>
  );
};

export default Skills;
