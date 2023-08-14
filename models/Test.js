const {serieSchema} = require("./Serie");
const { userSchema } = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  serie: {
    type: [serieSchema],
    require: true,
  },
  user: {
    type: userSchema,
    require: true,
  },
  payload: {
    type: String,
    require: false,
  },
  resultat: {
    type: Number,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


const Test = mongoose.model("Test", testSchema);
module.exports = {Test, testSchema};
