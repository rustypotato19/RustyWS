import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ReactStars from "react-stars";
import { motion, useInView } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper as SwiperInstance } from "swiper/types"; // Import Swiper type

interface Review {
  review_id: number;
  username: string;
  rating: number;
  review_message: string;
  created_at: string;
}

const MAX_CHAR_COUNT = 200;

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({
    username: "",
    rating: 0,
    review_message: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [charRemaining, setCharRemaining] = useState<number>(MAX_CHAR_COUNT);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const isSmall = window.innerWidth < window.innerHeight;

  // Create a reference for the form element
  const formRef = useRef<HTMLFormElement | null>(null);

  // Check if the form is in view using useInView from framer-motion
  const inView = useInView(formRef, { once: true, margin: "0px 0px -20% 0px" });

  // Fetch existing reviews on load
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://rustyws.com/api/reviews");
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update the remaining characters count if the review message is being updated
    if (name === "review_message") {
      setCharRemaining(MAX_CHAR_COUNT - value.length);
    }

    setNewReview({ ...newReview, [name]: value });
  };

  // Handle rating change
  const handleRatingChange = (newRating: number) => {
    setNewReview({ ...newReview, rating: newRating });
  };

  // Handle review submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      setError("Please provide a rating.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false); // Reset the success state

    const submissionData = {
      username: newReview.username.trim() || "Anonymous",
      rating: newReview.rating,
      review_message: newReview.review_message,
    };

    // Simulate delay of 2-3 seconds
    const fakeDelay = Math.floor(Math.random() * 1000) + 2000;

    setTimeout(async () => {
      try {
        await axios.post("https://rustyws.com/api/add-review", submissionData);
        setNewReview({ username: "", rating: 0, review_message: "" });
        setError("");
        setSuccess(true); // Indicate successful submission
        setTimeout(() => setSuccess(false), 3000); // Reset success message after 3 seconds
        setCharRemaining(MAX_CHAR_COUNT); // Reset character counter
        // Re-fetch reviews after submission
        const response = await axios.get("https://rustyws.com/api/reviews");
        setReviews(response.data);
      } catch (err) {
        console.error("Error adding review:", err);
        setError("Error submitting review. Please try again.");
      } finally {
        setLoading(false);
      }
    }, fakeDelay);
  };

  return (
    <div className="w-screen text-white px-10 py-12 flex flex-col items-center">
      <motion.h2
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        User Reviews
      </motion.h2>

      {/* Review Submission Form */}
      <motion.form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-neutral-900 p-6 rounded-lg border-2 border-green-700 shadow-lg mb-12"
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeInOut", delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold mb-4">Add a Review</h3>
        <div className="mb-4">
          <input
            type="text"
            name="username"
            value={newReview.username}
            onChange={handleInputChange}
            placeholder="Your name (optional)"
            className="w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-green-800"
          />
        </div>
        <div className="mb-4">
          <ReactStars
            count={5}
            value={newReview.rating}
            onChange={handleRatingChange}
            size={30}
            color2={"#15803d"}
          />
        </div>
        <div className="mb-4">
          <textarea
            name="review_message"
            value={newReview.review_message}
            onChange={handleInputChange}
            placeholder="Write your review here"
            className="no-scroll w-full px-3 py-2 rounded-md bg-gray-700 text-white border border-green-800"
            rows={4}
            maxLength={MAX_CHAR_COUNT}
          ></textarea>
          <p className="text-gray-500 text-sm mt-1">
            Characters remaining: {charRemaining}
          </p>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          type="submit"
          className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-2 rounded-md"
          disabled={loading}
        >
          {loading
            ? "Submitting..."
            : success
            ? "Review Submitted!"
            : "Submit Review"}
        </button>
      </motion.form>

      {isSmall && (
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-neutral-500 opacity-55 transition-transform duration-300"
        >
          * Hint:
          {!isFocused
            ? " Click the reviews to pause"
            : "  Click away to unpause"}
        </motion.p>
      )}

      {/* Reviews Carousel */}
      <div className="w-full max-w-[70vw]">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          onSwiper={(swiper: SwiperInstance) => {
            if (swiper && swiper.autoplay) {
              swiper.autoplay.start(); // Start autoplay manually when swiper instance is ready

              swiper.el.addEventListener("mouseenter", () => {
                if (swiper.autoplay) swiper.autoplay.stop();
                setIsFocused(true);
              });
              swiper.el.addEventListener("mouseleave", () => {
                if (swiper.autoplay) swiper.autoplay.start();
                setIsFocused(false);
              });
            }
          }}
        >
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <SwiperSlide key={review.review_id} className="p-4">
                <div className="hover:scale-105 transition-all duration-300">
                  <motion.div
                    className="bg-neutral-900 border-2 border-green-800 rounded-lg p-6 shadow-md text-center h-[300px] flex flex-col justify-between items-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-xs text-gray-500">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                    <h4 className="text-xl font-semibold mb-2">
                      {review.username}
                    </h4>
                    <div
                      className={`about-scroll text-gray-300 
                      ${
                        review.review_message.length > 50
                          ? review.review_message.length > 100
                            ? review.review_message.length > 150
                              ? "text-[0.75rem] sm:text-xs"
                              : "text-sm sm:text-base"
                            : "text-base sm:text-lg"
                          : "text-lg sm:text-xl"
                      } 
                      overflow-hidden border-2 border-green-800 border-opacity-55 rounded-sm text-ellipsis overflow-y-auto h-[120px] p-2 mb-2 w-full text-pretty whitespace-pre-wrap break-words`}
                    >
                      {review.review_message}
                    </div>
                    <div className="sm:mb-2">
                      <ReactStars
                        count={5}
                        value={review.rating}
                        edit={false}
                        size={35}
                        color2={"#ffd700"}
                      />
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No reviews yet. Be the first to leave one!
            </p>
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default Reviews;
