const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  numero: {
    type: Number,
    require: true,
    validate: [(numero) => numero > 80 && numero <100 ]
  },
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
  typeProduction: {
    type: String,
    enum: ["Paragraphe", "Courriel", "Lettre"],
    required: true,
  },
});

const Task = mongoose.model("Task", taskSchema);
module.exports = { Task, taskSchema };
