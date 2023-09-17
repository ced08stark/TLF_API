const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  libelle: {
    type: String,
    require: true,
  },
  consigne: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
    require: false,
  },
  minWord: {
    type: Number,
    require: true,
  },
  maxWord: {
    type: Number,
    require: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = { Task, taskSchema };
