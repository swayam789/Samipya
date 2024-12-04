const mongoose = require('mongoose');

// Define User Schema
const userSchema = new mongoose.Schema({
  // Email field - required and must be unique
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Password field - required and will be hashed
  password: {
    type: String,
    required: true
  },
  // Username field - required and must be unique
  username: {
    type: String,
    required: true,
    unique: true
  },
  // Creation timestamp - automatically set
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  collection: 'S_Users',  // Explicitly set collection name
  versionKey: false  // Remove __v field
});

module.exports = mongoose.model('User', userSchema); 