const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  emailID: {
    type: String,
    required: true,
    trim: true,
  },
  accNumber: {
    type: String,
    required: true,
    trim: true,
  },
  accType: {
    type: String,
    require: true,
    enum: ["Savings", "Current", "Basic Savings"],
    trim: true,
  },
  balance: {
    type: String,
    required: true,
    trim: true,
  },
});

const account = new mongoose.model("account", accountSchema);

module.exports = account;
