const mongoose = require('mongoose');

const Totalizer = new mongoose.Schema({
    Meter_Name : {
        type : String,
        required : true
    },
    Reading : {
        type : String,
        required : true
    }
})
module.exports = mongoose.models.Totalizer ||
mongoose.models("Totalizer", Totalizer)