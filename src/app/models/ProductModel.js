const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  displayImage: {
    type: String,
    required: true,
    trim: true,
  },
  // bgImage: {
  //   //   type: String,
  //   //   required: true,
  //   //   trim: true,
  //   // },
  productContent: {
    type: String,
    required: true,
    trim: true,
  },
  publicId: {
    type: String,
    // required: true,
  },
});

// Create a model from the schema
const ProductModel =
  mongoose.models.ProductModel || mongoose.model("ProductModel", ProductSchema);
// Export the model
export default ProductModel;
