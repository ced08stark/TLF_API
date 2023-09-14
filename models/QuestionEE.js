const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const questionEESchema = new Schema({
  numero: {
    type: Number,
    require: true,
  },
  consigne: {
    type: String,
    require: true,
  },
  images: {
    type: [String],
    require: true,
  },
  typeProduction: {
    type: String,
    enum: ["Paragraphe", "Courriel", "Lettre"],
    required: true,
  },
});

const QuestionEE = mongoose.model("QuestionEE", questionEESchema);
module.exports = { questionEESchema, QuestionEE }; 