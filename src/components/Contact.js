import React, { useState } from "react";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const maxChars = 500;

  const handleMessageChange = (e) => setMessage(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("https://rustyws.com/api/send-email", {
        // Use the correct path
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
    <section className="mx-auto flex justify-center items-center w-full mb-12 lg:mb-[5.5rem]">
      <div className="flex flex-col justify-center items-center h-full w-[90dvw] lg:w-[60dvw] transition-all duration-200 border border-rws-dark-blue rounded-3xl py-3 px-6 lg:py-6 lg:px-12">
        <div id="contact" className="relative bottom-[15dvh]"></div>
        <h1 className="text-center text-3xl text-rws-dark-blue rounded-full font-bold py-1 lg:py-2 w-full">
          Contact Us
        </h1>
        <p className="text-sm text-rws-gray opacity-80">
          * indicates required field
        </p>

        <form
          className="flex flex-col w-full justify-center"
          onSubmit={handleSubmit}
        >
          <label
            htmlFor="name"
            className="text-rws-dark-blue text-lg font-bold"
          >
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jane Doe"
            value={name}
            onChange={handleNameChange}
            className="border-2 border-rws-dark-blue rounded-lg p-2 my-2"
            required
          />

          <label
            htmlFor="email"
            className="text-rws-dark-blue text-lg font-bold"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            value={email}
            onChange={handleEmailChange}
            className="border-2 border-rws-dark-blue rounded-lg p-2 my-2"
            required
          />

          <label
            htmlFor="message"
            className="text-rws-dark-blue text-lg font-bold"
          >
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            placeholder="Enter your message here..."
            className="border-2 border-rws-dark-blue rounded-lg p-2 my-2"
            maxLength={maxChars}
            value={message}
            onChange={handleMessageChange}
            required
          />
          <div className="text-right text-sm text-rws-gray opacity-80">
            {maxChars - message.length} characters remaining
          </div>

          <button
            type="submit"
            className="bg-rws-dark-blue text-white rounded-lg py-2 px-4 my-2 w-fit hover:bg-rws-light-blue transition-all duration-500"
          >
            Submit
          </button>

          {successMessage && <p className="text-green-700">{successMessage}</p>}
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
