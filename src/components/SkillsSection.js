import React, { useState } from "react";

const skills = [
  {
    name: "HTML5",
    imgSrc: "/images/logos/html.svg",
    description: "HTML5 is the latest evolution of the standard that defines HTML (HyperText Markup Language). It introduces new features that allow developers to create more engaging and interactive web pages, such as multimedia support for audio and video without plugins, and new elements like <article>, <section>, and <canvas> to structure content more semantically and efficiently. HTML5 is foundational for the structure of the web, ensuring content is properly formatted and accessible across platforms and devices.",
    infoLink: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5",
  },
  {
    name: "CSS3",
    imgSrc: "/images/logos/css.svg",
    description: "CSS3 (Cascading Style Sheets) is the latest version of the CSS standard, which is used for describing the look and formatting of a document written in HTML. CSS3 adds significant features, such as animations, flexbox, grid layouts, transitions, and media queries, enabling developers to create responsive designs that adjust based on screen sizes. With CSS3, developers can build sophisticated user interfaces, control typography, implement complex layouts, and create visually appealing web experiences.",
    infoLink: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "TailwindCSS",
    imgSrc: "/images/logos/twcss.svg",
    description: "TailwindCSS is a highly customizable, utility-first CSS framework that allows developers to build modern, responsive interfaces without leaving the HTML. Instead of writing custom CSS, Tailwind offers pre-built utility classes that handle common design patterns like spacing, typography, and layout, allowing rapid development. It promotes a mobile-first approach and is fully responsive, with features like Flexbox, Grid, and CSS transitions built-in, streamlining the design process and improving productivity.",
    infoLink: "https://tailwindcss.com/docs",
  },
  {
    name: "JavaScript",
    imgSrc: "/images/logos/js.svg",
    description: "JavaScript is a high-level, versatile programming language primarily used to enhance user experiences by enabling interactive web pages. It plays a crucial role in front-end development alongside HTML and CSS, offering dynamic content updates, form validation, animations, and handling user inputs. JavaScript is supported by all modern browsers and is integral to frameworks and libraries such as React, Angular, and Vue.js. Its flexibility also extends to back-end development with environments like Node.js, making it a full-stack development language.",
    infoLink: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "PHP",
    imgSrc: "/images/logos/php.png",
    description: "PHP (Hypertext Preprocessor) is a server-side scripting language designed for web development but also used as a general-purpose programming language. PHP is most commonly used to create dynamic content that interacts with databases, enabling features such as user authentication, form processing, and content management systems (CMS) like WordPress. PHP is fast, flexible, and powers many popular websites across the web. It works seamlessly with databases like MySQL and supports frameworks like Laravel to accelerate development.",
    infoLink: "https://www.php.net/docs.php",
  },
  {
    name: "Python",
    imgSrc: "/images/logos/py.png",
    description: "Python is a versatile, high-level programming language that is renowned for its simplicity, readability, and wide-ranging use cases. It's widely used in web development, data analysis, artificial intelligence, machine learning, automation, and scientific computing. Frameworks such as Django and Flask allow Python to be a powerful back-end solution for web development, while its rich ecosystem of libraries supports everything from data visualization to web scraping. Python's ease of use makes it an excellent choice for beginners and professionals alike.",
    infoLink: "https://docs.python.org/3/",
  },
  {
    name: "Java",
    imgSrc: "/images/logos/java.png",
    description: "Java is a class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible, making it a popular choice for developing cross-platform applications. Known for its 'write once, run anywhere' philosophy, Java is extensively used in enterprise-level applications, Android app development, and large-scale systems. With frameworks such as Spring and Hibernate, Java is highly scalable and can power everything from web apps to financial systems, often relied upon for its robust performance and security.",
    infoLink: "https://docs.oracle.com/javase/tutorial/",
  },
  {
    name: "SQL",
    imgSrc: "/images/logos/sql.png",
    description: "SQL (Structured Query Language) is the standard language for interacting with relational databases. It is used to query, update, and manage data stored in databases such as MySQL, PostgreSQL, Oracle, and Microsoft SQL Server. SQL allows developers to perform various tasks, such as retrieving data, inserting records, updating data, and managing database permissions. SQL is foundational to data management and analytics in modern applications, serving as the backbone for storing and retrieving structured data efficiently.",
    infoLink: "https://www.w3schools.com/sql/",
  },
  {
    name: "Git",
    imgSrc: "/images/logos/git.svg",
    description: "Git is a distributed version control system that enables multiple developers to collaborate on projects efficiently. It tracks changes to source code, allows for branching and merging, and helps developers maintain different versions of their codebase. Git is essential for modern software development, supporting workflows such as Git Flow and GitHub Flow. With platforms like GitHub, GitLab, and Bitbucket, Git enables code review, continuous integration, and deployment pipelines, ensuring smooth collaboration and maintaining project history.",
    infoLink: "https://git-scm.com/doc",
  },
  {
    name: "Linux",
    imgSrc: "/images/logos/linux.png",
    description: "Linux is an open-source operating system based on the Unix architecture. Known for its stability, security, and flexibility, Linux powers everything from personal computers to enterprise servers and supercomputers. It’s the platform of choice for many developers and system administrators due to its open-source nature and extensive software ecosystem. Linux is widely used for hosting websites, managing networks, and developing software, with distributions such as Ubuntu, CentOS, and Debian being popular choices.",
    infoLink: "https://www.linux.org/",
  },
  {
    name: "Windows",
    imgSrc: "/images/logos/win.png",
    description: "Windows is a widely used operating system developed by Microsoft, known for its graphical user interface (GUI) and ease of use. It is the dominant platform for personal computers and is also used in enterprise environments. Windows provides an extensive range of features for both home users and professionals, including productivity software, development tools, and enterprise solutions. For developers, it offers tools like Visual Studio, supports a wide range of languages, and provides an extensive ecosystem for building desktop and web applications.",
    infoLink: "https://docs.microsoft.com/en-us/windows/",
  },
  {
    name: "ReactJS",
    imgSrc: "/images/logos/react.png",
    description: "ReactJS is a popular JavaScript library used for building dynamic, single-page user interfaces, primarily for web applications. Developed by Facebook, it promotes the creation of reusable UI components and uses a virtual DOM for efficient rendering, which boosts performance in large applications. React’s component-based architecture enables developers to build complex UIs from isolated building blocks, simplifying state management and making web applications more maintainable. It integrates well with other libraries and frameworks, making it a versatile choice for front-end development.",
    infoLink: "https://reactjs.org/docs/getting-started.html",
  },
  {
    name: "C++",
    imgSrc: "/images/logos/cpp.png",
    description: "C++ is a high-performance, general-purpose programming language that builds on the foundation of C, with object-oriented, procedural, and generic programming features. It is widely used for system/software development, game development, real-time simulations, and high-performance applications like operating systems, browsers, and complex computational tasks. C++ allows fine-grained control over system resources and memory management, making it ideal for applications that require high efficiency and speed. It supports low-level programming alongside high-level abstractions, offering flexibility and power in software development.",
    infoLink: "https://cplusplus.com/doc/tutorial/",
  },
  {
    name: "C#",
    imgSrc: "/images/logos/csharp.png",
    description: "C# (C-Sharp) is a modern, object-oriented programming language developed by Microsoft as part of the .NET platform. Known for its simplicity and versatility, C# is widely used for developing a variety of applications, including desktop software, web applications, games, and mobile apps (via Xamarin). C# features strong type checking, automatic garbage collection, and support for asynchronous programming. It is a preferred language for building Windows applications, as well as enterprise-level solutions with ASP.NET for scalable web development.",
    infoLink: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  }
];



