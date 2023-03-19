const mongoose = require("mongoose");

const newData = new mongoose.Schema({
    VchNo: {
        type: String,
        required: true,
        unique: true
    },
    Date: {
        type: String,
        required: true
    },
    PartyName: {
        type: String,
        required: true
    },
    DeliveryStatus: {
        type: String,
        default: 'pending'
    },
    MobileNo: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Items: {
        type: Array,
        required: true
    },
    TotalAmount: {
        type: String,
        required: true
    },
    Driver: {
        type: String,
        default: 'harpal'
    },
    Otp: {
        type: String,
        required: true
    },
    Remarks: {
        type: String,
        default: 'NA'
    }
});

const NewData = mongoose.model("NewData", newData);
module.exports = NewData;