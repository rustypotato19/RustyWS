import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To handle redirection

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false); // New state to track admin status
  const [isScrolled, setIsScrolled] = useState(false); // State to track if user has scrolled
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track dropdown menu visibility
  const [isSmallDevice] = useState(window.innerWidth < 1200); // State to track if the device is small
  const navigate = useNavigate(); // To navigate to admin login page

  // Check if the admin is logged in by checking the token in localStorage
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming you store token under 'token'
    if (token) {
      setIsAdmin(true); // If token exists, assume the user is admin
    }
  }, []); // Empty dependency array to run this once on mount

  // Add a scroll event listener to change the header on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // User has scrolled down more than 50px
      } else {
        setIsScrolled(false); // User is at the top of the page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleAdminClick = () => {
    // Redirect to the admin login page
    navigate("/admin-dashboard");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`mx-auto w-[100dvw] ${
        isScrolled ? "h-[10dvh] sm:h-[8dvh]" : "h-[16dvh] sm:h-[12dvh]"
      } flex items-center justify-center transition-all duration-300`}
    >
      <div
        className={`flex flex-row justify-between items-center w-full sm:w-[80dvw] ${
          isScrolled ? "h-[6dvh] py-1" : "h-[10dvh] py-2"
        } bg-rws-dark-blue px-6 rounded-b-[30px] fixed top-0 z-50 transition-all duration-300`}
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
        }}
      >
        <a
          href="/"
          className="flex flex-row justify-center items-center mb-2 ml-2"
        >
          <img
            src="/images/logos/RWSLogoWhite.png"
            alt="Rusty's Web Services"
            className={`transition-all duration-300 ${
              isScrolled ? "h-0 xl:h-10 w-0 xl:w-10" : "h-0 xl:h-16 w-0 xl:w-16"
            }`}
          />
          <h1
            className={`text-rws-smoke font-bold transition-all duration-300 ${
              isScrolled
                ? "text-md sm:text-lg md-text-xl lg:text-2xl"
                : "text-lg sm:text-xl md:text-2xl xl:text-4xl"
            } mt-1 sm:ml-2`}
          >
            Rusty's Web Services
          </h1>
        </a>
        <nav className="mr-4 transition-all duration-300">
          <button
            className="sm:hidden text-rws-smoke focus:outline-none transition-all duration-1000 z-50"
            onClick={toggleMenu}
          >
            {isMenuOpen ? "Close" : "Menu"}
          </button>
          <ul
            className={`hidden sm:flex space-x-4 ${
              isScrolled ? "text-md" : "text-lg"
            }`}
          >
            <li>
              <a
                href="/#about"
                className="text-rws-smoke border-x-2 border-transparent px-2 hover:border-rws-back-blue hover:text-rws-back-blue"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/#services"
                className="text-rws-smoke border-x-2 border-transparent px-2 hover:border-rws-back-blue hover:text-rws-back-blue"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/#contact"
                className="text-rws-smoke border-x-2 border-transparent px-2 hover:border-rws-back-blue hover:text-rws-back-blue"
              >
                Contact
              </a>
            </li>
          </ul>
          {isSmallDevice && (
            <ul
              className={`${
                isMenuOpen
                  ? isScrolled
                    ? "-translate-y-[4dvh]"
                    : "translate-y-0"
                  : "-translate-y-[175%]"
              } transition-all duration-500 sm:hidden absolute top-[9.5dvh] right-4 bg-opacity-80 text-center bg-rws-dark-blue rounded-b-lg shadow-lg p-4 space-y-2 -z-50`}
              style={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
              }}
            >
              <li>
                <a
                  href="/#about"
                  className="block text-rws-smoke border-b-2 border-transparent pb-2 hover:border-rws-back-blue hover:text-rws-back-blue"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/#services"
                  className="block text-rws-smoke border-b-2 border-transparent pb-2 hover:border-rws-back-blue hover:text-rws-back-blue"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="/#contact"
                  className="block text-rws-smoke border-b-2 border-transparent pb-2 hover:border-rws-back-blue hover:text-rws-back-blue"
                >
                  Contact
                </a>
              </li>
            </ul>
          )}
        </nav>

        {/* Conditionally render the Admin button if admin is logged in */}
        {isAdmin && (
          <button
            className={`bg-rws-light-blue text-rws-smoke font-bold px-2 py-1 rounded-lg fixed top-4 right-4 transition-all duration-300 ${
              isScrolled ? "text-sm py-1" : "text-md py-2"
            }`}
            onClick={handleAdminClick}
          >
            Admin
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
