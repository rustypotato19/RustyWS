import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import ReactStars from "react-stars";

interface Request {
  ticket_id: string;
  contact_info: string;
  request_type: string;
  priority: string;
  request_date: string;
  status: string;
  contacted: boolean;
  description: string;
}
interface Review {
  review_id: number;
  username: string;
  rating: number;
  review_message: string;
  created_at: string;
}

const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [modalRequest, setModalRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [view, setView] = useState<string>("requests"); // Toggle between requests and reviews
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/adminlogin");
    } else {
      // Fetch Requests
      axios
        .get("https://rustyws.com/api/admin/requests", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setRequests(res.data);
        })
        .catch((err) => {
          if (
            err.response &&
            (err.response.status === 401 || err.response.status === 403)
          ) {
            navigate("/adminlogin");
          } else {
            setError("Error fetching requests.");
            console.error(err);
          }
        });

      // Fetch Reviews
      axios
        .get("https://rustyws.com/api/admin/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setReviews(res.data);
        })
        .catch((err) => {
          setError("Error fetching reviews.");
          console.error(err);
        });
    }
  }, [navigate]);

  const handleReviewAction = async (
    reviewId: number,
    action: "delete" | "update",
    reviewData?: Review
  ) => {
    try {
      const token = localStorage.getItem("token");
      if (action === "delete") {
        await axios.put(
          `https://rustyws.com/api/admin/reviews/${reviewId}`,
          { action },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReviews(reviews.filter((review) => review.review_id !== reviewId));
      } else if (action === "update" && reviewData) {
        await axios.put(
          `https://rustyws.com/api/admin/reviews/${reviewId}`,
          {
            action,
            username: reviewData.username,
            rating: reviewData.rating,
            review_message: reviewData.review_message,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setReviews((prev) =>
          prev.map((review) =>
            review.review_id === reviewData.review_id ? reviewData : review
          )
        );
        closeReviewEditor();
      }
    } catch (err) {
      setError(`Error performing ${action} action on review.`);
    }
  };

  const openReviewEditor = (review: Review) => {
    setEditReview(review);
  };

  const closeReviewEditor = () => {
    setEditReview(null);
  };

  const handleReviewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editReview) {
      setEditReview({ ...editReview, [e.target.name]: e.target.value });
    }
  };

  const handleRatingChange = (newRating: number) => {
    if (editReview) {
      setEditReview({ ...editReview, rating: newRating });
    }
  };

  const saveReviewChanges = async () => {
    if (!editReview) return;

    handleReviewAction(editReview.review_id, "update", editReview);
  };

  const deleteReview = (reviewId: number) => {
    handleReviewAction(reviewId, "delete");
  };

  const updateStatus = async (ticketId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://rustyws.com/api/admin/requests/${ticketId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.ticket_id === ticketId ? { ...req, status: newStatus } : req
        )
      );
    } catch (err) {
      setError("Error updating status.");
    }
  };

  const updateContacted = async (
    ticketId: string,
    contactedStatus: boolean
  ) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://rustyws.com/api/admin/requests/${ticketId}/contacted`,
        { contacted: contactedStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.ticket_id === ticketId
            ? { ...req, contacted: contactedStatus }
            : req
        )
      );
    } catch (err) {
      setError("Error updating contacted status.");
    }
  };

  const deleteEntry = async (ticketId: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://rustyws.com/api/admin/requests/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRequests(requests.filter((req) => req.ticket_id !== ticketId));
    } catch (err) {
      setError("Error deleting entry.");
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortBy(value);

    const sortedRequests = [...requests].sort((a, b) => {
      if (value === "date_asc") {
        return (
          new Date(a.request_date).getTime() -
          new Date(b.request_date).getTime()
        );
      } else if (value === "date_desc") {
        return (
          new Date(b.request_date).getTime() -
          new Date(a.request_date).getTime()
        );
      } else if (value === "priority") {
        return a.priority.localeCompare(b.priority);
      } else if (value === "status") {
        return a.status.localeCompare(b.status);
      } else if (value === "request_type") {
        return a.request_type.localeCompare(b.request_type);
      } else {
        return 0; // Default to no sorting
      }
    });

    setRequests(sortedRequests);
  };

  const openModal = (request: Request) => {
    setModalRequest(request);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalRequest(null);
  };

  const filteredRequests = Array.isArray(requests)
    ? requests.filter(
        (request) =>
          request.contact_info.toLowerCase().includes(filter.toLowerCase()) ||
          request.status.toLowerCase().includes(filter.toLowerCase()) ||
          request.request_type.toLowerCase().includes(filter.toLowerCase()) ||
          request.ticket_id.toLowerCase().includes(filter.toLowerCase()) ||
          request.priority.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">
        Admin Dashboard
      </h1>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {/* Toggle Buttons to switch views */}
      <div className="w-full flex justify-center items-center gap-4 mb-6 mx-auto">
        <button
          className={`px-4 py-2 rounded ${
            view === "requests"
              ? "bg-green-700 text-white"
              : "bg-gray-700 text-gray-300"
          }`}
          onClick={() => setView("requests")}
        >
          View Requests
        </button>
        <button
          className={`px-4 py-2 rounded ${
            view === "reviews"
              ? "bg-green-700 text-white"
              : "bg-zinc-700 text-gray-300"
          }`}
          onClick={() => setView("reviews")}
        >
          View Reviews
        </button>
      </div>

      {/* Conditionally Render Reviews or Requests */}
      {view === "reviews" && (
        <>
          <div className="flex flex-col justify-center items-center mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-green-600">
              User Reviews
            </h2>
            <table className="max-w-screen w-[80vw] bg-neutral-800 text-white rounded-lg shadow-lg mb-8 text-left">
              <thead>
                <tr className="bg-neutral-900">
                  <th className="py-3 px-4 border-b">Review ID</th>
                  <th className="py-3 px-4 border-b">Username</th>
                  <th className="py-3 px-4 border-b">Rating</th>
                  <th className="py-3 px-4 border-b">Review Message</th>
                  <th className="py-3 px-4 border-b">Date</th>
                  <th className="py-3 px-4 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-left py-4">
                      No reviews found
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr
                      key={review.review_id}
                      className="text-left hover:bg-neutral-700 bg-neutral-800"
                    >
                      <td className="py-2 px-3 border-b min-w-fit">{review.review_id}</td>
                      <td className="py-2 px-3 border-b min-w-fit">{review.username}</td>
                      <td className="py-2 px-3 border-b min-w-fit">
                        <ReactStars
                          count={5}
                          value={review.rating}
                          edit={false}
                          size={20}
                          color2={"#ffd700"}
                        />
                      </td>
                      <td className="py-2 px-3 border-b max-w-[60vw] text-pretty">
                        {review.review_message.replace(/\n/g, " ")}
                      </td>
                      <td className="py-2 px-3 border-b">
                        {new Date(review.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-3 border-b min-w-fit text-center">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => openReviewEditor(review)}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700 ml-12"
                          onClick={() => deleteReview(review.review_id)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Edit Review Modal */}
          {editReview && (
            <div className="w-full flex justify-center items-center">
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-neutral-700 text-white p-6 rounded-xl border-4 border-green-700 shadow-md max-w-3xl w-full max-h-[80vh] overflow-auto">
                  <h2 className="text-xl font-bold mb-4">Edit Review</h2>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Username</label>
                    <input
                      type="text"
                      name="username"
                      value={editReview.username}
                      onChange={handleReviewChange}
                      className="w-full p-2 rounded bg-neutral-800 border border-green-700"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">Rating</label>
                    <ReactStars
                      count={5}
                      value={editReview.rating}
                      onChange={handleRatingChange}
                      size={30}
                      color2={"#ffd700"}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block font-semibold mb-2">
                      Review Message
                    </label>
                    <textarea
                      name="review_message"
                      value={editReview.review_message}
                      onChange={handleReviewChange}
                      rows={4}
                      className="w-full p-2 rounded bg-neutral-800 border border-green-700"
                    ></textarea>
                  </div>
                  <button
                    className="bg-green-700 text-white px-4 py-2 mt-4 rounded mr-2"
                    onClick={saveReviewChanges}
                  >
                    Save Changes
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                    onClick={closeReviewEditor}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {view === "requests" && (
        <>
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Requests
          </h2>

          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <input
              type="text"
              placeholder="Filter by contact, status, request type, priority, or ticket ID..."
              value={filter}
              onChange={handleFilter}
              className="mb-4 md:mb-0 p-2 border-4 border-green-700 bg-neutral-900 placeholder:text-neutral-200 rounded-lg w-full md:w-1/2"
            />
            <select
              onChange={handleSort}
              value={sortBy}
              className="p-2 border-4 border-green-700 text-neutral-200 bg-neutral-900 rounded-lg ml-2 w-full md:w-auto"
            >
              <option value="">Sort By...</option>
              <option value="date_asc">Date: Oldest to Newest</option>
              <option value="date_desc">Date: Newest to Oldest</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
              <option value="request_type">Request Type</option>
            </select>
          </div>

          <table className="w-full bg-neutral-800 text-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-neutral-900">
                <th className="py-3 px-4 border-b">Ticket ID</th>
                <th className="py-3 px-4 border-b">Contact Info</th>
                <th className="py-3 px-4 border-b">Request Type</th>
                <th className="py-3 px-4 border-b">Priority</th>
                <th className="py-3 px-4 border-b">Date</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Contacted</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4">
                    No requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request, index) => (
                  <tr
                    key={request.ticket_id}
                    className={`text-center hover:bg-neutral-700 ${
                      index % 2 === 0 ? "bg-neutral-800" : "bg-neutral-700"
                    }`}
                  >
                    <td
                      className="py-2 px-3 border-b cursor-pointer"
                      onClick={() => openModal(request)}
                    >
                      {request.ticket_id}
                    </td>
                    <td className="py-2 px-3 border-b">
                      {request.contact_info}
                    </td>
                    <td className="py-2 px-3 border-b">
                      {request.request_type}
                    </td>
                    <td className="py-2 px-3 border-b">{request.priority}</td>
                    <td className="py-2 px-3 border-b">
                      {new Date(request.request_date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-3 border-b">{request.status}</td>
                    <td className="py-2 px-3 border-b">
                      {request.contacted ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-4 border-b">
                      <select
                        className="p-2 rounded bg-neutral-900 text-white font-bold"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "started")
                            updateStatus(request.ticket_id, "in_progress");
                          else if (value === "finished")
                            updateStatus(request.ticket_id, "finished");
                          else if (value === "contacted")
                            updateContacted(request.ticket_id, true);
                        }}
                      >
                        <option value="">Action..</option>
                        <option value="started">Started</option>
                        <option value="finished">Finished</option>
                        <option value="contacted">Contacted</option>
                      </select>
                      <button
                        className="text-red-500 hover:text-red-700 ml-4"
                        onClick={() => deleteEntry(request.ticket_id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {isModalOpen && modalRequest && (
            <div className="w-full flex justify-center items-center">
              <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-neutral-700 text-white p-6 rounded-xl border-4 border-green-700 shadow-md max-w-3xl w-full max-h-[80vh] overflow-auto">
                  <h2 className="text-xl font-bold mb-4">Request Details</h2>
                  <p>
                    <strong>Ticket ID:</strong> {modalRequest.ticket_id}
                  </p>
                  <p>
                    <strong>Contact Info:</strong> {modalRequest.contact_info}
                  </p>
                  <p>
                    <strong>Request Type:</strong> {modalRequest.request_type}
                  </p>
                  <p>
                    <strong>Priority:</strong> {modalRequest.priority}
                  </p>
                  <p>
                    <strong>Description:</strong>
                  </p>
                  <div className="bg-neutral-800 border-2 border-green-700 p-4 rounded-lg my-4 overflow-auto max-h-[30vh] break-words">
                    {modalRequest.description}
                  </div>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(modalRequest.request_date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {modalRequest.status}
                  </p>
                  <p>
                    <strong>Contacted:</strong>{" "}
                    {modalRequest.contacted ? "Yes" : "No"}
                  </p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 mt-4 rounded"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
