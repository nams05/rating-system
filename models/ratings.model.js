const mongoose = require('mongoose');

const ratingsSchema = mongoose.Schema({
    customerId: {type: Number, required: true},
    productId: {type:Number,required: true},
    rating: {type:Number, min:1, max:5, required: true},
    softDelete: {type: Boolean, default: false}
}, {timestamps: true}); //creates createdAt and updatedAt fields for tracking

module.exports = mongoose.model('rating', ratingsSchema, 'ratings'); // creates a collection named ratings with ratingsSchema