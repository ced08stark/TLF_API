const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paiementSchema = new Schema({
  montant: {
    type: Number,
    require: true,
    enum: [200, 5000, 8000, 14950, 24950],
  },
  reference: {
    type: String,
    require: true,
    //unique: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Paiement = mongoose.model("Paiement", paiementSchema);
module.exports = { paiementSchema, Paiement };
