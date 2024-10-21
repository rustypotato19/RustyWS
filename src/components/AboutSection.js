import React from "react";

const AboutSection = () => {
  return (
    <section className="mx-auto bg-rws-dark-blue text-[#ebebeb] w-[70dvw] py-12 mb-20 text-center rounded-[175px] flex justify-center items-center">
      <div className="flex items-center justify-center flex-col w-full">
        <h2 className="text-3xl font-bold mb-3">About Us</h2>
        <p className="text-xl max-w-2xl mx-auto">
          We are a software development company with a passion for creating modern, responsive, and high-performance applications, interfaces and websites.
        </p>
        <div className="separator w-2/3 border-2 mx-auto rounded-lg border-rws-light-blue opacity-35 my-4"></div>
        <h2 className="text-3xl font-bold mb-3">Our Mission</h2>
        <p className="text-xl max-w-2xl mx-auto">
          We want to give you the best we can, so we always put your requirements first to ensure your full satisfaction.<br/>
          We are passionate about helping both individuals and businesses to succeed online - offering fully customisable solutions to make your ideas stand out.
        </p>
        <div className="separator w-2/3 border-2 mx-auto rounded-lg border-rws-light-blue opacity-35 my-4"></div>
        
        {/* Parent container and grid */}
        <div className="w-full mx-auto flex items-center justify-center">
          <div className="socials grid grid-cols-2 md:grid-cols-1 gap-x-10 justify-items-center justify-center items-center">
            <a href="https://linkedin.com/company/rustys-web-services" className="tag" target="_blank" rel="noreferrer" >
              <img 
              className="w-12 hover:scale-125 transition-all duration-700 mx-2 opacity-65"
              src="/images/logos/linkedin.svg" 
              alt="linkedin icon" 
              target="_blank"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};


export default AboutSection;
