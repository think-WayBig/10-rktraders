const mongoose = require("mongoose");

const newSms = new mongoose.Schema({
    VchNo: {
        type: String,
        required: true,
        unique: true
    },
    Driver: {
        type: String,
        default: 'harpal'
    },
    Date: {
        type: String,
        required: true
    },
    Message: {
        type: String,
        required: true
    },
    Contact: {
        type: String,
        required: true
    }
});

const NewSms = mongoose.model("NewSms", newSms);
module.exports = NewSms;