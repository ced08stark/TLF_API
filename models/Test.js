const {questionSchema} = require("./Question");
const { userSchema } = require("./User");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testSchema = new Schema({
  questions: {
    type: [questionSchema],
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
