import React from "react";

const Legal = () => {
  return (
    <div className="container mx-auto px-4 py-8 w-[75dvw]">
      <div id="tos"></div>
      <h1 className="text-4xl font-bold mb-8 text-center">Legal Information</h1>

      {/* Terms of Use Section */}
      <section className="mb-8 border border-rws-dark-blue px-6 py-3 rounded-3xl">
        <h2 className="text-3xl font-semibold mb-4">Terms of Use</h2>
        <p className="text-lg mb-4">
          Welcome to Rusty's Web Services. By using this website, you agree to comply with and be bound by the following terms and conditions.
        </p>
        <p className="text-lg mb-4">
          You agree to use this website for lawful purposes only and in a way that does not infringe the rights of others or restrict their use and enjoyment of this website. Unauthorized use of the website may give rise to a claim for damages and/or be a criminal offense.
        </p>
        <div id="dp"></div>
        <p className="text-lg">
          Rusty's Web Services reserves the right to update or modify these Terms of Use at any time without prior notice. Continued use of the website signifies your acceptance of any changes.
        </p>
      </section>

      {/* Data Protection Section */}
      <section className="mb-8 border border-rws-dark-blue px-6 py-3 rounded-3xl">
        <h2 className="text-3xl font-semibold mb-4">Data Protection</h2>
        <p className="text-lg mb-4">
          At Rusty's Web Services, we take data protection very seriously. We ensure that all personal data you provide is kept secure and handled in compliance with applicable data protection laws.
        </p>
        <p className="text-lg mb-4">
          We only collect information necessary to provide our services and guarantee the best possible experience for our customers. We do not share personal information with third parties without your consent, except as required by law.
        </p>
        <div id="pp"></div>
        <p className="text-lg">
          You have the right to access, correct, or request the deletion of your personal information at any time. For further inquiries, please contact us at <a href="mailto:contact@rustyws.com" target="_blank" rel="noopener noreferrer" className="text-rws-dark-blue hover:text-rws-dark-blue-hover hover:underline">contact@rustyws.com</a>.
        </p>
      </section>

      {/* Privacy Policy Section */}
      <section className="mb-8 border border-rws-dark-blue px-6 py-3 rounded-3xl">
        <h2 className="text-3xl font-semibold mb-4">Privacy Policy</h2>
        <p className="text-lg mb-4">
          Rusty's Web Services is committed to respecting your privacy and protecting your personal data. This Privacy Policy explains how we collect, use, and store your data.
        </p>
        <p className="text-lg mb-4">
          We collect and temporarily store personal information such as your name and email address when you use our services. This information is used solely for providing our services, responding to your inquiries, and improving user experience.
        </p>
        {/* <p className="text-lg mb-4">
          We use cookies to personalize your experience on our website. By using this website, you consent to our use of cookies in accordance with this Privacy Policy.
        </p> */}
        <div id="ln"></div>
        <p className="text-lg">
          If you have any questions regarding our privacy practices, please contact us at <a href="mailto:contact@rustyws.com" target="_blank" rel="noopener noreferrer" className="text-rws-dark-blue hover:text-rws-dark-blue-hover hover:underline">contact@rustyws.com</a>.
        </p>
      </section>

      {/* Legal Notices Section */}
      <section className="mb-8 border border-rws-dark-blue px-6 py-3 rounded-3xl">
        <h2 className="text-3xl font-semibold mb-4">Legal Notices</h2>
        <p className="text-lg mb-4">
          This website is operated by Rusty's Web Services. We strive to provide accurate and up-to-date information; however, we make no representations or warranties of any kind, express or implied, about the accuracy, completeness, reliability, or availability of the website or the information provided.
        </p>
        <p className="text-lg mb-4">
          By accessing this website, you acknowledge and agree that you do so at your own risk. Rusty's Web Services shall not be liable for any direct, indirect, or consequential loss or damage arising from the use of this website.
        </p>
        <div id="cn"></div>
        <p className="text-lg">
          If you have any questions about the content or wish to report a concern, please reach out to us at <a href="mailto:contact@rustyws.com" target="_blank" rel="noopener noreferrer" className="text-rws-dark-blue hover:text-rws-dark-blue-hover hover:underline">contact@rustyws.com</a>.
        </p>
      </section>

      {/* Copyright Section */}
      <section className="mb-8 border border-rws-dark-blue px-6 py-3 rounded-3xl">
        <h2 className="text-3xl font-semibold mb-4">Copyright Notice</h2>
        <p className="text-lg mb-4">
        Rusty's Web Services (RWS) © 2024 - present. All rights reserved. All content, including but not limited to text, graphics, images, and code, is the property of Rusty's Web Services unless otherwise stated. All designs are developed by an internal website designer unless stated otherwise.
        </p>
        <p className="text-lg mb-4">
          Unauthorised reproduction, distribution, or use of the materials on this website without prior written permission is strictly prohibited.
        </p>
        <p className="text-lg">
          If you would like to use any content for non-commercial or educational purposes, please contact us for appropriate permissions.
        </p>
      </section>
    </div>
  );
};

export default Legal;
