const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  displayImage: {
    type: String,
    required: true,
    trim: true,
  },
  blogContent: {
    type: String,
    required: true,
    trim: true,
  },
  datetime: {
    type: String, // Change to Date type if storing date and time
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  authorImage: {
    type: String,
    required: true,
    trim: true,
  },
  publicId: {
    type: String,
    // required: true,
  },
  displayImageId: {
    type: String,
    // required: true,
  },
  authorImageId: {
    type: String,
    // required: true,
  },
});

// Create a model from the schema
const BlogModel =
  mongoose.models.BlogModel || mongoose.model("BlogModel", BlogSchema);
// Export the model
export default BlogModel;
