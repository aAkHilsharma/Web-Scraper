const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  reviews_count: {
    type: Number,
  },
  ratings: {
    type: String,
  },
  media_count: {
    type: Number,
  },
});

module.exports = mongoose.model("products", productSchema);
