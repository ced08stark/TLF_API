const { serieSchema, Serie } = require("./Serie");
const { userSchema, User } = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testEESchema = new Schema({
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
    type: [
      {
        task: { type: String, required: true },
        note: { type: Number, required: true },
      },
    ],
    require: false,
  },
  status: {
    type: String,
    require: true,
    enum: ["en cours", "terminer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TestEE = mongoose.model("TestEE", testEESchema);
module.exports = { TestEE, testEESchema };
