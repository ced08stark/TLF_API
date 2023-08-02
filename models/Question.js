const {Discipline, disciplineSchema} = require('./Discipline')
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  libelle: {
    type: String,
    require: true,
  },
  consigne: {
    type: String,
    require: true,
  },
  suggestions: {
    type: [
      {
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true },
      },
    ],
    validate: [
      (suggestions) => suggestions.length == 2 || suggestions.length == 4,
      "La liste des suggestions doit contenir 2 ou 4 éléments.",
    ],
    required: true,
  },
  categorie: {
    type: String,
    enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    required: true,
  },
  duree: {
    type: Number,
    require: true,
  },
  discipline: {
    type: disciplineSchema,
    require: true,
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = {questionSchema, Question} 
