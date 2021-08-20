const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  nonce: { type: String },
  name: { type: String },
  dataInsert: { type: Date, default: Date.now() },
  dataUpdate: { type: Date },
});

module.exports = userSchema;
