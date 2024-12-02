import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper as SwiperInstance } from "swiper/types";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "swiper/css";
import "swiper/css/pagination";
import "./Services.css";

const Services: React.FC = () => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(
    null
  );
  const [hasInteracted, setHasInteracted] = useState(false);

  const isSmall = window.innerWidth < window.innerHeight;

  // Update allowTouchMove dynamically
  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.allowTouchMove = focusedIndex == null;
    }
  }, [focusedIndex, swiperInstance]);

  const services = [
    {
      title: "Custom Website Development",
      shortDescription: "Modern, responsive websites tailored to your needs.",
      detailedDescription:
        "Our custom website development service provides tailored solutions that meet your needs. We use the latest technologies to create modern, responsive, and feature-rich websites that leave a lasting impression.",
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
        "Our plugin development service provides custom-built plugins that add specific features and functionalities to your website or platform. Whether it's custom software or Minecraft we deliver plugins that enhance user experience and achieve your unique objectives.",
    },
    {
      title: "Coding Projects",
      shortDescription: "Custom coding solutions to bring your ideas to life.",
      detailedDescription:
        "Have a unique idea that requires custom coding? Our coding project service takes your concepts and turns them into reality. We build everything from scripts to full-fledged software, tailored to solve your specific problems and meet your needs.",
    },
  ];

  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={sectionRef}
      className="min-h-[50vh] w-screen text-white px-10 flex flex-col justify-center items-center"
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.div
        className="w-[90dvw] md:w-[50dvw] flex flex-col justify-center items-center gap-12 relative"
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: inView ? 1 : 0,
          x: inView ? 0 : -50,
        }}
        transition={{
          opacity: { duration: 0.7, ease: "easeInOut" },
          x: { duration: 0.7, ease: "easeInOut" },
        }}
      >
        <motion.div
          className="absolute right-[10%] md:right-[20%] top-1/3 font-bold text-xs text-green-800 z-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [1, 0.9, 1],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 0.5,
            ease: "easeInOut",
          }}
        >
          {!hasInteracted
            ? isSmall
              ? "* Try Clicking"
              : "* Try Hovering"
            : ""}
        </motion.div>
        <h2 className="text-3xl font-bold">Our Services</h2>

        {/* Modal starts here */}
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          className="w-full px-6 flex flex-col justify-center items-center gap-6"
          onSwiper={(swiper: SwiperInstance) => setSwiperInstance(swiper)}
          allowTouchMove={focusedIndex == null ? false : true}
        >
          {services.map((service, index) => (
            <SwiperSlide
              key={index}
              className="w-full h-full flex justify-center items-center px-4"
            >
              <motion.div
                onMouseEnter={() => {
                  setFocusedIndex(index);
                  swiperInstance?.autoplay.stop();
                  setHasInteracted(true);
                }}
                onMouseLeave={() => {
                  setFocusedIndex(null);
                  swiperInstance?.autoplay.start();
                }}
                onClick={() => {
                  if (focusedIndex !== index) {
                    setFocusedIndex(index);
                    swiperInstance?.autoplay.stop(); // Stop autoplay on click
                    setHasInteracted(true);
                  } else {
                    setFocusedIndex(null);
                    swiperInstance?.autoplay.start(); // Restart autoplay if item is unfocused
                  }
                }}
                className="cursor-pointer text-center w-full mx-auto md:w-2/3 h-full bg-neutral-950 bg-opacity-70 rounded-lg border-2 border-green-800 flex flex-col justify-center items-center px-6 py-12"
                initial={{ height: 200 }}
                animate={{
                  height: focusedIndex === index ? 350 : 200, // Animate only the modal height
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h3 className="text-xl font-bold my-4">{service.title}</h3>
                <p className="text-sm mb-4">{service.shortDescription}</p>
                <AnimatePresence>
                  {focusedIndex === index && (
                    <motion.div
                      key={index}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: service.detailedDescription.length > 220 ? 150 : 120 , opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-sm text-gray-300 my-4">
                        {service.detailedDescription}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export default Services;
