import { useEffect, useState } from "react";
import { RateReview, Star, Close } from "@mui/icons-material";
import {
  Button,
  Rating,
  LinearProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { useParams } from "react-router";
import {
  useAppDispatch,
  useAppSelectore,
} from "../../../../Redux Toolkit/store";
import { createReview, fetchReviewsByProduct } from "../../../../Redux Toolkit/Review/reviewSlice";


const ReviewSection = () => {
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    title: "",
    comment: "",
  });

  const dispatch = useAppDispatch();
  const { productId } = useParams();
  const { reviews, loading } = useAppSelectore((store) => store.review);

  // 1. Fetch Reviews when Component Loads
  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsByProduct(productId));
    }
  }, [dispatch, productId]);

  // 2. Handle Submit
  const handleSubmitReview = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      alert("Please login to write a review");
      return;
    }

    if (productId) {
      dispatch(
        createReview({
          productId: productId,
          reviewText: reviewForm.comment,
          rating: reviewForm.rating,
          jwt: jwt,
        })
      );
    }

    setOpenReviewModal(false);
    setReviewForm({ rating: 0, title: "", comment: "" });
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <section className="mb-20">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-1 h-8 bg-[#00927C] rounded-full"></div>
        <h1 className="text-2xl font-bold text-gray-800">Ratings & Reviews</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Left: Rating Summary Dashboard (Sticky Position for better UX) */}
        <div>
          <div className="bg-gray-50 p-4 sm:p-6 rounded-2xl border border-gray-100 h-fit sticky top-24">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-6">
              <div className="text-center w-full sm:w-auto">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-800">4.5</h2>
                <div className="flex justify-center my-1 text-[#00927C] text-lg sm:text-2xl">
                  <Star fontSize="small" /> <Star fontSize="small" /> <Star fontSize="small" /> <Star fontSize="small" />
                  <Star className="text-gray-300" fontSize="small" />
                </div>
                <p className="text-xs text-gray-500 font-medium">
                  {reviews.length} Ratings
                </p>
              </div>
              <div className="hidden sm:block h-16 w-px bg-gray-300 mx-2"></div>
              <div className="w-full sm:flex-1">
                <Button
                  variant="contained"
                  startIcon={<RateReview />}
                  fullWidth
                  size="small"
                  onClick={() => setOpenReviewModal(true)}
                  sx={{
                    bgcolor: "#00927C",
                    textTransform: "none",
                    fontWeight: "bold",
                    boxShadow: "none",
                    "&:hover": { bgcolor: "#007a68", boxShadow: "none" },
                  }}
                >
                  Write a Review
                </Button>
              </div>
            </div>

            {/* Static Progress Bars */}
            <div className="space-y-2 sm:space-y-3">
              {[
                { star: 5, value: 70 },
                { star: 4, value: 20 },
                { star: 3, value: 5 },
                { star: 2, value: 3 },
                { star: 1, value: 2 },
              ].map((row) => (
                <div
                  key={row.star}
                  className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600"
                >
                  <span className="font-bold w-3">{row.star}</span>
                  <Star sx={{ fontSize: { xs: 12, sm: 14 } }} className="text-gray-400" />
                  <LinearProgress
                    variant="determinate"
                    value={row.value}
                    className="flex-1 rounded-full h-2"
                    sx={{
                      bgcolor: "#e5e7eb",
                      "& .MuiLinearProgress-bar": {
                        bgcolor:
                          row.star >= 4
                            ? "#00927C"
                            : row.star === 3
                            ? "#FBBF24"
                            : "#EF4444",
                      },
                    }}
                  />
                  <span className="text-xs w-8 text-right">{row.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Review List (SCROLLABLE NOW) */}
        <div>
          {/* Main Change Here: Added responsive styling for scroll */}
          <div className="space-y-4 sm:space-y-6 h-[300px] sm:h-[400px] md:h-[500px] overflow-y-auto pr-2 sm:pr-4 custom-scrollbar">
            {loading ? (
              <div className="flex justify-center p-10">
                <CircularProgress sx={{ color: "#00927C" }} />
              </div>
            ) : reviews.length > 0 ? (
              reviews.map((review: any) => (
                <div
                  key={review._id}
                  className="border-b border-gray-100 pb-4 sm:pb-6 last:border-0 hover:bg-gray-50 p-3 sm:p-4 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-2 sm:gap-3 mb-2">
                    <Avatar
                      sx={{
                        width: { xs: 28, sm: 32 },
                        height: { xs: 28, sm: 32 },
                        bgcolor: "#00927C",
                        fontSize: { xs: 12, sm: 14 },
                      }}
                      src={review.user?.profilePicture}
                    >
                      {review.user?.fullName?.[0]?.toUpperCase()}
                    </Avatar>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {review.user?.fullName}
                      </p>
                      <div className="flex items-center gap-2">
                        <Rating
                          value={review.rating}
                          readOnly
                          size="small"
                          sx={{ color: "#FBBF24" }}
                        />
                        <span className="text-xs text-gray-400">
                          {formatDate(review.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed ml-11">
                    {review.reviewText}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <RateReview sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                <p className="italic">
                  No reviews yet. Be the first to review!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- WRITE REVIEW MODAL (Unchanged) --- */}
      <Dialog
        open={openReviewModal}
        onClose={() => setOpenReviewModal(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3, p: 1 } }}
      >
        <DialogTitle className="flex justify-between items-center">
          <Typography variant="h6" fontWeight="bold">
            Write a Review
          </Typography>
          <IconButton onClick={() => setOpenReviewModal(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <div className="space-y-4 pt-2">
            <div className="flex flex-col items-center py-4 bg-gray-50 rounded-xl">
              <Typography className="mb-2 text-gray-500 font-medium">
                Rate this product
              </Typography>
              <Rating
                name="simple-controlled"
                value={reviewForm.rating}
                onChange={(_event, newValue) => {
                  setReviewForm({ ...reviewForm, rating: newValue || 0 });
                }}
                size="large"
                sx={{ color: "#00927C", fontSize: "3rem" }}
              />
            </div>

            <TextField
              label="Review Title (Optional)"
              fullWidth
              variant="outlined"
              placeholder="e.g., Nice product"
              value={reviewForm.title}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, title: e.target.value })
              }
            />

            <TextField
              label="Your Review"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              placeholder="Tell us what you liked or disliked about this product..."
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, comment: e.target.value })
              }
            />
          </div>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button
            onClick={() => setOpenReviewModal(false)}
            sx={{ color: "gray" }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitReview}
            disabled={loading || reviewForm.rating === 0}
            sx={{
              bgcolor: "#00927C",
              fontWeight: "bold",
              "&:hover": { bgcolor: "#007a68" },
              "&:disabled": { bgcolor: "#e5e7eb", color: "#9ca3af" },
            }}
          >
            {loading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "Submit Review"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- CSS FOR NICE SCROLLBAR --- */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #00927C;
        }
      `}</style>
    </section>
  );
};

export default ReviewSection;

