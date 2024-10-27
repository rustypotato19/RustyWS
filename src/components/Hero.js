import React, { useState } from "react";
import FormModal from "./FormModal"; // Import the modal component

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSmallWidth = window.innerWidth < 1200; // State to track if the device width is small
  const isSmallHeight = window.innerHeight < 800; // State to track if the device height is small

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="mx-auto mb-6 lg:my-12 w-full h-[70dvh] lg:h-[60dvh] flex justify-center items-center text-rws-dark-blue">
      <div className="w-[90dvw] lg:w-[60dvw] h-full bg-rws-smoke flex flex-col lg:flex-row justify-center items-center rounded-[75px] lg:rounded-[175px]">
        <div className="w-3/4 lg:w-[60%] h-[95%] lg:h-[75%] flex flex-col items-center justify-center lg:ml-12 border-rws-dark-blue border-b-2 lg:border-b-0 lg:border-r-2">
          <h1 className="w-full h-full text-xl sm:text-2xl lg:text-3xl font-extrabold text-center mt-12 lg:mt-10">
            Rusty's Web Services
            <br />
            Your Partner in All Developments
          </h1>
          <br />
          <div className="w-full h-full flex flex-col justify-center gap-4 lg:gap-10 items-center mb-4 lg:mb-10 text-center">
            <p className="font-semibold text-md sm:text-lg lg:text-lg">
              Already know what you need? Request a service now!
            </p>
            <button
              className="text-rws-smoke text-md lg:text-xl px-2 lg:px-10 py-2 lg:py-5 rounded-2xl bg-rws-dark-blue transition-all duration-200 hover:scale-105 hover:shadow-slate-400 hover:shadow-md font-semibold"
              onClick={openModal}
            >
              Request Service
            </button>
            {isSmallWidth ? (
              isSmallHeight ? (
                <p className="font-semibold text-md lg:text-lg">
                  Not quite sure? <a href="#services" className="underline underline-offset-2 active:no-underline">Read More</a>
                </p>
              ) : (
                <p className="font-semibold text-md lg:text-lg">
                  Unsure what service is best suited for your needs? <br />
                  Read about what we have to offer in more detail below. <br />
                </p>
              )
            ) : (
              <p className="font-semibold text-md lg:text-lg">
                Unsure what service is best suited for your needs? <br />
                Read about what we have to offer in more detail below. <br />
              </p>
            )}

            <FormModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </div>
        <div className="w-full lg:w-[40%] h-1/3 lg:h-5/6 flex flex-row lg:flex-col items-center justify-center text-center mb-10 lg:mb-0 lg:mr-6">
          <div className="w-[60%] h-full flex flex-col gap-4 justify-center items-center">
            <h2 className="text-md lg:text-xl font-bold ">
              {isSmallWidth ? "Have a Ticket?" : "Already Made a Request?"}
            </h2>
            <div>
              <a
                href="/view-ticket"
                rel="noopener noreferrer"
                className="text-rws-smoke mx-auto py-1 px-2 lg:py-3 lg:px-3 rounded-lg sm:rounded-2xl bg-rws-dark-blue transition-all duration-200 hover:scale-105 hover:shadow-slate-400 hover:shadow-md"
              >
                Find Your Ticket
              </a>
            </div>
          </div>
          {isSmallWidth ? (
            <div className="hidden">.</div>
          ) : (
            <div className="w-2/3 h-0 text-transparent lg:border-y-[1px] border-rws-dark-blue">
              .
            </div>
          )}

          <div className="w-[45%] h-full flex flex-col gap-4 justify-center items-center">
            <h2 className="text-md lg:text-xl font-bold">
              {isSmallWidth ? (
                "Need Help?"
              ) : (
                <p>
                  Need help or more <br />
                  information?
                </p>
              )}
            </h2>
            <div>
              <a
                href="mailto:contact@rustyws.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rws-smoke mx-auto py-1 px-2 lg:py-3 lg:px-3 rounded-lg sm:rounded-2xl bg-rws-dark-blue transition-all duration-200 hover:scale-105 hover:shadow-slate-400 hover:shadow-md"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
