const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { taskSchema } = require("./task");


const questionEESchema = new Schema({
  numero: {
    type: Number,
    require: true,
  },
  typeProduction: {
    type: String,
    enum: ["Paragraphe", "Courriel", "Lettre"],
    required: true,
  },
  tasks: {
    type: [taskSchema],
    require: true,
    validate: [
      (tasks) => tasks.length == 3,
      "expression ecrit requiet 3 taches",
    ],
  },
});

const QuestionEE = mongoose.model("QuestionEE", questionEESchema);
module.exports = {  QuestionEE, questionEESchema }; 