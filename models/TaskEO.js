const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskEOSchema = new Schema({
  numero: {
    type: Number,
    require: true,
    validate: [(numero) => numero > 81 && numero < 84],
  },
  libelle: {
    type: String,
    require: true,
  },
  consigne: {
    type: String,
    require: true,
  },
  fichier: {
    type: String,
    require: false,
  },
  duree: {
    type: Number,
    require: true,
  }
});

const TaskEO = mongoose.model("TaskEO", taskEOSchema);
module.exports = { TaskEO, taskEOSchema };
