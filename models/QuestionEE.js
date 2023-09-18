const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { taskSchema } = require("./Task");


const questionEESchema = new Schema({
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