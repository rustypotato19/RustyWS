import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperInstance } from "swiper/types";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Updated Import
import "swiper/css";
import "swiper/css/pagination";
import "./Services.css";

const Services: React.FC = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  ); // Swiper instance for autoplay control
  const [hasInteracted, setHasInteracted] = useState(false); // Track if user has interacted

  const isSmall = window.innerWidth < 750;

  const services = [
    {
      title: "Custom Website Development",
      shortDescription: "Modern, responsive websites tailored to your needs.",
      detailedDescription:
        "Our custom website development service provides tailored solutions that meet your business needs. We use the latest technologies to create modern, responsive, and feature-rich websites that leave a lasting impression.",
    },
    {
      title: "Responsive Design Optimisation",
      shortDescription: "Ensuring your site works flawlessly on all devices.",
      detailedDescription:
        "With responsive design optimisation, we make sure that your website looks great and performs flawlessly across all devices, ensuring a seamless experience for your users on desktops, tablets, and smartphones.",
    },
    {
      title: "E-commerce Solutions",
      shortDescription: "Boost your sales with powerful online stores.",
      detailedDescription:
        "Our e-commerce solutions provide you with a robust platform to sell your products online. We develop user-friendly and secure online stores with a focus on increasing conversions and improving customer experience.",
    },
    {
      title: "Web Application Development",
      shortDescription: "Feature-rich web applications for your business.",
      detailedDescription:
        "We build scalable and feature-rich web applications that empower your business. From internal tools to customer-facing applications, we develop solutions that meet your exact requirements.",
    },
    {
      title: "Plugin Development",
      shortDescription:
        "Custom plugins to extend your platform's functionality.",
      detailedDescription:
        "Our plugin development service provides custom-built plugins that add specific features and functionalities to your website or platform. Whether it's WordPress, Minecraft, or a custom CMS, we deliver plugins that enhance user experience and achieve your unique business objectives.",
    },
    {
      title: "Coding Projects",
      shortDescription: "Custom coding solutions to bring your ideas to life.",
      detailedDescription:
        "Have a unique idea that requires custom coding? Our coding project service takes your concepts and turns them into reality. We build everything from scripts to full-fledged software, tailored to solve your specific problems and meet your needs. Let us help you take your idea from concept to completion with our expert coding skills.",
    },
  ];

  // useInView from react-intersection-observer
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true, // Only trigger animation once when it comes into view
    threshold: 0.2, // 20% of the component should be visible before it triggers
  });

  return (
    <motion.div
      ref={sectionRef}
      className="min-h-[40vh] w-screen text-white px-10 py-12 my-8 flex justify-center items-center"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.div
        className="max-w-full sm:max-w-[40vw] mx-auto flex flex-col justify-center items-center gap-6"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          onSwiper={(swiper: SwiperInstance) => {
            setSwiperInstance(swiper); // Set the swiper instance so we can control it
          }}
          className="w-full"
        >
          {services.map((service, index) => (
            <SwiperSlide
              key={index}
              className={`border-2 border-green-800 bg-neutral-950 bg-opacity-70 px-6 py-10 rounded-lg ${
                focusedIndex === index ? "shadow-lg" : ""
              }`}
            >
              <div
                onMouseEnter={() => {
                  setFocusedIndex(index);
                  if (swiperInstance) swiperInstance.autoplay.stop(); // Stop autoplay when hovered
                  setHasInteracted(true); // Mark interaction on hover
                }}
                onMouseLeave={() => {
                  setFocusedIndex(null);
                  if (swiperInstance) swiperInstance.autoplay.start(); // Restart autoplay when hover ends
                }}
                onClick={() => {
                  if (focusedIndex !== index) {
                    setFocusedIndex(index); // Focus the item if not already focused
                    if (swiperInstance) swiperInstance.autoplay.stop(); // Stop autoplay on click
                    setHasInteracted(true); // Mark interaction on click
                  } else {
                    setFocusedIndex(null); // Collapse if already focused
                    if (swiperInstance) swiperInstance.autoplay.start(); // Restart autoplay
                  }
                }}
                className="cursor-pointer relative"
              >
                {!hasInteracted && (
                  <motion.div
                    className="absolute -top-6 right-0 font-bold text-xs text-green-800"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [1, 0.9, 1],
                    }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
                    {isSmall ? "* Try Clicking" : "* Try Hovering"}
                  </motion.div>
                )}
                <h3 className="text-2xl font-semibold mb-2 text-center">
                  {service.title}
                </h3>
                <p className="text-md mb-4 text-center">
                  {service.shortDescription}
                </p>

                {/* AnimatePresence + motion.div for smooth transition */}
                <AnimatePresence>
                  {focusedIndex === index && (
                    <motion.div
                      key={index}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-md text-gray-300 text-center">
                        {service.detailedDescription}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default Services;
