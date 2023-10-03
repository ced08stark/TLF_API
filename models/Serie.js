const { Discipline, disciplineSchema } = require("./Discipline");
const { categorieSchema } = require("./Categorie");
const { questionSchema } = require("./Question");
const { questionEESchema } = require("./QuestionEE");
const { questionEOSchema } = require("./QuestionEO");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serieSchema = new Schema({
  libelle: {
    type: String,
    require: true,
    index: true,
    unique: true,
  },
  eeQuestions: [{ type: Schema.Types.ObjectId, ref: "QuestionEE", require: false }],
  eoQuestions: [{ type: Schema.Types.ObjectId, ref: "QuestionEO", require: false }],
  questions: [{ type: Schema.Types.ObjectId, ref: "Question", require: false }]
});


const Serie = mongoose.model("Serie", serieSchema);
module.exports = {Serie, serieSchema}
