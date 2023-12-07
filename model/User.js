const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: "string",
    require: true,
  },
  email: {
    type: "string",
    unique: true,
    require: true,
  },
  password: {
    type: "string",
    require: true,
  },
  image: {
    type: "string",
    require: true,
  },
});

const User = new model("user", userSchema);
module.exports = User;
