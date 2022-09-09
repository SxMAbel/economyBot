const { Schema, model } = require("mongoose");

const SignUp = new Schema({
  UserId: String,
  UserObject: Object,
});

module.exports = model("signup", SignUp);
