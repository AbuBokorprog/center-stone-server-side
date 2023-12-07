const { Schema, model } = require("mongoose");

const blogsSchema = new Schema({
  title: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
  author: {
    type: "string",
    required: true,
  },
  description: {
    type: "string",
    required: true,
  },
  likes: {
    type: "number",
    default: 0,
  },
});

const blogs = new model("blogs", blogsSchema);
module.exports = blogs;
