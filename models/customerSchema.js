const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 55,
        required: true,
        trim: true
    },
    isGold: {
        type: Boolean,
        default: false,
        isRequired: true
    },
    phone: {
        type: String,
        minlength: 5,
        maxlength: 55,
        required: true,
        trim: true
    }
}));


function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(55).required(),
        phone: Joi.string().min(5).max(55).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;