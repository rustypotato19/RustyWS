import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // To handle redirection

const Header = () => {
  const [isAdmin, setIsAdmin] = useState(false); // New state to track admin status
  const [isScrolled, setIsScrolled] = useState(false); // State to track if user has scrolled
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
    navigate('/admin-dashboard');
  };

  return (
    <header className={`w-full ${isScrolled ? 'h-[8dvh]' : 'h-[12dvh]'} flex items-center justify-center transition-all duration-300`}>
      <div
        className={`flex flex-row justify-between items-center w-[80dvw] ${isScrolled ? 'h-[6dvh] py-1' : 'h-[10dvh] py-2'} bg-rws-dark-blue px-6 rounded-b-[30px] fixed top-0 z-50 transition-all duration-300`}
        style={{
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.4)",
        }}
      >
        <a href="/" className="flex flex-row justify-center items-center mb-2 ml-2">
          <img
            src="/images/logos/RWSLogoWhite.png"
            alt="Rusty's Web Services"
            className={`transition-all duration-300 ${isScrolled ? 'h-10 w-10' : 'h-16 w-16'}`}
          />
          <h1 className={`text-rws-smoke font-bold transition-all duration-300 ${isScrolled ? 'text-2xl' : 'text-4xl'} mt-1 ml-2`}>
            Rusty's Web Services
          </h1>
        </a>
        <nav className={`mr-4 transition-all duration-300 ${isScrolled ? 'text-md' : 'text-lg'}`}>
          <ul className="flex space-x-4">
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
        </nav>

        {/* Conditionally render the Admin button if admin is logged in */}
        {isAdmin && (
          <button
            className={`bg-rws-light-blue text-rws-smoke font-bold px-2 py-1 rounded-lg fixed top-4 right-4 transition-all duration-300 ${
              isScrolled ? 'text-sm py-1' : 'text-md py-2'
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
