import React, { useState } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animation
import { useInView } from "react-intersection-observer"; // Import Intersection Observer

// Installation command: npm install framer-motion react-intersection-observer

const ContactUs: React.FC = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const maxChars = 500;

  // Intersection observer hook
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once when the component is visible
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("https://rustyws.com/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setSuccessMessage("Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setErrorMessage("Failed to send message.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <motion.div
      ref={ref}
      id="contact"
      className="min-h-[50vh] text-white px-10 py-24 my-12 flex items-center justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.div
        className="max-w-2xl w-full"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.3 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <p className="text-md mb-6 text-center">
          Have a question or want to discuss a project?
          Maybe you have a suggestion or just want to say hi?  
          Send us a message and we'll get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.5 }}
          >
            <label htmlFor="name" className="text-lg font-bold mb-2">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-2 mb-4 rounded-lg placeholder:text-gray-600 border-green-800 border-4 bg-gray-200 text-black"
              placeholder="Jane Doe"
              required
            />
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.7 }}
          >
            <label htmlFor="email" className="text-lg font-bold mb-2">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 mb-4 rounded-lg placeholder:text-gray-600 border-green-800 border-4 bg-gray-200 text-black"
              placeholder="Email@example.com"
              required
            />
          </motion.div>

          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.9 }}
          >
            <label htmlFor="message" className="text-lg font-bold mb-2">
              Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              maxLength={maxChars}
              rows={5}
              className="p-2 mb-4 rounded-lg placeholder:text-gray-600 border-green-800 border-4 bg-gray-200 text-black"
              placeholder="Your Message Here"
              required
            />
            <div className="text-right text-sm mb-4">
              {maxChars - message.length} characters remaining
            </div>
          </motion.div>

          <motion.button
            type="submit"
            className="bg-green-800 w-fit self-start hover:bg-green-900 drop-shadow-lg hover:scale-[102%] text-white font-bold py-2 px-4 rounded-lg relative bottom-8"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: "easeInOut", delay: 1.1 }}
          >
            Submit
          </motion.button>

          {successMessage && (
            <motion.p
              className="text-green-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 1.3 }}
            >
              {successMessage}
            </motion.p>
          )}
          {errorMessage && (
            <motion.p
              className="text-red-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut", delay: 1.3 }}
            >
              {errorMessage}
            </motion.p>
          )}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ContactUs;
