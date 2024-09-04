const mongoose = require("mongoose");

// Define the schema for reviews
const ReviewsSchema = new mongoose.Schema({
  blogId: { type: mongoose.Schema.Types.ObjectId, ref: "BlogModel" }, // Reference to the blog
  name: {
    type: String,
    required: true,
    trim: true,
  },
  review: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number, // Assuming rating is a number; change to String if necessary
    required: true,
    trim: true,
  },
  picture: {
    type: String, // Optional field for the picture URL or path
  },
});

// Create or use the existing model
const ReviewsModel =
  mongoose.models.ReviewsModel || mongoose.model("ReviewsModel", ReviewsSchema);

// Export the model
export default ReviewsModel;
