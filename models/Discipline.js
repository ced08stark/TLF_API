const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const disciplineSchema = new Schema({
  libelle: {
    type: String,
    require: true,
  },
  duree: {
    type: Number,
    require: true,
  },
});

const Discipline = mongoose.model("Discipline", disciplineSchema);
module.exports = {disciplineSchema, Discipline}
