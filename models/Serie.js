const { Discipline, disciplineSchema } = require("./Discipline");
const { categorieSchema } = require("./Categorie");
const { questionSchema } = require("./Question");
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
    type: [ questionSchema ],
    require: false,
  },
});


const Serie = mongoose.model("Serie", serieSchema);
module.exports = {Serie, serieSchema}
