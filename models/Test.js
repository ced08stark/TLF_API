const {serieSchema} = require("./Serie");
const { userSchema } = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  serie: {
    type: [serieSchema],
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


const Test = mongoose.model("Test", testSchema);
module.exports = {Test, testSchema};
