const { Schema, model } = require("mongoose");

const AddCartSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  cost: {
    required: true,
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
});

const AddCart = new model("AddCart", AddCartSchema);

module.exports = AddCart;
