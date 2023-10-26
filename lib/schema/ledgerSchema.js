// ledgerSchema.js
const mongoose = require("mongoose");

const partyLedgerSchema = new mongoose.Schema({
  name: {
    type : String,
    required: true
  },
  mobile: String,
  balance: Number,
  date : Date,
  memo : String,
  desc : String,
  vehNumber : String,
  product : String,
  qty : Number,
  rate : Number,
  amount : Number,
});

module.exports = mongoose.models.PartyLedger || mongoose.model("PartyLedger", partyLedgerSchema);
