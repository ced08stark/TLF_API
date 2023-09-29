const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { taskEOSchema } = require("./TaskEO");

const questionEOSchema = new Schema({
  tasks: {
    type: [taskEOSchema],
    require: true,
    validate: [
      (tasks) => tasks.length == 3,
      "expression oral requiet 3 taches",
    ],
  },
});

const QuestionEO = mongoose.model("QuestionEO", questionEOSchema);
module.exports = { QuestionEO, questionEOSchema };
