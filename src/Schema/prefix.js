const { Schema, model } = require("mongoose");

const Prefix = new Schema({
  GuildId: String,
  Prefix: String,
});

module.exports = model("prefix", Prefix);
