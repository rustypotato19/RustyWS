import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div
      id="about"
      className="min-h-[50vh] w-screen text-white flex justify-center items-center my-12"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="max-w-[80vw] sm:max-w-[60vw] mx-auto text-center flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="text-lg mb-4">
          We are a software development company with a passion for creating
          modern, responsive, and high-performance applications, interfaces, and
          websites.
        </p>
        <p className="text-lg mb-4">
          As an emerging company, Rusty's Web Services is dedicated to making
          a difference in the digital space. We understand the challenges that
          businesses face in an ever-evolving online world, and we are here to
          help bridge the gap between ideas and a successful online presence.
        </p>
        <p className="text-lg mb-4">
          Our team is small but highly motivated, driven by a commitment to
          quality and excellence in every project we undertake. We believe that
          our clients are at the heart of everything we do, and we go the extra
          mile to ensure complete customer satisfaction. Your success is our
          success, and we are here to listen, adapt, and deliver exactly what
          you need.
        </p>
        <p className="text-lg mb-4">
          At Rusty's Web Services, we are not just building software solutions;
          we are building relationships. We believe in open communication,
          transparency, and a partnership approach where we work alongside you
          every step of the way. Our goal is to create a positive and
          personalised experience that leaves you completely satisfied.
        </p>
        <p className="text-lg">
          Whether you are a start-up looking for a new website, a business
          wanting to optimise your digital presence, or someone with an idea
          that needs to come to life, we are here to help. Let us work together
          to turn your vision into reality.
        </p>
      </div>
    </div>
  );
};

const OurMission: React.FC = () => {
  return (
    <div
      className="min-h-[50vh] w-screen text-white flex justify-center items-center"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="max-w-[80vw] sm:max-w-[60vw] mx-auto text-center flex flex-col justify-center items-center">
        <h3 className="text-3xl font-semibold mb-6">Our Mission</h3>
        <p className="text-lg mb-6">
          Our mission is to deliver the best solutions possible by putting your
          requirements first, ensuring full satisfaction. We are passionate
          about helping both individuals and businesses succeed online, offering
          fully customisable solutions to make your ideas stand out.
        </p>
        <p className="text-lg mb-6">
          We strive to create digital experiences that not only meet your
          business needs but also inspire and engage your target audience. By
          combining cutting-edge technology with our dedication to customer
          care, we ensure that our services are tailor-made to drive results and
          maximise your success.
        </p>
        <p className="text-lg mb-6">
          Our goal is to empower businesses and individuals by giving them the
          tools and solutions they need to thrive in the digital world. We
          believe in innovation, collaboration, and a deep understanding of our
          clients' goals, enabling us to deliver products that are both
          functional and transformative.
        </p>
      </div>
    </div>
  );
};

export { AboutUs, OurMission };
