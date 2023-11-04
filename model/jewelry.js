const { Schema, model } = require("mongoose");

const JewelrySchema = new Schema({
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

const jewelry = new model("jewelry", JewelrySchema);
module.exports = jewelry;
