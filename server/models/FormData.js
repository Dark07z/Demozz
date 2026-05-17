const mongoose = require('mongoose');

const FormDataSchema = new mongoose.Schema({
    firstName : String,
    surname : String,
    email: String,
    password: String,
    shoppingPreference: {
        type: String,
        enum: ["men's", "women's"]
    },
    dateOfBirth: String
})

const FormDataModel = mongoose.model('nike_account', FormDataSchema);

module.exports = FormDataModel;
