const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adsSchema = new Schema({
  nomPrestataire: {
    type: String,
    require: true
  },
  startDate: {
    type: Date,
    require: true
  },
  endDate: {
    type: Date,
    require: true
  },
  countClic: {
    type: Number,
    require: true
  },
  linkTarget: {
    type: String,
    require: false
  },
  adsPicture: {
    type: String,
    require: true
  },
  localisation: {
    type: String,
    require: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ads = mongoose.model("Ads", adsSchema);
module.exports = { Ads, adsSchema };
