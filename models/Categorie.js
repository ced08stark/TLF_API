const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorieSchema = new Schema({
  libelle: {
    type: String,
    enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
    required: true,
  },
  point: {
    type: Number,
    require: true,
  },
});

const Categorie = mongoose.model("Categorie", categorieSchema);
module.exports = { categorieSchema, Categorie };
