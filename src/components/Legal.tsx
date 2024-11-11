import React, { useState } from "react";
import { motion } from "framer-motion";

const Legal: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);
  const isSmall = window.innerWidth < window.innerHeight;

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Motion variants for container and items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen text-white bg-neutral-900 w-full mx-auto flex items-center justify-center z-20">
      <motion.div
        className={`w-[80vw] sm:w-[55vw] text-left mx-auto flex flex-col justify-center items-start gap-12 py-12 ${
          isSmall ? "mt-12" : ""
        }`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h1 id="tos" className="text-4xl font-bold text-center w-full">
          Legal Information
        </h1>

        {/* Terms of Use Section */}
        <motion.section
          className="flex flex-col justify-center items-start w-full"
          variants={itemVariants}
        >
          <button
            onClick={() => toggleSection("tos")}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "tos" ? "v" : ">"} Terms of Use
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "tos" ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                Welcome to Rusty's Web Services. By using this website, you
                agree to comply with and be bound by the following terms and
                conditions.
              </p>
              <p className="text-lg">
                You agree to use this website for lawful purposes only and in a
                way that does not infringe the rights of others or restrict
                their use and enjoyment of this website.
              </p>
              <p className="text-lg">
                Rusty's Web Services reserves the right to update or modify
                these Terms of Use at any time without prior notice.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Data Protection Section */}
        <motion.section
          className="flex flex-col justify-center items-start w-full"
          variants={itemVariants}
        >
          <button
            onClick={() => toggleSection("dataProtection")}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "dataProtection" ? "v" : ">"} Data Protection
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "dataProtection" ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                At Rusty's Web Services, we take data protection very seriously.
                We ensure that all personal data you provide is kept secure and
                handled in compliance with applicable data protection laws.
              </p>
              <p className="text-lg">
                We only collect information necessary to provide our services
                and guarantee the best possible experience for our customers.
              </p>
              <p className="text-lg">
                You have the right to access, correct, or request the deletion
                of your personal information at any time. For further inquiries,
                please contact us at{" "}
                <a
                  href="mailto:contact@rustyws.com"
                  className="hover:underline text-green-700"
                >
                  contact@rustyws.com
                </a>
                .
              </p>
            </div>
          </div>
        </motion.section>

        {/* Privacy Policy Section */}
        <motion.section
          className="flex flex-col justify-center items-start w-full"
          variants={itemVariants}
        >
          <button
            onClick={() => toggleSection("privacyPolicy")}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "privacyPolicy" ? "v" : ">"} Privacy Policy
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "privacyPolicy" ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                Rusty's Web Services is committed to respecting your privacy and
                protecting your personal data. This Privacy Policy explains how
                we collect, use, and store your data.
              </p>
              <p className="text-lg">
                We collect and temporarily store personal information such as
                your name and email address when you use our services.
              </p>
              <p className="text-lg">
                If you have any questions regarding our privacy practices,
                please contact us at{" "}
                <a
                  href="mailto:contact@rustyws.com"
                  className="hover:underline text-green-700"
                >
                  contact@rustyws.com
                </a>
                .
              </p>
            </div>
          </div>
        </motion.section>

        {/* Legal Notices Section */}
        <motion.section
          className="flex flex-col justify-center items-start w-full"
          variants={itemVariants}
        >
          <button
            onClick={() => toggleSection("legalNotices")}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "legalNotices" ? "v" : ">"} Legal Notices
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "legalNotices" ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                This website is operated by Rusty's Web Services. We strive to
                provide accurate and up-to-date information; however, we make no
                representations or warranties of any kind about the accuracy,
                completeness, reliability, or availability of the website or the
                information provided.
              </p>
              <p className="text-lg">
                By accessing this website, you acknowledge and agree that you do
                so at your own risk. Rusty's Web Services shall not be liable
                for any direct, indirect, or consequential loss or damage
                arising from the use of this website.
              </p>
              <p className="text-lg">
                If you have any questions about the content or wish to report a
                concern, please reach out to us at{" "}
                <a
                  href="mailto:contact@rustyws.com"
                  className="hover:underline text-green-700"
                >
                  contact@rustyws.com
                </a>
                .
              </p>
            </div>
          </div>
        </motion.section>

        {/* Copyright Notice Section */}
        <motion.section
          className="flex flex-col justify-center items-start w-full"
          variants={itemVariants}
        >
          <button
            onClick={() => toggleSection("copyright")}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "copyright" ? "v" : ">"} Copyright Notice
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "copyright" ? "max-h-screen" : "max-h-0"
            }`}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                Rusty's Web Services (RWS) © 2024 - present. All rights
                reserved. All content, including text, graphics, images, and
                code, is the property of Rusty's Web Services unless otherwise
                stated.
              </p>
              <p className="text-lg">
                Unauthorized reproduction, distribution, or use of the materials
                on this website without prior written permission is strictly
                prohibited.
              </p>
              <p className="text-lg">
                If you would like to use any content for non-commercial or
                educational purposes, please contact us for appropriate
                permissions.
              </p>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default Legal;
