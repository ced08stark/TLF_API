const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
  pays: {
    type: String,
    require: true,
    default: 'Cameroun'
  },
  remain: {
    type: Date,
    require: false,
  },
  userToken: {
    type: String,
    require: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verified: {
    type: Boolean,
    default: false
  }
});


const User = mongoose.model("User", userSchema);
module.exports = {User, userSchema}