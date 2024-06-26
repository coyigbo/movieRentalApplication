const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer', mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    isGold: {
        type: Boolean,
        default: false,
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


function validateCustomer(customer) {
    const customerSchema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean()
    }

    return Joi.validate(customer, customerSchema);
}


module.exports.Customer = Customer;
module.exports.validate = validateCustomer;
