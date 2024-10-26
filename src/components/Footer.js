import React from "react";

const Footer = () => {
  return (
    <footer id="contact" className="mx-auto flex items-center justify-center bg-rws-gray text-white py-4 text-center rounded-t-[50px] w-[100dvw] lg:w-full">
      <div className="container mx-4 w-[100dvw] lg:w-[80dvw] md:mx-2">
        <p className="w-full lg:w-5/6 text-center mx-auto">
          Rusty's Web Services (RWS) © 2024 - present. <br />
          Website developed and maintained by Konrad Mitura, identifying by "Rusty". All content on this page is original and subject to copyright unless stated otherwise. All designs are developed by an internal website designer unless stated otherwise.
          <br />
          Products and services listed on this site can be subject to costs even if not stated prior. All costs will be discussed when arranging services.
          <br />
          Icons by: <a className="text-blue-400 text-xs opacity-80 hover:text-blue-500 hover:underline" href="https://icons8.com">icons8.com</a>
        </p>

        <div className="mt-4">
          <p className="text-xs opacity-80">
            <a href="/legal-stuff#tos" className="text-blue-400 hover:text-blue-500 hover:underline mx-1">Terms of Use</a> | 
            <a href="/legal-stuff#dp" className="text-blue-400 hover:text-blue-500 hover:underline mx-1">Data Protection</a> | 
            <a href="/legal-stuff#pp" className="text-blue-400 hover:text-blue-500 hover:underline mx-1">Privacy Policy</a> | 
            <a href="/legal-stuff#ln" className="text-blue-400 hover:text-blue-500 hover:underline mx-1">Legal Notices</a> | 
            <a href="/legal-stuff#cn" className="text-blue-400 hover:text-blue-500 hover:underline mx-1">Copyright</a> 
          </p>
          <p className="text-xs mt-2 opacity-80">
            The information provided on this website is intended for informational purposes only and does not constitute legal advice. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
