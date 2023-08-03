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
  },
  remain: {
    type: Date,
    require: false,
  },
});


const User = mongoose.model("User", userSchema);
module.exports = {User, userSchema}