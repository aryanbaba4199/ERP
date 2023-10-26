const mongoose = require("mongoose");

const creditSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    memo: String,
    partyName: {
        type: String,
        required: true
    },
    description: String,
    VehNumber: String,
    product: String,
    qty: {
        type: Number,
        required: true
    },
    rate: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.models.Credit || mongoose.model("Credit", creditSchema);
