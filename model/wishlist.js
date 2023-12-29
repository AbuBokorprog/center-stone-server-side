const { Schema, model } = require("mongoose");

const wishlistSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
  cost: {
    required: true,
    type: "string",
  },
  selling_number: {
    type: "number",
    default: 0,
  },
  Name: {
    type: "string",
    required: true,
  },
});

const wishlist = new model("wishlist", wishlistSchema);
module.exports = wishlist;
