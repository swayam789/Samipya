const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: String,
    price: Number,
    stock: Number,
    category: String,
    imagePath: String,
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'Out of Stock'],
        default: 'Active'
    }
}, { 
    collection: 'products',
    timestamps: true 
});

// Only create the model if it hasn't been registered yet
module.exports = mongoose.models.Product || mongoose.model('Product', productSchema); 