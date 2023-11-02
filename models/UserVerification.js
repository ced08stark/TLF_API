const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  uniqueString: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    require: true
  },
});

const UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);
module.exports = { UserVerification, userVerificationSchema };
