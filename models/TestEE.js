const { serieSchema, Serie } = require("./Serie");
const { userSchema, User } = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  serie: { type: Schema.Types.ObjectId, ref: "Serie", require: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
    default: Date.now,
  },
});

const Test = mongoose.model("Test", testSchema);
module.exports = { Test, testSchema };
