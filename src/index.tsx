import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  once: true, // Animation occurs once per element
  duration: 800, // Animation lasts 1200ms
  easing: "ease-in-out", // Animation easing is ease-in-out
  mirror: false, // Animation does not mirror
  offset: 100, // Animation occurs 100px from the top of the viewport
  delay: 0, // Animation delay is 0
  disableMutationObserver: false, // Mutation observer is disabled
  startEvent: "DOMContentLoaded", // Animation starts when the DOM content is loaded
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
