const { Schema, model } = require("mongoose");

const Economy = new Schema({
  UserId: String,
  Wallet: {
    type: Number,
    default: 0,
  },
  // cooldown
  Daily: {
    type: Date,
    default: 0,
  },
  Work: {
    type: Date,
    default: 0,
  },
});

module.exports = model("economy", Economy);
