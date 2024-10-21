import React, { useState, useEffect } from "react";
import axios from "axios";
import LoaderComponent from "./LoadingSpinner";

const FormModal = ({ isOpen, onClose }) => {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    requestType: "",
    contactInfo: "",
    description: "",
    priority: "Low", // Default priority
  });
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(500);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [ticketId, setTicketId] = useState(""); 
  const [isCopied, setIsCopied] = useState(false);

  // Function to handle copying the ticket ID
  const handleCopyTicketId = () => {
    navigator.clipboard.writeText(ticketId)
      .then(() => {
        setIsCopied(true); // Set the state to true once copied successfully
        //alert('Ticket ID copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy the ticket ID:', error);
      });
  };

  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "description") {
      setCharCount(500 - value.length);
    }
  };

  // Generate the ticket ID based on priority, request type, and a random string
  const generateTicketId = () => {
    const priorityCode = formData.priority[0].toLowerCase(); // "l", "m", "h"
    const requestTypeCode = formData.requestType.split("-")[0].slice(0, 4); // E.g., "web", "plug", "stan"
    const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // "yymmdd" format
    const randomStr = Math.random().toString(36).substring(2, 6); // 4-char alphanumeric

    return `${priorityCode}-${requestTypeCode}-${dateCode}-${randomStr}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!/\S+@\S+\.\S+/.test(formData.contactInfo)) {
      setError("Please provide a valid email.");
      return;
    }
  
    // Clear error and start loading
    setError("");
    setLoading(true);
  
    // Generate ticket ID and save it in the state
    const generatedTicketId = generateTicketId();
    setTicketId(generatedTicketId);
  
    if (formData.description === "") {
      formData.description = "No description provided";
    }

    // Prepare submission data
    const submissionData = {
      ticketId: generatedTicketId, // Include ticketId in the request data
      requestType: formData.requestType,
      contactInfo: formData.contactInfo,
      description: formData.description,
      priority: formData.priority,
    };
  
    try {
      await axios.post("https://rustyws.com/api/submit-request", submissionData);
  
      // Simulate delay before showing success message
      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, Math.random() * (6500 - 4000) + 4000); // 3-second delay
    } catch (error) {
      setLoading(false);
      setError("Error submitting request. Please try again.");
      console.error("Submission Error:", error.response || error.message || error);
    }
  };

  const handleClose = () => {
    // Reset state on close
    setFormData({
      requestType: "",
      contactInfo: "",
      description: "",
      priority: "Low", // Reset priority to default
    });
    setCharCount(500);
    setSuccess(false);
    setError("");
    setTicketId(""); // Reset ticket ID
    setIsCopied(false); // Reset copied state
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background Blur */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className={`text-rws-gray relative bg-white rounded-lg shadow-lg p-8 mx-4 z-10 max-w-[40dvw] w-full transform transition-all duration-500 ease-in-out ${animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
        {!success ? (
          <>
            <h2 className="text-4xl text-rws-dark-blue font-bold mb-4">
              {loading ? ("") : 
                <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-row justify-center items-center mx-auto">
                    <img src="/images/logos/RWSLogoBlue.png" alt="" className="w-20"></img>
                    <p>&nbsp;&nbsp;Rusty's Web Services</p>
                  </div>
                  <p className='text-sm text-rws-gray font-normal opacity-60'>* indicates required field</p>
                </div>
                
              }
            </h2>  
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
              <div className="w-full h-full flex justify-center items-center mb-4">
                <LoaderComponent />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Form Fields */}
                <div>
                  <label htmlFor="request-type" className="block text-gray-700">Request Type *</label>
                  <select id="request-type" name="requestType" value={formData.requestType} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1 " required>
                    <option value="">Request type...</option>
                    <option value="web-development-small">Web Development (Small)</option>
                    <option value="web-development-large">Web Development (Large)</option>
                    <option value="plugin-development">Plugin Development</option>
                    <option value="standalone-project">Standalone Project</option>
                    <option value="other">Other (Specify)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-gray-700">Priority *</label>
                  <select id="priority" name="priority" value={formData.priority} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1" required>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High (+£10)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-info" className="block text-gray-700">Contact Email Address *</label>
                  <input type="text" id="contact-info" name="contactInfo" value={formData.contactInfo} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1" placeholder="example@email.com" required />
                </div>

                <div>
                  <label htmlFor="description" className="block text-gray-700">Description</label>
                  <textarea maxLength="500" rows="5" id="description" name="description" value={formData.description} onChange={handleInputChange} className="w-full border border-gray-300 rounded-lg p-2 mt-1" placeholder="Something to describe your needs"></textarea>
                  <div className="text-right text-gray-500 text-sm">{charCount} characters remaining</div>
                </div>

                <div className="flex justify-end">
                  <button type="button" className="bg-rws-gray opacity-50 text-rws-smoke py-2 px-4 rounded-lg hover:bg-gray-500 transition-all duration-200 mr-4" onClick={handleClose}>Cancel</button>
                  <button type="submit" className="bg-rws-dark-blue text-rws-smoke py-2 px-4 rounded-lg hover:bg-rws-dark-blue-hover transition-all duration-200">Submit</button>
                </div>
              </form>
            )}
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Success!</h2>
            <p className="text-green-700 text-lg text-opacity-60 mb-2">
              Your request has been submitted successfully.
            </p>
            <p className="text-black text-md">
              Your ticket ID: <span className="font-bold text-rws-dark-blue">{ticketId}</span>
              {/* Copy Ticket ID Button */}
              <button
                onClick={handleCopyTicketId}
                className={`relative left-2 bottom-0.5 ${
                  isCopied ? 'opacity-80 cursor-not-allowed' : ''
                }`}
                disabled={isCopied}
              >
                {isCopied ? <img src="/images/logos/tick.png" alt="Copy" className="h-6 w-6 inline-block mr-2" /> : <img src="/images/logos/copy.png" alt="Copy" className="h-6 w-6 inline-block mr-2" />}
              </button>
              <br />
              If your details were correct, you will receive an Email within 24 hours confirming your request details. If you don't receive a confirmation in that time, contact us stating your issue and ticket ID.
            </p>

            {/* Close Button (Disabled until ticket ID is copied) */}
            <button
              onClick={handleClose}
              className={`mt-6 bg-green-700 text-rws-smoke py-2 px-4 rounded-lg hover:bg-green-800 ${
                isCopied ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isCopied}
            >
              Close
            </button>
            <p className="text-rws-gray text-sm mt-1.5">{isCopied ? '' : 'Click the copy button to copy your ticket ID'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormModal;
