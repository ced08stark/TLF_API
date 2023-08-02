const {Test, testSchema} = require("./Test");
const { userSchema } = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serieSchema = new Schema({
  tests: {
    type: [testSchema],
    require: true,
  },
  user: {
    type: userSchema,
    require: true,
  },
  resultat: {
    type: Number,
    require: true,
  },
});


const Serie = mongoose.model("Serie", serieSchema);
module.exports = {Serie, serieSchema}
