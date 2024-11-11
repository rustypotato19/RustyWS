import React from "react";
import { motion } from "framer-motion"; // Import framer-motion for animations

const Products: React.FC = () => {
  const products = [
    {
      title: "Website Development",
      shortDescription: "Get a modern, responsive website for your business.",
      detailedDescription:
        "We offer full-scale website development as well as simple web page services tailored to meet your needs. Our websites are built with user experience in mind, incorporating modern design principles and technologies.",
      price: "Starting at £75",
      estimatedDuration: "<1-6 weeks",
    },
    {
      title: "Plugin Development",
      shortDescription:
        "Add functionality to your platform with a custom plugin.",
      detailedDescription:
        "Our custom plugin development service extends the functionality of your Content Management System (CMS) or website. Whether it's for WordPress, Minecraft, or a custom CMS, we provide scalable and efficient plugins that cater to your unique requirements.",
      price: "Starting at £25",
      estimatedDuration: "<1-4 weeks",
    },
    /* {
      title: "Strategy Consultation",
      shortDescription:
        "Professional guidance to define your digital strategy.",
      detailedDescription:
        "Our consultation service offers personalised guidance to help you create a strong and actionable digital strategy. Whether it's marketing, SEO, or scaling your website, we bring our expertise to help your business grow.",
      price: "£30 per session",
      estimatedDuration: "Sessions typically last up to 1 hour",
    }, */
    {
      title: "Coding Project",
      shortDescription: "Bring your coding idea to life with our expertise.",
      detailedDescription:
        "From small scripts to full-fledged applications, our custom coding services help bring your unique idea to reality. We focus on providing clean, efficient code to solve specific problems or create unique features for your personal or business needs.",
      price: "Starting at £25",
      estimatedDuration: "<1-6 weeks",
    },
  ];
  const isSmall = window.innerWidth < window.innerHeight;

  return (
    <div
      id="products"
      className={`min-h-[50vh] w-screen text-white px-10 py-24 flex justify-center items-center ${isSmall ? "mb-12 mt-20" : "my-12"}`}
      data-aos="fade-up"
      data-aos-delay="200"
    >
      <div className="max-w-4xl mx-auto flex flex-col justify-center items-center gap-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Products & Services</h2>
        {products.map((product, index) => (
          <motion.div
            key={index}
            className="w-full border-2 border-green-800 bg-neutral-950 bg-opacity-70 px-6 py-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4">{product.title}</h3>
            <p className="text-md mb-2">{product.shortDescription}</p>
            <p className="text-md text-gray-300 mb-2">
              {product.detailedDescription}
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4">
              <p className="text-lg font-bold text-green-500">
                {product.price}
              </p>
              <p className="text-sm text-gray-400">
                {product.estimatedDuration}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Products;
