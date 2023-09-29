const { serieSchema, Serie } = require("./Serie");
const { userSchema, User } = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testEOSchema = new Schema({
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
        createdAt: { type: Date, default: Date.now },
      },
    ],
    require: false,
  },
  status: {
    type: String,
    require: true,
    enum: ["en cours", "terminer"],
  },
  isView: {
    type: Boolean,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TestEO = mongoose.model("TestEO", testEOSchema);
module.exports = { TestEO, testEOSchema };
