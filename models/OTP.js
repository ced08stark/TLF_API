const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  otp: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    require: true,
  },
  expiresAt: {
    type: Date,
    require: true,
  },
});

const OTP = mongoose.model("OTP", otpSchema);
module.exports = { otpSchema, OTP };
