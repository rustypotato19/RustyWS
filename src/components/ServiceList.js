import React, { useState, useEffect, useRef } from "react";

const services = [
  {
    title: "Large/Small Web Development",
    desc: "Our Specialty: Developing websites. From simple, individual sites to complex business hubs.",
    description: "We create custom websites that suit your needs, whether it's a simple personal site or a large-scale business website. We ensure your website looks professional, works smoothly, and provides the best experience for your visitors 24/7.",
  },
  {
    title: "Application Plugin Development",
    desc: "Enhance your software with plugins. Adding new features to existing software.",
    description: "We develop plugins to enhance your existing software, making it more useful for your specific needs. Plugins can add new features or improve current ones, making sure your software does exactly what you need it to do.",
  },
  {
    title: "Large/Small Independent Project",
    desc: "From calculators to web-games, your ideas realised into a functional project.",
    description: "Whether you have a small idea or a big vision, we help bring it to life. We take your concept and turn it into a functional project, offering guidance and support throughout, to make sure it works just the way you imagined.",
  },
];

const ServiceList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const intervalRef = useRef(null);
  const throttleRef = useRef(false);

  // Function to start the automatic rotation
  const startAutoRotate = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    }, 4000);
  };

  // Function to stop the automatic rotation
  const stopAutoRotate = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Automatically rotate every 4 seconds when the component mounts
  useEffect(() => {
    startAutoRotate();
    return () => stopAutoRotate(); // Clear interval on unmount
  }, []);

  // Function to go to the previous item with throttling
  const goToPrevious = () => {
    if (throttleRef.current) return; // If throttling is in effect, ignore the click
    throttleRef.current = true; // Set throttling to true to prevent further clicks
    stopAutoRotate(); // Stop auto-rotation
    setCurrentIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
    // Allow next click after 1 second
    setTimeout(() => {
      throttleRef.current = false;
    }, 1000);
  };

  // Function to go to the next item with throttling
  const goToNext = () => {
    if (throttleRef.current) return; // If throttling is in effect, ignore the click
    throttleRef.current = true; // Set throttling to true to prevent further clicks
    stopAutoRotate(); // Stop auto-rotation
    setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
    // Allow next click after 1 second
    setTimeout(() => {
      throttleRef.current = false;
    }, 1000);
  };

  // Function to handle opening the modal
  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    stopAutoRotate(); // Stop auto-rotation when modal is open
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedService(null);
      startAutoRotate(); // Restart auto-rotation when modal is closed
    }, 500); // Allow exit animation to complete before removing the modal
  };

  return (
    <section className="cursor-default py-4 lg:py-10">
      <div className="container mx-auto text-center">
        <h2
          className="mx-auto text-2xl lg:text-3xl text-rws-smoke bg-rws-dark-blue rounded-full font-bold py-2 w-[90dvw] lg:w-[70dvw]"
          style={{
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
          }}
        >
          Our Services
        </h2>

        {/* Service Items Carousel */}
        <div className="relative flex items-center justify-center overflow-hidden h-[40dvh] lg:h-[32dvh] lg:mb-6 lg:mt-12">
          {services.map((service, index) => {
            // Calculate the offset relative to currentIndex
            const offset = (index - currentIndex + services.length) % services.length;

            // Styles for different items
            let itemClasses =
              "bg-rws-smoke absolute p-6 mt-6 rounded-2xl shadow-md transition-all duration-1000 ease-in-out transform w-[65dvw] lg:w-[23dvw] h-fit lg:h-[21dvh]";
            let transformStyle = "";

            if (offset === 0) {
              // Previous item - to the left
              transformStyle = "scale-90 opacity-0 lg:opacity-100 bg-gray-300 -translate-x-[80dvw] lg:-translate-x-[22dvw] blur-[4px] -z-20";
            } else if (offset === 1) {
              // Focused item - in the middle
              transformStyle = "scale-125 opacity-100 translate-x-0 hover:scale-[135%] hover:cursor-pointer hover:bg-rws-smoke z-20";
            } else if (offset === 2) {
              // Next item - to the right
              transformStyle = "scale-90 opacity-0 lg:opacity-100 bg-gray-300 translate-x-[80dvw] lg:translate-x-[22dvw] blur-[4px] -z-30";
            } else {
              // Any other item not visible
              transformStyle = "scale-75 opacity-0";
            }

            return (
              <div
                key={index}
                className={`${itemClasses} ${transformStyle}`}
                style={{
                  visibility: offset <= 2 ? "visible" : "hidden",
                }}
                onMouseEnter={() => {
                  stopAutoRotate(); // Stop rotation on hover
                }}
                onMouseLeave={() => {
                  isModalOpen ? stopAutoRotate() : startAutoRotate();
                }}
                onClick={() => openModal(service)}
              >
                <div className="h-full w-full flex flex-col justify-evenly items-center">
                  <h3 className="text-md lg:text-2xl text-rws-dark-blue w-full font-semibold mb-4">{service.title}</h3>
                  <p className="text-rws-gray text-sm lg:text-lg">{service.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dots Indicator */}
        <div className="flex flex-row justify-center items-center mt-3">
          <p
            onClick={goToPrevious}
            className="text-4xl font-bold text-rws-gray opacity-60 cursor-pointer hover:text-rws-dark-blue relative right-2 bottom-[7px]"
          >
            &lt;
          </p>
          <div className="flex justify-center space-x-2">
            {services.map((_, index) => (
              <span
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 mb-4 ${
                  index === currentIndex ? "bg-rws-dark-blue opacity-80" : "bg-rws-gray opacity-35"
                }`}
              ></span>
            ))}
          </div>
          <p
            onClick={goToNext}
            className="text-4xl font-bold text-rws-gray opacity-60 cursor-pointer hover:text-rws-dark-blue relative left-2 bottom-[7px]"
          >
            &gt;
          </p>
        </div>

        {/* Modal for Detailed Description */}
        <div
          className={`fixed inset-0 flex items-center justify-center transition-all duration-1000 ease-in-out rounded-full ${
            isModalOpen ? "scale-100 bg-opacity-30 inset-[-50rem]" : "scale-0 bg-opacity-0 inset-[50rem]"
          } bg-black z-50`}
        >
          {selectedService && (
            <div className="flex justify-between flex-col items-center bg-rws-smoke p-8 rounded-2xl shadow-lg w-[90dvw] lg:w-[50vw] h-[70dvh] lg:h-[25dvh] relative ">
              <h3 className="text-3xl font-bold text-rws-dark-blue mb-4">{selectedService.title}</h3>
              <p className="text-rws-gray text-lg mb-6">{selectedService.description}</p>
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-600 text-2xl cursor-pointer hover:text-rws-gray"
              >
                &times; {/* Close button styled as "X" */}
              </button>
            </div>
          )}
        </div>
      </div>
      
    </section>
  );
};

export default ServiceList;
