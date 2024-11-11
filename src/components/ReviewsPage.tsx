import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactStars from "react-stars";
import { motion } from "framer-motion";

interface Review {
  review_id: number;
  username: string;
  rating: number;
  review_message: string;
  created_at: string;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [minRating, setMinRating] = useState(2);
  const [maxRating, setMaxRating] = useState(5);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const reviewsPerPage = 20;
  const isSmall = window.innerWidth < window.innerHeight;

  // Fetch all reviews on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("https://rustyws.com/api/reviews");
        setReviews(response.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Filter, sort, and paginate reviews
  useEffect(() => {
    const filteredReviews = reviews
      .filter(
        (review) => review.rating >= minRating && review.rating <= maxRating
      )
      .sort((a, b) =>
        sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating
      );

    setDisplayedReviews(filteredReviews.slice(0, page * reviewsPerPage));
  }, [reviews, minRating, maxRating, sortOrder, page]);

  // Handle rating range change
  const handleRatingChange = (newMinRating: number, newMaxRating: number) => {
    if (newMinRating > maxRating) {
      setMinRating(newMinRating);
      setMaxRating(newMinRating);
    } else if (newMaxRating < minRating) {
      setMaxRating(newMaxRating);
      setMinRating(newMaxRating);
    } else {
      setMinRating(newMinRating);
      setMaxRating(newMaxRating);
    }
    setPage(1); // Reset to first page on filter change
  };

  return (
    <div className="w-screen min-h-screen flex flex-col items-center px-6 py-10 bg-neutral-900 text-white">
      <h1 className="text-green-700 text-3xl font-bold mb-8 mt-16 sm:mt-24">
        All Reviews
      </h1>

      {/* Filter and Sort Controls */}
      <div className="w-full max-w-[95vw] md:max-w-[60vw] mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Filter Range:</span>
          <div className="flex gap-2">
            <ReactStars
              count={5}
              value={minRating}
              onChange={(newRating) => handleRatingChange(newRating, maxRating)}
              size={isSmall ? 20 : 30}
              color2={"#ffd700"}
            />
            <span className="text-gray-400 relative top-1 md:top-3">to</span>
            <ReactStars
              count={5}
              value={maxRating}
              onChange={(newRating) => handleRatingChange(minRating, newRating)}
              size={isSmall ? 20 : 30}
              color2={"#ffd700"}
            />
          </div>
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="text-green-700 font-semibold hover:underline"
        >
          Sort by Rating: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading reviews...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="w-full max-w-[95vw] md:max-w-[60vw] min-h-[10vh] h-fit space-y-4 md:space-y-6">
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review, index) => (
              <motion.div
                key={review.review_id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-neutral-800 p-3 md:p-6 rounded-lg border border-green-800 shadow-md"
              >
                <div className="flex flex-row w-full justify-between items-center">
                  <div className="flex flex-row gap-2 md:flex-col w-fit justify-between items-start mb-4 border-b-[1px] border-green-800 md:pb-4">
                    <h4 className="text-base md:text-xl font-semibold text-white mb-2 md:mb-0">
                      {review.username || "Anonymous"}
                    </h4>
                    <span className="text-xs text-gray-400 relative top-1 md:top-0">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="mb-4">
                    <ReactStars
                      count={5}
                      value={review.rating}
                      edit={false}
                      size={isSmall ? 20 : 30}
                      color2={"#ffd700"}
                    />
                  </div>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap text-sm md:text-base">
                  {review.review_message}
                </p>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No reviews available in this range. Try adjusting the filter.
            </p>
          )}
          {/* Load More Button */}
          {displayedReviews.length < reviews.length && (
            <button
              onClick={() => setPage(page + 1)}
              className="w-full text-center text-green-700 mt-8 font-bold text-lg hover:underline underline-offset-2"
            >
              Load More Reviews
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewsPage;
