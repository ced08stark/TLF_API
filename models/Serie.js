const { Discipline, disciplineSchema } = require("./Discipline");
const { categorieSchema } = require("./Categorie");
const { questionSchema } = require("./Question");
const { questionEESchema } = require("./QuestionEE");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serieSchema = new Schema({
  libelle: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  questions: {
    type: [questionSchema],
    require: false,
  },
  eeQuestions: {
    type: [questionEESchema],
    require: false,
  },
  /*questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],*/
});


const Serie = mongoose.model("Serie", serieSchema);
module.exports = {Serie, serieSchema}
