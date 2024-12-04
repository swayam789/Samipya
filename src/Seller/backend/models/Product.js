const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
    required: true
  },
  imagePath: {
    type: String
  },
  seller: {
    shopName: String,
    contact: String,
    landmark: String,
    email: String,
    username: String
  }
}, {
  timestamps: true,
  collection: 'products'
});

module.exports = mongoose.model('Product', productSchema); 