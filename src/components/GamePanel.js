import React from "react";
import { useState } from "react";

const GamePanel = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div
      className={`flex justify-center items-center w-[7vw] rounded-lg pt-4 fixed left-0 bottom-0 h-full transition-all duration-500 ${
        focused ? "translate-x-[1dvw]" : "-translate-x-[6.5dvh]"
      }`}
    >
      <div className="text-xl text-rws-dark-blue h-fit w-full flex flex-col justify-start items-center">
        <div className="flex flex-row justify-between items-center h-full">
          <div className="flex flex-col justify-evenly">
            <div className="w-full flex flex-col items-center justify-center">
              <p class>Game 1</p>
              <a href="/">
                <img src="/favicon.ico" alt=""></img>
              </a>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <p>Game 2</p>
              <a href="/">
                <img src="/favicon.ico" alt=""></img>
              </a>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <p>Game 3</p>
              <a href="/">
                <img src="/favicon.ico" alt=""></img>
              </a>
            </div>
          </div>
          <div>
            <button
              onClick={() => setFocused(!focused)}
              className="px-4 py-2 text-rws-dark-blue rounded-lg"
            >
              {focused ? "<" : ">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePanel;
