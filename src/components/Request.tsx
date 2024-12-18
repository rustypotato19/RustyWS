import React, { useState } from "react";
import axios from "axios";
import LoaderComponent from "./LoadingSpinner";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Request: React.FC = () => {
  const [formData, setFormData] = useState({
    requestType: "",
    contactInfo: "",
    description: "",
    priority: "",
    firstName: "",
    lastName: "",
  });
  const [charCount, setCharCount] = useState(500);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "description") {
      setCharCount(500 - value.length);
    }
  };

  const generateTicketId = () => {
    const priorityCode = formData.priority[0].toLowerCase();
    const requestTypeCode = formData.requestType.split("-")[0].slice(0, 4);
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const randomStr = Math.random().toString(36).substring(2, 6);
    return `${priorityCode}-${requestTypeCode}-${dateCode}-${randomStr}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!/\S+@\S+\.\S+/.test(formData.contactInfo)) {
      setError("Please provide a valid email.");
      setLoading(false);
      return;
    }

    const generatedTicketId = generateTicketId();
    setTicketId(generatedTicketId);

    if (formData.description === "") {
      formData.description = "No description provided";
    }

    const submissionData = {
      ticketId: generatedTicketId,
      requestType: formData.requestType,
      contactInfo: formData.contactInfo,
      description: formData.description,
      priority: formData.priority,
      firstName: formData.firstName,
      lastName: formData.lastName,
    };

    try {
      await axios.post(
        "https://rustyws.com/api/submit-request",
        submissionData
      );
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, Math.random() * (6500 - 4000) + 4000);
    } catch (error: any) {
      setLoading(false);
      setError("Error submitting request. Please try again.");
    }
  };

  const handleCopyTicketId = () => {
    navigator.clipboard
      .writeText(ticketId)
      .then(() => {
        setIsCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy the ticket ID:", error);
      });
  };

  const handleClose = () => {
    setFormData({
      requestType: "",
      contactInfo: "",
      description: "",
      priority: "",
      firstName: "",
      lastName: "",
    });
    setCharCount(500);
    setSuccess(false);
    setError("");
    setTicketId("");
    setIsCopied(false);
  };

  const formContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger effect for children
      },
    },
  };

  const formItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      ref={ref}
      className="min-h-[50vh] w-screen text-white px-10 py-12 flex justify-center items-center"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeInOut" }}
    >
      <motion.div
        className="w-full max-w-2xl mx-auto"
        variants={formContainerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {!success ? (
          <>
            <h2 className="text-3xl font-bold text-center mb-6">
              Request a Service
            </h2>
            <p className="text-lg text-center mb-10">
              Interested in our services? Fill out the form below and we'll get
              back to you as soon as possible.
            </p>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-6"
              variants={formContainerVariants}
            >
              {/* First Name and Last Name */}
              <motion.div
                className="flex flex-row gap-4"
                variants={formItemVariants}
              >
                <div className="w-1/2">
                  <label htmlFor="first-name" className="block mb-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full text-gray-900 placeholder:text-gray-600 border-green-800 border-4 bg-gray-200 placeholder:font-bold rounded-lg p-2"
                    placeholder="Jane"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label htmlFor="last-name" className="block mb-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full text-gray-900 placeholder:text-gray-600 border-green-800 border-4 bg-gray-200 placeholder:font-bold rounded-lg p-2"
                    placeholder="Doe"
                    required
                  />
                </div>
              </motion.div>

              {/* Contact Email */}
              <motion.div variants={formItemVariants}>
                <label htmlFor="contact-info" className="block mb-1">
                  Contact Email Address *
                </label>
                <input
                  type="email"
                  id="contact-info"
                  name="contactInfo"
                  value={formData.contactInfo}
                  onChange={handleInputChange}
                  className="w-full text-gray-900 placeholder:text-gray-600 border-green-800 border-4 bg-gray-200 placeholder:font-bold rounded-lg p-2"
                  placeholder="example@email.com"
                  required
                />
              </motion.div>

              {/* Request Type */}
              <motion.div variants={formItemVariants}>
                <label htmlFor="request-type" className="block mb-1">
                  Request Type *
                </label>
                <select
                  id="request-type"
                  name="requestType"
                  value={formData.requestType}
                  onChange={handleInputChange}
                  className="w-full text-gray-900 bg-gray-200 border-green-800 border-4 rounded-lg p-2"
                  required
                >
                  <option value="">Request type...</option>
                  <option value="web-development">Website Development</option>
                  <option value="plugin-development">Plugin Development</option>
                  <option value="standalone-project">Coding Project</option>
                  <option value="other">Other (Specify)</option>
                </select>
              </motion.div>

              {/* Priority */}
              <motion.div variants={formItemVariants}>
                <label htmlFor="priority" className="block mb-1">
                  Priority *
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full text-gray-900 bg-gray-200 border-green-800 border-4 rounded-lg p-2"
                  required
                >
                  <option value="">Priority...</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High (+££)</option>
                </select>
              </motion.div>

              {/* Description */}
              <motion.div variants={formItemVariants}>
                <label htmlFor="description" className="block mb-1">
                  Description
                </label>
                <textarea
                  maxLength={500}
                  rows={5}
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full text-gray-900 placeholder:text-gray-600 border-green-800 border-4 bg-gray-200 placeholder:font-bold rounded-lg p-2"
                  placeholder="Something to describe your needs"
                ></textarea>
                <div className="text-right text-sm">
                  {charCount} characters remaining
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="bg-green-800 hover:bg-green-900 text-white font-bold py-2 px-6 rounded-lg shadow-lg"
                variants={formItemVariants}
              >
                Submit
              </motion.button>
            </motion.form>
            {loading && (
              <motion.div
                className="fixed inset-0 w-screen bg-neutral-800 h-screen flex justify-center items-center backdrop-blur z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="w-fit h-fit p-4 flex justify-center items-center mb-4">
                  <LoaderComponent />
                </div>
              </motion.div>
            )}
            {error && (
              <motion.p
                className="text-red-500 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {error}
              </motion.p>
            )}
          </>
        ) : (
          <motion.div
            className="fixed inset-0 w-screen h-screen flex justify-center items-center backdrop-blur z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="w-[85vw] sm:w-1/2 h-fit bg-neutral-800 border-black border-2 px-6 py-3 rounded-3xl">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-600 mb-4">
                  Success!
                </h2>
                <p className="text-green-600 text-lg text-opacity-60 mb-2">
                  Your request has been submitted successfully.
                </p>
                <p className="text-md">
                  Your ticket ID: <span className="font-bold">{ticketId}</span>
                  <button
                    onClick={handleCopyTicketId}
                    className={`relative left-2 bottom-0.5 ${
                      isCopied ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                    disabled={isCopied}
                  >
                    {isCopied ? (
                      <img
                        src="/images/logos/tick.png"
                        alt="Copy"
                        className="h-6 w-6 inline-block mr-2"
                      />
                    ) : (
                      <img
                        src="/images/logos/copy.png"
                        alt="Copy"
                        className="h-6 w-6 inline-block mr-2"
                      />
                    )}
                  </button>
                  <br />
                  If your details were correct, you will receive an Email within
                  24 hours confirming your request details. If you don't receive
                  a confirmation in that time, contact us stating your issue and
                  ticket ID.
                  <br />
                  <button
                    onClick={handleClose}
                    className={`${
                      isCopied
                        ? "text-green-700"
                        : "text-gray-400 pointer-events-none"
                    } font-bold text-xl mt-4`}
                  >
                    Close
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
      <p id="tickets" className="transparent relative top-32  " />
    </motion.div>
  );
};

export default Request;
