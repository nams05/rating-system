const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    customerId: {type: Number, required: true, unique: true},
    customerName: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('customer', customerSchema, 'customers');  // create a collection named customer with customerSchema