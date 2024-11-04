import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="h-[25dvh] mx-auto w-full bg-neutral-800 flex items-center justify-center text-white text-center">
      <div className="h-full w-[95vw] sm:w-[70vw] flex flex-row justify-center items-center">
        <div className="w-2/3 h-full mx-auto flex justify-start items-start py-2 sm:py-6">
          <p className="text-sm sm:text-md text-left w-full mx-auto h-full flex flex-col justify-between items-start">
            <p>
              Rusty's Web Services (RWS) © 2024 - present. <br />
              Website developed and maintained by Konrad Mitura, identifying by
              "Rusty". For more information see links beside.
            </p>
            <br />
            <p>
              Icons by:{" "}
              <a
                className="text-blue-400 opacity-80 hover:text-blue-500 hover:underline"
                href="https://icons8.com"
              >
                icons8.com
              </a>
            </p>
          </p>
        </div>
        <div className="h-full">
          <p className="h-full text-xs opacity-80 flex flex-col justify-center items-end gap-4">
            <a
              href="/Legal#tos"
              className="text-blue-400 hover:text-blue-500 hover:underline"
            >
              Terms of Use {"<"}
            </a>{" "}
            <a
              href="/Legal#dp"
              className="text-blue-400 hover:text-blue-500 hover:underline"
            >
              Data Protection {"<"}
            </a>{" "}
            <a
              href="/Legal#pp"
              className="text-blue-400 hover:text-blue-500 hover:underline"
            >
              Privacy Policy {"<"}
            </a>{" "}
            <a
              href="/Legal#ln"
              className="text-blue-400 hover:text-blue-500 hover:underline"
            >
              Legal Notices {"<"}
            </a>{" "}
            <a
              href="/Legal#cn"
              className="text-blue-400 hover:text-blue-500 hover:underline"
            >
              Copyright {"<"}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
