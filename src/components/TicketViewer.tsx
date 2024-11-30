import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer"; // Import Intersection Observer

const FindTicket: React.FC = () => {
  const [ticketId, setTicketId] = useState<string>("");
  const [ticketData, setTicketData] = useState<any | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { ref, inView } = useInView({
    triggerOnce: true, // Animation triggers only once when the element comes into view
    threshold: 0.2, // Trigger when 20% of the component is visible
  });

  // Handle change of ticket ID input field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTicketId(e.target.value);
  };

  // Handle searching for a ticket
  const handleSearch = async (): Promise<void> => {
    if (!ticketId) {
      setError("Please enter a ticket ID.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.get(
        `https://rustyws.com/api/tickets/${ticketId}`
      );
      setTicketData(response.data);
    } catch (err) {
      setError("Ticket not found. Please check the ticket ID.");
    } finally {
      setLoading(false);
    }
  };

  // Clear search results and reset the fields
  const clearSearch = (): void => {
    setTicketId("");
    setTicketData(null);
    setError("");
  };

  // Helper function to format status text
  const formatStatus = (status: string): string => {
    return status
      .replace(/_/g, " ") // Replace underscores with spaces
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
  };

  // Helper function to format request type text
  const formatRequestType = (requestType: string): string => {
    return requestType
      .replace(/-/g, " ") // Replace hyphens with spaces
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize the first letter of each word
  };

  return (
    <section
      className="mx-auto w-full h-full flex justify-center items-center py-12 text-center"
    >
      <motion.div
        ref={ref}
        className="mx-auto p-2 lg:p-8 min-h-[30vh] w-full lg:w-[50dvw]"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        <h2 className="text-3xl text-green-700 font-bold mb-6">
          Find Your Ticket
        </h2>
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Enter your Ticket ID"
            value={ticketId}
            onChange={handleInputChange}
            className="mb-4 p-2 rounded-lg w-full border-green-700 border-4 outline-none focus:ring-2"
          />
          <button
            onClick={handleSearch}
            className="text-white px-4 py-2 bg-green-700 font-bold hover:bg-green-800 rounded-lg mb-4 ml-2"
          >
            Search
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {ticketData === null ||
        ticketData === undefined ||
        ticketData === "" ? (
          <p className="text-gray-500 absolute left-1/2 -translate-x-1/2 text-lg">
            It's quiet down here...
          </p>
        ) : null}
        {ticketData && (
          <motion.div
            className="bg-white border-4 border-green-700 p-6 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <h3 className="text-xl font-bold mb-2">
              {formatRequestType(ticketData.request_type)}
            </h3>
            <p className="flex items-center">
              <strong>Priority:</strong>{" "}
              <span
                className={`ml-2 px-2 py-1 rounded text-sm font-bold ${
                  ticketData.priority === "Low"
                    ? "bg-green-200 text-green-800"
                    : ticketData.priority === "Medium"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-red-200 text-red-800"
                }`}
              >
                {ticketData.priority}
              </span>
            </p>
            <p className="mt-4">
              <strong>Description:</strong>
            </p>
            <div className="bg-neutral-300 p-4 rounded-lg mb-4 overflow-auto">
              {ticketData.description || "No description provided"}
            </div>
            <p>
              <strong>Request Date:</strong>{" "}
              {new Date(ticketData.request_date).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`font-bold ${
                  ticketData.status === "resolved"
                    ? "text-green-700"
                    : ticketData.status === "pending"
                    ? "text-yellow-700"
                    : "text-red-700"
                }`}
              >
                {formatStatus(ticketData.status)}
              </span>
            </p>
            <p>
              <strong>Contacted:</strong> {ticketData.contacted ? "Yes" : "No"}
            </p>
            <button
              onClick={clearSearch}
              className="bg-red-300 font-bold hover:bg-red-400 text-black px-4 py-2 rounded-lg mt-4"
            >
              Clear
            </button>
          </motion.div>
        )}
      </motion.div>
      <p id="contact" className="transparent relative top-44" />
    </section>
  );
};

export default FindTicket;
