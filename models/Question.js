const {Discipline, disciplineSchema} = require('./Discipline')
const { categorieSchema } = require("./Categorie");
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
    type: categorieSchema,
    required: true,
  },
  duree: {
    type: Number,
    require: false,
  },
  discipline: {
    type: disciplineSchema,
    require: true,
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = {questionSchema, Question} 
