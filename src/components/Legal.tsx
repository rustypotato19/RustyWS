import React, { useState } from "react";

const Legal: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen text-white bg-neutral-900 w-full mx-auto flex items-center justify-center z-20">
      <div className="w-[80vw] sm:w-[55vw] mx-auto text-left flex flex-col justify-center items-start gap-12 py-16">
        <h1 id="tos" className="text-4xl font-bold mb-8">
          Legal Information
        </h1>

        {/* Terms of Use Section */}
        <section
          className="flex flex-col justify-center items-start w-full"
          data-aos="fade-right"
          data-aos-delay="0"
        >
          <button
            onClick={() => {
              toggleSection("tos");
            }}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "tos" ? "v" : ">"} Terms of Use
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "tos" ? "max-h-screen" : "max-h-0"
            }`}
            style={{
              transition: "max-height 1s ease-in-out",
            }}
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
                their use and enjoyment of this website. Unauthorized use of the
                website may give rise to a claim for damages and/or be a
                criminal offense.
              </p>
              <div id="dp"></div>
              <p className="text-lg">
                Rusty's Web Services reserves the right to update or modify
                these Terms of Use at any time without prior notice. Continued
                use of the website signifies your acceptance of any changes.
              </p>
            </div>
          </div>
        </section>

        {/* Data Protection Section */}
        <section
          className="flex flex-col justify-center items-start gap-2"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <button
            onClick={() => {
              toggleSection("dataProtection");
            }}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "dataProtection" ? "v" : ">"} Data Protection
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "dataProtection" ? "max-h-screen" : "max-h-0"
            }`}
            style={{
              transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
            }}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                At Rusty's Web Services, we take data protection very seriously. We
                ensure that all personal data you provide is kept secure and handled
                in compliance with applicable data protection laws.
              </p>
              <p className="text-lg">
                We only collect information necessary to provide our services and
                guarantee the best possible experience for our customers. We do not
                share personal information with third parties without your consent,
                except as required by law.
              </p>
              <div id="pp"></div>
              <p className="text-lg">
                You have the right to access, correct, or request the deletion of
                your personal information at any time. For further inquiries, please
                contact us at
                <br />
                <a
                  href="mailto:contact@rustyws.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-green-700"
                >
                  contact@rustyws.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Privacy Policy Section */}
        <section
          className="flex flex-col justify-center items-start gap-2"
          data-aos="fade-right"
          data-aos-delay="400"
        >
          <button
            onClick={() => {
              toggleSection("privacyPolicy");
            }}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "privacyPolicy" ? "v" : ">"} Privacy Policy
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "privacyPolicy" ? "max-h-screen" : "max-h-0"
            }`}
            style={{
              transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
            }}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                Rusty's Web Services is committed to respecting your privacy and
                protecting your personal data. This Privacy Policy explains how we
                collect, use, and store your data.
              </p>
              <p className="text-lg">
                We collect and temporarily store personal information such as your
                name and email address when you use our services. This information
                is used solely for providing our services, responding to your
                inquiries, and improving user experience.
              </p>
              <div id="ln"></div>
              <p className="text-lg">
                If you have any questions regarding our privacy practices, please
                contact us at
                <br />
                <a
                  href="mailto:contact@rustyws.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-green-700"
                >
                  contact@rustyws.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Legal Notices Section */}
        <section
          className="flex flex-col justify-center items-start gap-2"
          data-aos="fade-right"
          data-aos-delay="600"
        >
          <button
            onClick={() => {
              toggleSection("legalNotices");
            }}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "legalNotices" ? "v" : ">"} Legal Notices
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "legalNotices" ? "max-h-screen" : "max-h-0"
            }`}
            style={{
              transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
            }}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                This website is operated by Rusty's Web Services. We strive to
                provide accurate and up-to-date information; however, we make no
                representations or warranties of any kind, express or implied, about
                the accuracy, completeness, reliability, or availability of the
                website or the information provided.
              </p>
              <p className="text-lg">
                By accessing this website, you acknowledge and agree that you do so
                at your own risk. Rusty's Web Services shall not be liable for any
                direct, indirect, or consequential loss or damage arising from the
                use of this website.
              </p>
              <div id="cn"></div>
              <p className="text-lg">
                If you have any questions about the content or wish to report a
                concern, please reach out to us at
                <br />
                <a
                  href="mailto:contact@rustyws.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-green-700"
                >
                  contact@rustyws.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* Copyright Section */}
        <section
          className="flex flex-col justify-center items-start gap-2"
          data-aos="fade-right"
          data-aos-delay="800"
        >
          <button
            onClick={() => {
              toggleSection("copyright");
            }}
            className="transition-all duration-200 text-3xl font-semibold mb-4"
          >
            {openSection === "copyright" ? "v" : ">"} Copyright Notice
          </button>
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openSection === "copyright" ? "max-h-screen" : "max-h-0"
            }`}
            style={{
              transition: "max-height 0.5s ease-in-out, opacity 0.5s ease-in-out",
            }}
          >
            <div className="flex flex-col justify-center items-start gap-2">
              <p className="text-lg">
                Rusty's Web Services (RWS) © 2024 - present. All rights reserved.
                All content, including but not limited to text, graphics, images,
                and code, is the property of Rusty's Web Services unless otherwise
                stated. All designs are developed by an internal website designer
                unless stated otherwise.
              </p>
              <p className="text-lg">
                Unauthorised reproduction, distribution, or use of the materials on
                this website without prior written permission is strictly
                prohibited.
              </p>
              <p className="text-lg">
                If you would like to use any content for non-commercial or
                educational purposes, please contact us for appropriate permissions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Legal;