const SkillsSection = () => {
  const [focusedSkill, setFocusedSkill] = useState(null); // Track which skill is focused

  // Handler for selecting a skill by index
  const handleSkillClick = (index) => {
    setFocusedSkill(focusedSkill === index ? null : index); // Toggle focus
  };

  // Handler to go to the previous skill
  const handlePrevSkill = () => {
    setFocusedSkill((prev) => (prev === 0 ? skills.length - 1 : prev - 1)); // Loop back to the last skill if on the first
  };

  // Handler to go to the next skill
  const handleNextSkill = () => {
    setFocusedSkill((prev) => (prev === skills.length - 1 ? 0 : prev + 1)); // Loop back to the first skill if on the last
  };

  return (
    <section className="mx-auto skills p-12 flex justify-center items-center w-[70dvw] mb-6">
        <div className="w-full text-center flex flex-col justify-center items-center">
          <h2 className="w-[70dvw] text-3xl text-rws-smoke font-bold bg-rws-dark-blue rounded-full py-2 mb-12"
            style={{
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)"
            }}
          >
            Our Skills
          </h2>
          <ul className={`flex items-center gap-8 justify-center flex-row max-w-full flex-wrap mt-8 mb-4 ${focusedSkill !== null ? 'blur-sm' : ''}`}>
            {skills.map((skill, index) => (
              <li
                key={index}
                onClick={() => handleSkillClick(index)}
                className="flex items-center justify-center p-2 bg-[#f4f4f4] rounded-lg shadow-md transform transition-all duration-500 cursor-pointer hover:scale-105 hover:shadow-xl hover:shadow-rws-dark-blue md:p-4"
              >
                <img src={skill.imgSrc} alt={skill.name} className="w-8 md:w-16" />
              </li>
            ))}
          </ul>
        </div>

      {/* Floating modal for the focused skill */}
      {focusedSkill !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <div className="h-[46dvh] bg-[#ebebeb] w-[50dvw] p-6 rounded-3xl shadow-lg transform transition-transform duration-500 text-center mx-4 overflow-auto">
            <div className="flex flex-col justify-center items-center">
              <div className="flex flex-row justify-center items-center mb-4">
                <img src={skills[focusedSkill].imgSrc} alt={skills[focusedSkill].name} className="w-14 mr-2" />
                <h3 className="text-3xl font-semibold">{skills[focusedSkill].name}</h3>
              </div>
              <p className="text-rws-gray text-lg overflow-y-auto h-[25dvh] w-[90%] border border-gray-400 p-2 rounded-lg">{skills[focusedSkill].description}</p>
            </div>
            <div 
              className="absolute top-4 right-6 text-xl"
            >
              <p 
                onClick={() => setFocusedSkill(null)}
                className="px-2 cursor-pointer hover:bg-rws-dark-blue hover:text-white rounded-full transition-all duration-200"
              >
                &times;
              </p>
            </div>
            <div className="flex flex-row items-center justify-evenly h-[5dvh] mt-6">
              <a
                href={skills[focusedSkill].infoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 px-4 py-2 bg-rws-dark-blue text-white rounded hover:bg-rws-dark-blue-hover transition-all duration-200 "
              >
                Learn More
              </a>
            </div>
            {/* Previous and Next Arrows */}
            <button onClick={handlePrevSkill} className="text-gray-500 absolute bottom-1/2 translate-y-1/2 left-6 text-2xl px-2 cursor-pointer hover:bg-rws-dark-blue hover:text-white rounded-full transition-all duration-200">
              &lt;
            </button>
            <button onClick={handleNextSkill} className="text-gray-500 absolute bottom-1/2 translate-y-1/2 right-6 text-2xl px-2 cursor-pointer hover:bg-rws-dark-blue hover:text-white rounded-full transition-all duration-200">
              &gt;
            </button>
          </div>
        </div>
      )}
      <div id="about" className="text-transparent absolute left-0">
        <p>Invisible About Us Tag</p>
      </div>
    </section>
  );
};

export default SkillsSection;