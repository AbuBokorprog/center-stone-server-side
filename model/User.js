const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: "string",
    require: true,
  },
  email: {
    type: "string",
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

const user = new model("user", userSchema);
module.exports = user;
