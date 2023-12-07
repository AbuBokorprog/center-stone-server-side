const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  displayName: {
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
  photoURL: {
    type: "string",
    require: true,
  },
});

const User = new model("user", userSchema);
module.exports = User;
