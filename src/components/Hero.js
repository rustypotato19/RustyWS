import React, { useState } from "react";
import FormModal from "./FormModal"; // Import the modal component

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="mx-auto flex justify-evenly bg-[#ebebeb] items-center px-40 w-[70vw] rounded-[190px] text-rws-dark-blue text-center h-[58dvh] mt-16 mb-16">
      <div className="flex flex-col justify-around items-center w-2/3 h-full mr-10 text-left">
        <h2 className="text-3xl font-extrabold mt-20 text-center">
          ~ Rusty's Web Services ~ <br/>
          Your Partner in All Developments
        </h2>
        <div className="flex flex-col justify-center items-center mb-20 w-[85%]">
          <p className="text-lg font-semibold w-full">
            {/* . A software development company with a passion for creating modern, responsive, and high-performance applications, interfaces and websites. Always placing your requirements first to ensure your full satisfaction. <br /><br />Let's work together to make your vision a reality! */}
            Already know what you need? Request a service now!
          </p>
          <button
            onClick={openModal} // Open the modal on click
            className="text-rws-smoke mx-auto my-10 py-6 px-12 text-xl w-fit rounded-2xl bg-rws-dark-blue transition-all duration-200 hover:scale-105 hover:shadow-slate-400 hover:shadow-md font-semibold"
          >
            Request Service
          </button>
          <p className="text-lg font-semibold w-full text-center">
            Unsure what service is best suited for your needs? <br/>
            Read about what we have to offer in more detail below. <br/>
          </p>
        </div>
      </div>

      <div className="w-[0.18rem] bg-rws-dark-blue h-[85%] mr-12 relative right-10">
        {/* Vertical Divider */}
      </div>

      <div className="flex justify-center items-center h-full w-1/3 relative right-10">
            <div className="h-full w-full flex flex-col justify-center items-center">
                <div className="flex flex-col p-4 rounded-lg text-center my-16">
                    <h3 className="text-xl font-bold">Already Made a Request?</h3>
                    <div className="flex items-center justify-center mt-0">
                        <a
                            href="/view-ticket"
                            rel="noopener noreferrer"
                            className="text-rws-smoke mx-auto py-3 px-3 w-fit rounded-2xl bg-rws-dark-blue transition-all duration-200 hover:scale-105 hover:shadow-slate-400 hover:shadow-md mt-4"
                        >Find Your Ticket</a>
                    </div>
                </div>
                <div className="w-full bg-rws-dark-blue h-[0.125rem]">
                  {/* Divider */}
                </div>
                <div className="flex flex-col p-4 rounded-lg text-center my-16">
                    <h3 className="text-xl font-bold">Need help or more information?</h3>
                    <a
                        href="mailto:
                        contact@rustyws.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-rws-smoke mx-auto py-3 px-3 w-fit rounded-2xl bg-rws-dark-blue transition-all duration-200 hover:scale-105 hover:shadow-slate-400 hover:shadow-md mt-4"
                    >Click to Email Us</a>
                </div>
            </div>
        </div>
        {/* Render the modal and pass the open/close state */}
        <FormModal isOpen={isModalOpen} onClose={closeModal} />
        <div id="services" className="text-transparent absolute left-0 top-2/3">
          <p>Invisible About Us Tag</p>
        </div>
    </section>
  );
};

export default Hero;
