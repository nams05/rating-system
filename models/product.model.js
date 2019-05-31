//This model is for reference only. It was not a part of the requirement, hence not used.
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productId: {type: Number, required: true, unique: true},
    category: {type: String, default: "Placeholder"},
    subcategory: {type: String, default: "Placeholder"},
    name: {type: String, default: "Placeholder"},
    color: {type: String, default: "Black"},
    dimensions: {type: String },
    material: {type: String, default: "Wood"}
}, {timestamps: true}); 

module.exports = mongoose.model('product', productSchema, 'products'); // create a collection named products with furnitureSchema