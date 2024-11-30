import React, { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";

const Header: React.FC = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Media query to determine if the screen is small
  const isSmallDevice = window.innerWidth < window.innerHeight;

  const links = [
    "Home",
    "About",
    "Services",
    "Request",
    "Tickets",
    "Contact",
    "Reviews",
    "Products",
  ];

  // Effect to handle clicking outside of the dropdown or scrolling
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleScroll = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
    } else {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdownOpen]);

  return (
    <header className="w-screen h-fit mx-auto flex justify-center items-center">
      <div className="text-neutral-900 bg-black bg-opacity-75 fixed top-4 left-1/2 transform -translate-x-1/2 flex flex-row justify-center items-center gap-2 sm:gap-6 backdrop-blur-md px-3 py-2 sm:px-6 sm:py-4 z-50 border-green-700 border-[2px] rounded-full transition-all duration-300 ease-in-out">
        {isSmallDevice ? (
          // Render dropdown for small devices
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 border-transparent text-green-700 focus:outline-none hover:text-green-700 transition-all duration-300 ease-in-out"
            >
              <FaBars size={24} />
              Menu
            </button>
            <div
              className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-max border-2 border-green-700 bg-neutral-900 text-white rounded-md shadow-lg transition-all duration-500 ease-in-out overflow-hidden ${
                dropdownOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{
                transition:
                  "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
              }}
            >
              <div className="grid grid-cols-3 grid-rows-2 text-center transition-all duration-500 ease-in-out">
                {links.map((link) => (
                  <a
                    key={link}
                    href={`${
                      link === "Products" || link === "Tickets" || link === "Reviews"
                        ? link === "Tickets"
                          ? "#tickets"
                          : "/" + link.toLocaleLowerCase()
                        : "/#" + link.toLowerCase()
                    }`}
                    className="block px-4 py-2 hover:bg-green-700 transition-all duration-300 ease-in-out"
                    onClick={() => setDropdownOpen(false)}
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Render original links for larger devices
          links.map((link) => (
            <a
              key={link}
              href={`${
                link === "Products" || link === "My-Ticket"
                  ? link === "My-Ticket"
                    ? "#view-ticket"
                    : "/" + link.toLocaleLowerCase()
                  : "/#" + link.toLowerCase()
              }`}
              onMouseEnter={() => setHoveredLink(link)}
              onMouseLeave={() => setHoveredLink(null)}
              className={`transition-all duration-300 ease-in-out sm:px-4 border-x-[1px] sm:border-x-2 rounded-lg ${
                hoveredLink === link
                  ? "text-green-700 border-green-700"
                  : "text-green-700 border-transparent"
              } hover:text-green-800 hover:border-green-700`}
            >
              {link}
            </a>
          ))
        )}
      </div>
    </header>
  );
};

export default Header;
