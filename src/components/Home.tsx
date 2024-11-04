import React, { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasScrolled, setHasScrolled] = useState(false);
  const scrollHintRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 50 && !hasScrolled) {
      if (scrollHintRef.current) {
        gsap.to(scrollHintRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => setIsVisible(false),
        });
      }
      setHasScrolled(true);
    }
  }, [hasScrolled]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasScrolled, handleScroll]);

  useEffect(() => {
    if (scrollHintRef.current) {
      gsap.fromTo(
        scrollHintRef.current,
        { y: 0, opacity: 1 },
        {
          y: -8,
          opacity: 1,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "easeInOut",
        }
      );
    }
  }, []);

  return (
    <div id="home" className="min-h-screen text-white flex items-center justify-center">
      <div className="max-w-4xl text-center p-6" data-aos="zoom-in">
        <h1 className="text-5xl font-extrabold mb-4 text-green-700 animate-fade-in">
          Rusty's Web Services
        </h1>
        <p className="text-lg mb-6">
          Professional web solutions for your growing business or personal needs. Our services range from arithmetic claculators to professional web development, all tailored to meet your needs.
        </p>
      </div>

      {isVisible && (
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 text-center pointer-events-none"
        >
          <p className="text-2xl text-green-700 font-semibold">v v v</p>
        </div>
      )}
      <p id="about" className="transparent absolute bottom-44" />
    </div>
  );
};

export default Home;