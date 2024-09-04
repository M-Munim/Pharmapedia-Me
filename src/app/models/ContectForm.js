// Import mongoose
const mongoose = require("mongoose");

// Define the user schema
const ContectFormSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
  },
  message: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
});



const ContectForm = mongoose.models.ContectForm || mongoose.model("ContectForm", ContectFormSchema);

export default ContectForm;

